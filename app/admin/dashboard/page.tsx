'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, MessageSquare, Calendar, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

type Stats = {
  totalBungalows: number
  totalInquiries: number
  newInquiries: number
  totalBookings: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBungalows: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalBookings: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [bungalows, inquiries, bookings] = await Promise.all([
        supabase.from('bungalows').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id, status', { count: 'exact' }),
        supabase.from('bookings').select('id', { count: 'exact', head: true }),
      ])

      const newInquiries = inquiries.data?.filter(
        (inq) => inq.status === 'new'
      ).length || 0

      setStats({
        totalBungalows: bungalows.count || 0,
        totalInquiries: inquiries.count || 0,
        newInquiries,
        totalBookings: bookings.count || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Bungalows',
      value: stats.totalBungalows,
      icon: Home,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'bg-green-500',
    },
    {
      title: 'New Inquiries',
      value: stats.newInquiries,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'bg-purple-500',
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-forest">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-4xl font-bold text-forest mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-charcoal">
                    {card.title}
                  </CardTitle>
                  <div className={`${card.color} text-white p-2 rounded-lg`}>
                    <card.icon size={20} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-forest">
                    {card.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Sapanca Luxe Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-charcoal">
              Manage your bungalows, view booking requests, and respond to
              customer inquiries from this dashboard.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
