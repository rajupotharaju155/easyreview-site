/**
 * Post-build prerender for public marketing routes.
 * Serves dist/ with SPA fallback (so /demo-video hits the React app, not
 * demo-video.html), lets React + Helmet render, then writes static HTML.
 */
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { access, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Vercel build images lack the shared libs for Puppeteer's stock Chrome
 * (exit 127 / "error while loading shared libraries"). Use @sparticuz/chromium
 * there; keep normal Puppeteer Chrome locally.
 */
async function launchBrowser() {
  if (process.env.VERCEL) {
    const [{ default: chromium }, { default: puppeteer }] = await Promise.all([
      import('@sparticuz/chromium'),
      import('puppeteer-core'),
    ])
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })
  }

  const { default: puppeteer } = await import('puppeteer')
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const PORT = 4173

/** Public SEO pages only — skip dynamic /rate/:slug. `/` last so other routes can restore the Vite shell. */
const routes = [
  '/pricing',
  '/competitor-analysis',
  '/guides',
  '/guides/restaurant-qr-code-google-reviews',
  '/guides/how-hotels-can-win-google-reviews',
  '/guides/turn-members-into-5-star-google-review',
  '/guides/easiest-way-salons-collect-google-reviews',
  '/guides/dental-practices-5-star-google-reviews',
  '/guides/mobile-laptop-repair-google-reviews',
  '/guides/spa-wellness-google-reviews',
  '/guides/real-estate-5-star-google-reviews',
  '/demo-video',
  '/faq',
  '/privacy',
  '/terms',
  '/',
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
}

function outputPathForRoute(route) {
  if (route === '/') return path.join(dist, 'index.html')
  return path.join(dist, route.replace(/^\//, ''), 'index.html')
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

/** Local static server matching Vercel: exact files first, else SPA index.html. */
function startSpaServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', `http://127.0.0.1:${PORT}`)
      let pathname = decodeURIComponent(url.pathname)
      if (pathname.includes('\0') || pathname.includes('..')) {
        res.writeHead(400).end('Bad request')
        return
      }

      let filePath = path.join(dist, pathname)
      const exists = await fileExists(filePath)
      if (exists) {
        const st = await stat(filePath)
        if (st.isDirectory()) {
          filePath = path.join(filePath, 'index.html')
        }
      }

      if (!(await fileExists(filePath)) || (await stat(filePath)).isDirectory()) {
        filePath = path.join(dist, 'index.html')
      }

      const ext = path.extname(filePath).toLowerCase()
      res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' })
      createReadStream(filePath).pipe(res)
    } catch (err) {
      res.writeHead(500).end(String(err))
    }
  })

  return new Promise((resolve, reject) => {
    server.listen(PORT, '127.0.0.1', () => resolve(server))
    server.on('error', reject)
  })
}

async function prerender() {
  if (!(await fileExists(path.join(dist, 'index.html')))) {
    throw new Error('dist/index.html missing — run vite build first')
  }

  // Always start from the Vite shell so we don't re-crawl already-prerendered HTML.
  const shellHtml = await readFile(path.join(dist, 'index.html'), 'utf8')
  await writeFile(path.join(dist, 'index.html'), shellHtml, 'utf8')
  for (const route of routes) {
    if (route === '/') continue
    await rm(path.join(dist, route.replace(/^\//, '')), { recursive: true, force: true })
  }

  const server = await startSpaServer()
  const baseUrl = `http://127.0.0.1:${PORT}`

  const browser = await launchBrowser()

  try {
    for (const route of routes) {
      // Non-home routes must boot from the empty Vite shell via SPA fallback.
      await writeFile(path.join(dist, 'index.html'), shellHtml, 'utf8')

      const page = await browser.newPage()
      const url = new URL(route, baseUrl).href

      // Avoid networkidle* — maps / long-polling can hang forever.
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
      await page.waitForSelector('#root > *', { timeout: 30_000 })
      await page.evaluate(
        () =>
          new Promise((resolve) => {
            requestAnimationFrame(() => setTimeout(resolve, 400))
          }),
      )

      // react-helmet-async can leave Vite shell tags alongside page tags.
      await page.evaluate(() => {
        const titles = [...document.querySelectorAll('head title')]
        if (titles.length > 1) {
          // First title is the page-specific Helmet value (matches document.title).
          titles.slice(1).forEach((el) => el.remove())
        }

        const keepLastByAttr = (selector, attrName) => {
          const seen = new Map()
          for (const el of document.querySelectorAll(selector)) {
            const key = el.getAttribute(attrName)
            if (!key) continue
            const prev = seen.get(key)
            if (prev) prev.remove()
            seen.set(key, el)
          }
        }

        // Last wins for Helmet-managed meta / canonical.
        keepLastByAttr('head meta[name]', 'name')
        keepLastByAttr('head meta[property]', 'property')

        const canons = [...document.querySelectorAll('head link[rel="canonical"]')]
        if (canons.length > 1) {
          canons.slice(0, -1).forEach((el) => el.remove())
        }
      })

      let html = await page.content()
      if (!/^<!doctype/i.test(html)) {
        html = `<!DOCTYPE html>\n${html}`
      }

      const outFile = outputPathForRoute(route)
      await mkdir(path.dirname(outFile), { recursive: true })
      await writeFile(outFile, html, 'utf8')

      const title = await page.title()
      console.log(`✓ ${route} → ${path.relative(root, outFile)} (${title})`)
      await page.close()
    }
  } finally {
    await browser.close()
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()))
    })
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
