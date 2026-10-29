import { Outlet } from 'react-router-dom'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
