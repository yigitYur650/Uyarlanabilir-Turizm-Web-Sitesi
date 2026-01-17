'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { supabase, type Bungalow } from '@/lib/supabase'
import BungalowForm from '@/components/admin/bungalow-form'

export default function BungalowsPage() {
  const [bungalows, setBungalows] = useState<Bungalow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBungalow, setEditingBungalow] = useState<Bungalow | null>(null)

  useEffect(() => {
    fetchBungalows()
  }, [])

  const fetchBungalows = async () => {
    try {
      const { data, error } = await supabase
        .from('bungalows')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBungalows(data || [])
    } catch (error) {
      console.error('Error fetching bungalows:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bungalow?')) return

    try {
      const { error } = await supabase.from('bungalows').delete().eq('id', id)

      if (error) throw error
      fetchBungalows()
    } catch (error) {
      console.error('Error deleting bungalow:', error)
    }
  }

  const handleEdit = (bungalow: Bungalow) => {
    setEditingBungalow(bungalow)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingBungalow(null)
    fetchBungalows()
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-4xl font-bold text-forest">Bungalows</h1>
        <Button
          size="lg"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add Bungalow
        </Button>
      </div>

      {showForm && (
        <BungalowForm
          bungalow={editingBungalow}
          onClose={handleFormClose}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bungalows.map((bungalow, index) => (
          <motion.div
            key={bungalow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest mb-1">
                      {bungalow.name}
                    </h3>
                    <p className="text-sm text-charcoal/60">{bungalow.type}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      bungalow.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {bungalow.available ? 'Available' : 'Unavailable'}
                  </div>
                </div>

                <p className="text-charcoal text-sm mb-4 line-clamp-3">
                  {bungalow.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-forest">
                      ${bungalow.price_per_night}
                    </div>
                    <div className="text-xs text-charcoal/60">per night</div>
                  </div>
                  <div className="text-sm text-charcoal">
                    Capacity: {bungalow.capacity}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(bungalow)}
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(bungalow.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {bungalows.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-charcoal">
              No bungalows yet. Click the button above to add your first
              bungalow.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
