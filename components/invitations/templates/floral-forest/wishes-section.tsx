'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Heart, MessageCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Wish {
  name: string
  message: string
  date: string
}

interface WishesSectionProps {
  wishes: Wish[]
}

export function WishesSection({ wishes: initialWishes }: WishesSectionProps) {
  const [wishes, setWishes] = useState(initialWishes)
  const [newWish, setNewWish] = useState({ name: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({})

  const validateForm = (): boolean => {
    const newErrors: { name?: string; message?: string } = {}
    
    if (!newWish.name.trim()) newErrors.name = 'Name is required'
    if (!newWish.message.trim()) newErrors.message = 'Message is required'
    else if (newWish.message.length > 500) newErrors.message = 'Message must be 500 characters or less'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newWishEntry: Wish = {
      name: newWish.name,
      message: newWish.message,
      date: new Date().toISOString()
    }
    
    setWishes(prev => [newWishEntry, ...prev])
    setNewWish({ name: '', message: '' })
    setIsSubmitting(false)
  }

  const handleInputChange = (field: 'name' | 'message', value: string) => {
    setNewWish(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-emerald-800 mb-4">
            Wedding Wishes
          </h2>
          <p className="font-inter text-lg text-emerald-700 max-w-2xl mx-auto">
            Share your blessings and well wishes for our new journey together
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Wish form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-emerald-200/30 border-2 border-emerald-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-playfair text-2xl text-emerald-800">
                  Leave a Wish
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-emerald-700 font-inter mb-2">
                    <User size={18} />
                    Your Name *
                  </label>
                  <Input
                    value={newWish.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`border-2 ${errors.name ? 'border-red-300' : 'border-emerald-200'} focus:border-emerald-500`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-emerald-700 font-inter mb-2">
                    <Heart size={18} />
                    Your Message *
                  </label>
                  <Textarea
                    value={newWish.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`border-2 ${errors.message ? 'border-red-300' : 'border-emerald-200'} focus:border-emerald-500 min-h-[120px]`}
                    placeholder="Share your wishes, blessings, or memories..."
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    <p className="text-emerald-600 text-sm ml-auto">
                      {newWish.message.length}/500
                    </p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 text-lg font-inter rounded-2xl shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Wish...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={20} />
                        Send Your Wish
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Wishes display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {wishes.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                  <p className="font-inter text-emerald-600">
                    Be the first to share your wishes!
                  </p>
                </div>
              ) : (
                wishes.map((wish, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-inter font-semibold text-emerald-800">
                            {wish.name}
                          </h4>
                          <span className="text-emerald-600 text-sm">
                            {formatDate(wish.date)}
                          </span>
                        </div>
                        <p className="font-inter text-emerald-700 leading-relaxed">
                          {wish.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        {wishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100 inline-block">
              <div className="flex items-center gap-4">
                <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
                <div>
                  <p className="font-playfair text-2xl text-emerald-800">
                    {wishes.length}
                  </p>
                  <p className="font-inter text-emerald-600 text-sm">
                    {wishes.length === 1 ? 'Beautiful Wish' : 'Beautiful Wishes'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}