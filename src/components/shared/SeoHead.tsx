import { Helmet } from 'react-helmet-async'

export const SITE_URL = 'https://easyreview.co.in'
export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`
export const OG_IMAGE_WIDTH = '1024'
export const OG_IMAGE_HEIGHT = '537'

type SeoHeadProps = {
  title: string
  description: string
  /** Path only, e.g. `/` or `/pricing` */
  path: string
  /** Absolute image URL; defaults to the site-wide OG image */
  imageUrl?: string
  /** Alt text for og/twitter image */
  imageAlt?: string
  /** Search robots directive; omit for index,follow */
  robots?: string
}

function absoluteUrl(path: string) {
  if (path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Canonical + Open Graph + Twitter card tags for public marketing pages. */
export function SeoHead({
  title,
  description,
  path,
  imageUrl = OG_IMAGE_URL,
  imageAlt = 'EasyReview — collecting reviews made easy',
  robots,
}: SeoHeadProps) {
  const url = absoluteUrl(path)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots ? <meta name="robots" content={robots} /> : null}
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="EasyReview" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  )
}
