'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase, type Bungalow } from '@/lib/supabase'

type BungalowFormProps = {
  bungalow: Bungalow | null
  onClose: () => void
}

export default function BungalowForm({ bungalow, onClose }: BungalowFormProps) {
  const [formData, setFormData] = useState({
    name: bungalow?.name || '',
    slug: bungalow?.slug || '',
    type: bungalow?.type || '',
    description: bungalow?.description || '',
    price_per_night: bungalow?.price_per_night || 0,
    capacity: bungalow?.capacity || 2,
    amenities: bungalow?.amenities?.join(', ') || '',
    images: bungalow?.images?.join(', ') || '',
    featured: bungalow?.featured || false,
    available: bungalow?.available !== undefined ? bungalow.available : true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const amenitiesArray = formData.amenities
        .split(',')
        .map((a) => a.trim())
        .filter((a) => a)
      const imagesArray = formData.images
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i)

      const bungalowData = {
        name: formData.name,
        slug: formData.slug,
        type: formData.type,
        description: formData.description,
        price_per_night: formData.price_per_night,
        capacity: formData.capacity,
        amenities: amenitiesArray,
        images: imagesArray,
        featured: formData.featured,
        available: formData.available,
        updated_at: new Date().toISOString(),
      }

      if (bungalow) {
        const { error } = await supabase
          .from('bungalows')
          .update(bungalowData)
          .eq('id', bungalow.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('bungalows').insert([bungalowData])

        if (error) throw error
      }

      onClose()
    } catch (err: unknown) {
      console.error('Error saving bungalow:', err)
      setError(err instanceof Error ? err.message : 'Failed to save bungalow')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="max-w-3xl w-full my-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {bungalow ? 'Edit Bungalow' : 'Add New Bungalow'}
          </CardTitle>
          <button
            onClick={onClose}
            className="text-charcoal hover:text-forest transition-colors"
          >
            <X size={24} />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">
                  Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-2">
                  Slug (URL-friendly)
                </label>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                  placeholder="luxury-pool-bungalow"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">
                  Type
                </label>
                <Input
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                  placeholder="Pool, Jacuzzi, Fireplace"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-2">
                  Price per Night
                </label>
                <Input
                  type="number"
                  value={formData.price_per_night}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price_per_night: parseFloat(e.target.value),
                    })
                  }
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest mb-2">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">
                  Capacity
                </label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: parseInt(e.target.value),
                    })
                  }
                  required
                  min="1"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-forest">Featured</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) =>
                        setFormData({ ...formData, available: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-forest">Available</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest mb-2">
                Amenities (comma-separated)
              </label>
              <Input
                value={formData.amenities}
                onChange={(e) =>
                  setFormData({ ...formData, amenities: e.target.value })
                }
                placeholder="WiFi, Pool, Hot Tub, Kitchen"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-forest mb-2">
                Images (comma-separated URLs)
              </label>
              <Textarea
                value={formData.images}
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.value })
                }
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                rows={3}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-100 text-red-800 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting
                  ? 'Saving...'
                  : bungalow
                  ? 'Update Bungalow'
                  : 'Create Bungalow'}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
