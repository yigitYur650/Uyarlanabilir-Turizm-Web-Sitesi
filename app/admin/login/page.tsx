'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.session) {
        router.push('/admin/dashboard')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest via-forest-light to-forest flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-beige rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-forest text-beige p-4 rounded-full">
            <Lock size={32} />
          </div>
        </div>

        <h1 className="font-serif text-3xl font-bold text-forest text-center mb-2">
          Admin Login
        </h1>
        <p className="text-charcoal text-center mb-8">
          Access the management dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-forest mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
              placeholder="admin@sapancaluxe.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-forest mb-2">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-800 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="xl"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-charcoal/60 mt-6">
          Authorized personnel only
        </p>
      </motion.div>
    </div>
  )
}
