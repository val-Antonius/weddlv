'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageSquare, Star } from 'lucide-react'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelWishesProps {
  config: PixelArcadeConfig
}

interface Wish {
  id: number
  name: string
  message: string
  timestamp: string
}

export function PixelWishes({ config }: PixelWishesProps) {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: "PLAYER_ALEX",
      message: "Congratulations on reaching the final level! May your co-op adventure be filled with infinite lives and maximum happiness! 🎮❤️",
      timestamp: "2024-01-15"
    },
    {
      id: 2,
      name: "GAMER_SARAH",
      message: "You two are the perfect team! Wishing you legendary loot and epic adventures in your married life! 🏆",
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
    <section id="wishes" className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 relative">
      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="bg-magenta-500 text-white px-6 py-2 inline-block font-bold text-lg mb-4 border-4 border-white shadow-[4px_4px_0_theme(colors.purple.700)]">
            💬 MESSAGE BOARD
          </div>
          <div className="text-4xl font-bold text-cyan-400 mb-4" style={{
            textShadow: '4px_4px_0px_#ff00ff'
          }}>
            GUESTBOOK
          </div>
          <div className="text-xl text-lime-400 font-mono">
            LEAVE YOUR WISHES FOR THE PLAYERS
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 border-4 border-yellow-300 p-6 mb-8 shadow-[8px_8px_0_theme(colors.yellow.600)]"
          >
            <div className="flex items-center space-x-3 mb-4">
              <MessageSquare className="text-yellow-300" size={24} />
              <div className="text-xl font-bold text-yellow-300 font-mono">
                SEND MESSAGE
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-cyan-400 font-mono font-bold mb-2">
                  PLAYER NAME:
                </label>
                <input
                  type="text"
                  required
                  value={newWish.name}
                  onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                  className="w-full bg-black border-2 border-magenta-500 p-3 text-cyan-400 font-mono focus:border-lime-400 focus:outline-none"
                  placeholder="ENTER YOUR GAMER TAG"
                  maxLength={20}
                />
              </div>

              <div>
                <label className="block text-cyan-400 font-mono font-bold mb-2">
                  YOUR MESSAGE:
                </label>
                <textarea
                  required
                  value={newWish.message}
                  onChange={(e) => setNewWish({...newWish, message: e.target.value})}
                  className="w-full bg-black border-2 border-magenta-500 p-3 text-cyan-400 font-mono focus:border-lime-400 focus:outline-none h-24 resize-none"
                  placeholder="WRITE YOUR WISHES FOR THE COUPLE..."
                  maxLength={300}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full py-3 text-lg font-bold border-4 border-white font-mono transition-all duration-100 ${
                  isSubmitting 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-lime-400 text-gray-900 shadow-[4px_4px_0_theme(colors.green.600)] hover:shadow-[6px_6px_0_theme(colors.green.600)]'
                }`}
              >
                {isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-indigo-900 border-4 border-cyan-400 p-6 shadow-[6px_6px_0_theme(colors.purple.700)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-magenta-500 border-2 border-white flex items-center justify-center">
                      <div className="text-white font-bold text-lg">
                        {wish.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-cyan-400 font-bold font-mono">
                        {wish.name}
                      </div>
                      <div className="text-gray-400 font-mono text-sm">
                        {new Date(wish.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-300 fill-current" size={16} />
                    ))}
                  </div>
                </div>

                <div className="bg-black border-2 border-gray-600 p-4">
                  <div className="text-white font-mono leading-relaxed">
                    {wish.message}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 border-2 border-white shadow-[3px_3px_0_theme(colors.red.700)] hover:shadow-[4px_4px_0_theme(colors.red.700)] transition-all duration-100 font-mono"
                  >
                    <Heart size={16} />
                    <span>LIKE</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-8 py-4 text-xl font-bold border-4 border-white shadow-[4px_4px_0_theme(colors.green.700)] hover:shadow-[6px_6px_0_theme(colors.green.700)] transition-all duration-100 font-mono"
              onClick={() => {
                document.getElementById('thank-you')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              FINAL STAGE
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}