import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Bungalow = {
  id: string
  name: string
  slug: string
  type: string
  description: string
  price_per_night: number
  capacity: number
  amenities: string[]
  images: string[]
  featured: boolean
  available: boolean
  created_at: string
  updated_at: string
}

export type Booking = {
  id: string
  bungalow_id: string
  guest_name: string
  guest_email: string
  guest_phone: string
  check_in: string
  check_out: string
  guests: number
  total_price: number
  special_requests: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export type Inquiry = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: 'new' | 'read' | 'responded'
  created_at: string
}
