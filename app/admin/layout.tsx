'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Home, MessageSquare, LogOut, Menu, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session && pathname !== '/admin/login') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(!!session)
    }
    setIsLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-forest">Loading...</div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/bungalows', icon: Home, label: 'Bungalows' },
    { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
  ]

  return (
    <div className="min-h-screen bg-beige">
      <div className="md:hidden fixed top-0 left-0 right-0 bg-forest text-beige p-4 z-50 flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside
        className={`fixed top-0 left-0 h-full bg-forest text-beige w-64 p-6 z-40 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="mb-8 mt-0 md:mt-0">
          <h1 className="font-serif text-2xl font-bold">Sapanca Luxe</h1>
          <p className="text-beige/60 text-sm">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-beige/20 text-beige'
                  : 'text-beige/70 hover:bg-beige/10 hover:text-beige'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border-beige/20 text-beige hover:bg-beige/10"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </aside>

      <main className="md:ml-64 p-6 pt-20 md:pt-6">{children}</main>
    </div>
  )
}
