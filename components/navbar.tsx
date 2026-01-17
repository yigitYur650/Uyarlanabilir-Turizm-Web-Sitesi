'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-beige/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="font-serif text-2xl font-bold text-forest">
            Sapanca Luxe
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#bungalows"
              className="text-forest hover:text-forest-light transition-colors"
            >
              Bungalows
            </Link>
            <Link
              href="#gallery"
              className="text-forest hover:text-forest-light transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="#guide"
              className="text-forest hover:text-forest-light transition-colors"
            >
              Local Guide
            </Link>
            <Link
              href="#contact"
              className="text-forest hover:text-forest-light transition-colors"
            >
              Contact
            </Link>
            <Button size="lg">Book Now</Button>
          </div>

          <button
            className="md:hidden text-forest"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 bg-beige/95 backdrop-blur-md">
            <Link
              href="#bungalows"
              className="block text-forest hover:text-forest-light transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bungalows
            </Link>
            <Link
              href="#gallery"
              className="block text-forest hover:text-forest-light transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="#guide"
              className="block text-forest hover:text-forest-light transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Local Guide
            </Link>
            <Link
              href="#contact"
              className="block text-forest hover:text-forest-light transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button size="lg" className="w-full">
              Book Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
