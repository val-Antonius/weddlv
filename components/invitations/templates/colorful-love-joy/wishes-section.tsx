'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Heart, PartyPopper, Star, Sparkles } from 'lucide-react'
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

  const wishGradients = [
    'from-pink-400 to-rose-400',
    'from-purple-400 to-fuchsia-400',
    'from-blue-400 to-sky-400',
    'from-emerald-400 to-teal-400',
    'from-yellow-400 to-orange-400'
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-quicksand text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Wedding Wishes! 💌
          </motion.h2>
          <p className="font-nunito text-xl text-gray-700 max-w-2xl mx-auto">
            Share your love, blessings, and excitement for our big day! 🎉
          </p>
          <motion.div 
            className="w-40 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mx-auto rounded-full mt-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Wish form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl p-2 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 relative overflow-hidden">
                {/* Floating decorations */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 right-4 text-pink-300"
                >
                  <Heart size={24} />
                </motion.div>

                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <PartyPopper className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="font-pacifico text-2xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Leave a Wish! ✨
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-nunito font-semibold mb-2">
                      <User size={18} className="text-pink-500" />
                      Your Name *
                    </label>
                    <Input
                      value={newWish.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`border-2 rounded-xl ${errors.name ? 'border-red-400' : 'border-pink-300'} focus:border-pink-500 bg-white/80`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1 font-nunito">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-nunito font-semibold mb-2">
                      <Heart size={18} className="text-purple-500" />
                      Your Message *
                    </label>
                    <Textarea
                      value={newWish.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`border-2 rounded-xl ${errors.message ? 'border-red-400' : 'border-purple-300'} focus:border-purple-500 min-h-[120px] bg-white/80`}
                      placeholder="Share your wishes, blessings, or excitement for our special day..."
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.message && <p className="text-red-500 text-sm font-nunito">{errors.message}</p>}
                      <p className="text-gray-600 text-sm ml-auto font-nunito">
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
                      className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white py-4 text-lg font-nunito font-bold rounded-xl shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Wish... ✨
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send size={20} />
                          Send Your Wish! 💕
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* Wishes display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {wishes.length === 0 ? (
                <motion.div 
                  className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" fill="currentColor" />
                  </motion.div>
                  <p className="font-nunito text-gray-600">
                    Be the first to share your wishes! 🌟
                  </p>
                </motion.div>
              ) : (
                wishes.map((wish, index) => {
                  const gradient = wishGradients[index % wishGradients.length]
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                    >
                      {/* Floating decoration */}
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 4 + index, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute top-4 right-4 text-white/30"
                      >
                        {index % 3 === 0 && <Star size={20} />}
                        {index % 3 === 1 && <Sparkles size={20} />}
                        {index % 3 === 2 && <Heart size={20} />}
                      </motion.div>
                      
                      <div className="flex items-start gap-4 text-white">
                        <motion.div 
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-white/30"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <User className="w-5 h-5" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-nunito font-bold drop-shadow-lg">
                              {wish.name}
                            </h4>
                            <span className="text-white/80 text-sm font-nunito">
                              {formatDate(wish.date)}
                            </span>
                          </div>
                          <p className="font-nunito leading-relaxed drop-shadow-lg">
                            "{wish.message}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
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
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                </motion.div>
                <div>
                  <p className="font-pacifico text-2xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {wishes.length}
                  </p>
                  <p className="font-nunito text-gray-600 text-sm font-semibold">
                    {wishes.length === 1 ? 'Beautiful Wish! 💕' : 'Beautiful Wishes! 🌈'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}