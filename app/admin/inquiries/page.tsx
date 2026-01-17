'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Clock, Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { supabase, type Inquiry } from '@/lib/supabase'

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'responded'>('all')

  useEffect(() => {
    fetchInquiries()
  }, [filter])

  const fetchInquiries = async () => {
    try {
      let query = supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setInquiries(data || [])
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      fetchInquiries()
    } catch (error) {
      console.error('Error updating inquiry:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return

    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id)

      if (error) throw error
      fetchInquiries()
    } catch (error) {
      console.error('Error deleting inquiry:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'read':
        return 'bg-yellow-100 text-yellow-800'
      case 'responded':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-forest">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="font-serif text-4xl font-bold text-forest">Inquiries</h1>

        <div className="flex gap-2">
          {(['all', 'new', 'read', 'responded'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.map((inquiry, index) => (
          <motion.div
            key={inquiry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-forest">
                        {inquiry.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 text-sm text-charcoal">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="hover:text-forest transition-colors"
                        >
                          {inquiry.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="hover:text-forest transition-colors"
                        >
                          {inquiry.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-charcoal/60">
                        <Clock size={16} />
                        {new Date(inquiry.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {inquiry.status === 'new' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(inquiry.id, 'read')}
                      >
                        Mark Read
                      </Button>
                    )}
                    {inquiry.status !== 'responded' && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => updateStatus(inquiry.id, 'responded')}
                      >
                        <Check size={16} className="mr-2" />
                        Responded
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(inquiry.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <div className="bg-beige/50 p-4 rounded-lg">
                  <p className="text-charcoal whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {inquiries.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-charcoal">
              {filter === 'all'
                ? 'No inquiries yet.'
                : `No ${filter} inquiries.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
