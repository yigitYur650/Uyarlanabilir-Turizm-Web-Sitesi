'use client'

import { motion } from 'framer-motion'
import { Waves, Droplets, Flame, Trees, Wifi, Coffee } from 'lucide-react'
import { Card } from './ui/card'

const bungalowTypes = [
  {
    icon: Waves,
    title: 'Pool Bungalows',
    description: 'Private infinity pools with stunning mountain views',
    amenities: ['Heated Pool', 'Sun Loungers', 'Poolside Bar'],
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    icon: Droplets,
    title: 'Jacuzzi Bungalows',
    description: 'Relax in your private outdoor jacuzzi under the stars',
    amenities: ['Outdoor Jacuzzi', 'Massage Jets', 'Mood Lighting'],
    image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-teal-500/20 to-teal-600/20',
  },
  {
    icon: Flame,
    title: 'Fireplace Bungalows',
    description: 'Cozy evenings by the warmth of your private fireplace',
    amenities: ['Wood Fireplace', 'Cozy Interiors', 'Reading Nook'],
    image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-orange-500/20 to-orange-600/20',
  },
]

const commonAmenities = [
  { icon: Trees, label: 'Forest Views' },
  { icon: Wifi, label: 'High-Speed WiFi' },
  { icon: Coffee, label: 'Coffee Maker' },
]

export default function FeaturesSection() {
  return (
    <section id="bungalows" className="py-24 bg-beige">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest mb-4">
            Choose Your Perfect Retreat
          </h2>
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Each bungalow is carefully designed to provide the ultimate luxury experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {bungalowTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden group cursor-pointer h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${type.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${type.color} group-hover:opacity-80 transition-opacity duration-500`} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full">
                    <type.icon className="text-forest" size={24} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-forest mb-3">
                    {type.title}
                  </h3>
                  <p className="text-charcoal mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {type.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 text-sm text-forest"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-forest" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-forest text-beige rounded-2xl p-8 md:p-12"
        >
          <h3 className="font-serif text-3xl font-bold mb-8 text-center">
            All Bungalows Include
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commonAmenities.map((amenity, index) => (
              <motion.div
                key={amenity.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="bg-beige/20 p-3 rounded-full">
                  <amenity.icon size={24} />
                </div>
                <span className="text-lg">{amenity.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
