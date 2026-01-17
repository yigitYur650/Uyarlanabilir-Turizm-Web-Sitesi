import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import FeaturesSection from '@/components/features-section'
import GallerySection from '@/components/gallery-section'
import SapancaGuide from '@/components/sapanca-guide'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import AtmosphereToggle from '@/components/atmosphere-toggle'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <SapancaGuide />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <AtmosphereToggle />
    </main>
  )
}
