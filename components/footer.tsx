import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest text-beige py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Sapanca Luxe</h3>
            <p className="text-beige/80 text-sm">
              Experience luxury in nature with our exclusive bungalow collection.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#bungalows" className="text-beige/80 hover:text-beige transition-colors">
                  Bungalows
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-beige/80 hover:text-beige transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#guide" className="text-beige/80 hover:text-beige transition-colors">
                  Local Guide
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-beige/80 hover:text-beige transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-beige/80 hover:text-beige transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-beige/80 hover:text-beige transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-beige/80 hover:text-beige transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige/80 hover:text-beige transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige/80 hover:text-beige transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige/80 hover:text-beige transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-beige/20 pt-8 text-center text-sm text-beige/60">
          <p>&copy; {new Date().getFullYear()} Sapanca Luxe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
