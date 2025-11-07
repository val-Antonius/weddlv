'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageSquare, Star } from 'lucide-react'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisWishesProps {
  config: MemphisAbstractConfig
}

interface Wish {
  id: number
  name: string
  message: string
  timestamp: string
}

export function MemphisWishes({ config }: MemphisWishesProps) {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: "DESIGN LOVER",
      message: "Your love story is like the perfect Memphis design - bold, unexpected, and absolutely beautiful! Can't wait to celebrate with you both! 🎨💕",
      timestamp: "2024-01-15"
    },
    {
      id: 2,
      name: "COLOR ENTHUSIAST", 
      message: "You two are proof that opposites attract and create something amazing! Wishing you a lifetime of geometric happiness and rainbow adventures! 🌈",
      timestamp: "2024-01-14"
    }
  ])

  const [newWish, setNewWish] = useState({ name: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWish.name.trim() || !newWish.message.trim()) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const wish: Wish = {
      id: wishes.length + 1,
      name: newWish.name.toUpperCase(),
      message: newWish.message,
      timestamp: new Date().toISOString().split('T')[0]
    }
    
    setWishes([wish, ...wishes])
    setNewWish({ name: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section id="wishes" className="min-h-screen bg-gradient-to-tr from-cyan-100 via-pink-100 to-yellow-100 py-20 relative overflow-hidden">
      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center mb-12"
        >
          <div className="text-6xl md:text-7xl font-black mb-6">
            <span className="inline-block transform rotate-3 bg-purple-600 text-white px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.yellow.300)] mr-4">
              WILD
            </span>
            <span className="inline-block transform -rotate-6 bg-lime-500 text-black px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.pink.400)]">
              WISHES
            </span>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -10 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border-8 border-black transform rotate-1 shadow-[16px_16px_0_theme(colors.red.500)] p-8 mb-12 relative"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-orange-500 border-4 border-black p-3 transform rotate-6 shadow-[6px_6px_0_theme(colors.lime.500)]">
                <MessageSquare className="text-white" size={32} />
              </div>
              <div className="text-3xl font-black text-black transform -rotate-2">
                SEND SOME LOVE!
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xl font-black mb-3 bg-cyan-400 text-black px-4 py-2 border-4 border-black shadow-[4px_4px_0_theme(colors.purple.600)] inline-block transform rotate-1">
                  YOUR NAME:
                </label>
                <input
                  type="text"
                  required
                  value={newWish.name}
                  onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                  className="w-full text-xl font-bold p-4 border-6 border-black bg-pink-100 focus:bg-yellow-100 focus:outline-none transform -rotate-1 shadow-[6px_6px_0_theme(colors.orange.500)]"
                  placeholder="TYPE YOUR AWESOME NAME"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="block text-xl font-black mb-3 bg-lime-500 text-black px-4 py-2 border-4 border-black shadow-[4px_4px_0_theme(colors.red.500)] inline-block transform -rotate-1">
                  YOUR MESSAGE:
                </label>
                <textarea
                  required
                  value={newWish.message}
                  onChange={(e) => setNewWish({...newWish, message: e.target.value})}
                  className="w-full text-lg font-bold p-4 border-6 border-black bg-cyan-100 focus:bg-lime-100 focus:outline-none h-32 resize-none transform rotate-1 shadow-[6px_6px_0_theme(colors.pink.400)]"
                  placeholder="WRITE SOMETHING WILD AND WONDERFUL..."
                  maxLength={300}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05, rotate: isSubmitting ? 0 : 5 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full py-4 text-2xl font-black border-6 border-black transition-all duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed transform rotate-0' 
                    : 'bg-red-500 text-white transform rotate-2 shadow-[8px_8px_0_theme(colors.yellow.300)] hover:shadow-[12px_12px_0_theme(colors.cyan.400)]'
                }`}
              >
                {isSubmitting ? 'SENDING LOVE...' : 'BLAST OFF MESSAGE!'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-8 border-black p-8 transform rotate-1 shadow-[12px_12px_0_theme(colors.pink.400)] relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-pink-400 border-4 border-black flex items-center justify-center transform rotate-6 shadow-[6px_6px_0_theme(colors.purple.600)]">
                      <div className="text-2xl font-black text-black">
                        {wish.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-black">
                        {wish.name}
                      </div>
                      <div className="text-lg font-bold text-gray-600">
                        {new Date(wish.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-red-500 fill-current" size={20} />
                    ))}
                  </div>
                </div>
                <div className="bg-pink-100 border-4 border-black p-6 transform -rotate-1">
                  <div className="text-lg font-bold text-black leading-relaxed">
                    {wish.message}
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 border-4 border-black shadow-[4px_4px_0_theme(colors.purple.600)] hover:shadow-[6px_6px_0_theme(colors.yellow.300)] transition-all duration-200 font-black transform rotate-2"
                  >
                    <Heart size={20} />
                    <span>LOVE IT!</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5, type: "spring" }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-400 text-black text-2xl font-black px-12 py-6 transform rotate-3 border-8 border-black shadow-[12px_12px_0_theme(colors.red.500)] hover:shadow-[16px_16px_0_theme(colors.purple.600)] transition-all duration-200"
              onClick={() => {
                document.getElementById('thank-you')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              FINAL CHAOS! →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}