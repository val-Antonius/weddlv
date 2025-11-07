'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Award, Frame } from 'lucide-react'
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
    <section className="py-20 px-4 bg-gradient-to-b from-white to-zinc-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-zinc-900 mb-6 tracking-wider">
            WEDDING WISHES
          </h2>
          <p className="font-crimson text-lg text-zinc-700 max-w-2xl mx-auto italic">
            Share your blessings and well wishes for our matrimonial journey
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-32 h-px bg-zinc-900"></div>
            <Frame className="w-6 h-6 text-zinc-900" />
            <div className="w-32 h-px bg-zinc-900"></div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Wish form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="border-2 border-zinc-900 p-8 bg-white drop-shadow-2xl relative">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-r border-b border-zinc-900"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-zinc-900"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-r border-t border-zinc-900"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-l border-t border-zinc-900"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border-2 border-zinc-900 flex items-center justify-center bg-white">
                  <Award className="w-6 h-6 text-zinc-900" />
                </div>
                <h3 className="font-cinzel text-2xl text-zinc-900 tracking-wide">
                  LEAVE A WISH
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-zinc-900 font-crimson mb-2 tracking-wide">
                    <User size={18} />
                    YOUR NAME *
                  </label>
                  <Input
                    value={newWish.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`border-2 ${errors.name ? 'border-red-500' : 'border-zinc-900'} focus:border-zinc-700 bg-white`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1 font-crimson">{errors.name}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-zinc-900 font-crimson mb-2 tracking-wide">
                    <Frame size={18} />
                    YOUR MESSAGE *
                  </label>
                  <Textarea
                    value={newWish.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`border-2 ${errors.message ? 'border-red-500' : 'border-zinc-900'} focus:border-zinc-700 min-h-[120px] bg-white`}
                    placeholder="Share your wishes, blessings, or cherished memories..."
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && <p className="text-red-500 text-sm font-crimson">{errors.message}</p>}
                    <p className="text-zinc-600 text-sm ml-auto font-crimson">
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
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-4 text-lg font-crimson tracking-wider border-2 border-zinc-900"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin"></div>
                        SENDING WISH...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={20} />
                        SEND YOUR WISH
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
                <div className="text-center py-12 border-2 border-zinc-900 bg-white">
                  <Award className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
                  <p className="font-crimson text-zinc-600 italic">
                    Be the first to share your wishes
                  </p>
                </div>
              ) : (
                wishes.map((wish, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-zinc-900 p-6 bg-white hover:drop-shadow-lg transition-all duration-300 relative"
                  >
                    {/* Corner decoration */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-r border-b border-zinc-900"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-l border-t border-zinc-900"></div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-zinc-900 flex items-center justify-center flex-shrink-0 bg-white">
                        <User className="w-5 h-5 text-zinc-900" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-cinzel font-semibold text-zinc-900 tracking-wide">
                            {wish.name}
                          </h4>
                          <span className="text-zinc-600 text-sm font-crimson">
                            {formatDate(wish.date)}
                          </span>
                        </div>
                        <p className="font-crimson text-zinc-700 leading-relaxed italic">
                          "{wish.message}"
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
            <div className="border-2 border-zinc-900 p-6 bg-white inline-block">
              <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-zinc-900" />
                <div>
                  <p className="font-cinzel text-2xl text-zinc-900 tracking-wide">
                    {wishes.length}
                  </p>
                  <p className="font-crimson text-zinc-600 text-sm tracking-wide">
                    {wishes.length === 1 ? 'DISTINGUISHED WISH' : 'DISTINGUISHED WISHES'}
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