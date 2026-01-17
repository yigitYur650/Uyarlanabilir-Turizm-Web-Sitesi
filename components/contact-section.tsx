'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { supabase } from '@/lib/supabase'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: 'new',
        },
      ])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-beige">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Have questions? We're here to help plan your perfect getaway
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl font-bold text-forest mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-forest text-beige p-3 rounded-full">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-1">Phone</h4>
                  <p className="text-charcoal">+90 555 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-forest text-beige p-3 rounded-full">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-1">Email</h4>
                  <p className="text-charcoal">info@sapancaluxe.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-forest text-beige p-3 rounded-full">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-1">Address</h4>
                  <p className="text-charcoal">
                    Sapanca, Sakarya
                    <br />
                    Turkey
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-forest rounded-lg text-beige">
              <h4 className="font-serif text-xl font-bold mb-2">Opening Hours</h4>
              <p className="text-beige/80">
                Reception: 24/7
                <br />
                Check-in: 3:00 PM
                <br />
                Check-out: 11:00 AM
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="h-12"
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="h-12"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="h-12"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                  Thank you! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg">
                  Something went wrong. Please try again.
                </div>
              )}

              <Button
                type="submit"
                size="xl"
                disabled={isSubmitting}
                className="w-full flex items-center gap-2"
              >
                <Send size={20} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
