'use client'

import { motion } from 'framer-motion'
import { MapPin, Mountain, Utensils, Camera, Heart } from 'lucide-react'
import { Card, CardContent } from './ui/card'

const activities = [
  {
    icon: Mountain,
    title: 'Kartepe Ski Resort',
    description: 'World-class skiing just 20 minutes away',
    distance: '15 km',
  },
  {
    icon: Camera,
    title: 'Sapanca Lake',
    description: 'Stunning lake views and photography spots',
    distance: '5 km',
  },
  {
    icon: Utensils,
    title: 'Local Restaurants',
    description: 'Authentic Turkish cuisine and fresh trout',
    distance: '2 km',
  },
  {
    icon: Heart,
    title: 'Nature Walks',
    description: 'Scenic hiking trails through pine forests',
    distance: 'On-site',
  },
  {
    icon: MapPin,
    title: 'Maşukiye Waterfall',
    description: 'Natural waterfall and picnic areas',
    distance: '8 km',
  },
]

export default function SapancaGuide() {
  return (
    <section id="guide" className="py-24 bg-forest text-beige">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Discover Sapanca
          </h2>
          <p className="text-lg text-beige/80 max-w-2xl mx-auto">
            Explore the natural beauty and attractions near your bungalow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-beige/10 backdrop-blur-sm border-beige/20 hover:bg-beige/15 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="bg-beige/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <activity.icon size={24} className="text-beige" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-beige/80 mb-3">{activity.description}</p>
                  <div className="flex items-center gap-2 text-sm text-beige/60">
                    <MapPin size={14} />
                    <span>{activity.distance}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-beige/80 text-lg">
            Our concierge team is available 24/7 to help plan your perfect Sapanca experience
          </p>
        </motion.div>
      </div>
    </section>
  )
}
