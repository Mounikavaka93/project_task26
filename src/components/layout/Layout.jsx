import { Outlet } from 'react-router-dom'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { LuxuryCursor } from '../ui/LuxuryCursor'
import { Preloader } from '../ui/Preloader'
import { Toast } from '../ui/Toast'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageTransition } from './PageTransition'

export function Layout() {
  useSmoothScroll()

  return (
    <div className="relative min-h-svh overflow-x-clip bg-ink text-cream">
      <div className="grain" />
      <LuxuryCursor />
      <Preloader />
      <Navbar />
      <main className="pt-16">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <Toast />
    </div>
  )
}
