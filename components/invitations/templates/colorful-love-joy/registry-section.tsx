'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, CreditCard, Gift, Filter, Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Bank {
  name: string
  account: string
  holder: string
}

interface RegistrySectionProps {
  registry: {
    banks: Bank[]
  }
}

const bankGradients = [
  'from-pink-400 to-rose-400',
  'from-yellow-400 to-orange-400',
  'from-purple-400 to-fuchsia-400',
  'from-blue-400 to-sky-400',
  'from-emerald-400 to-teal-400'
]

export function RegistrySection({ registry }: RegistrySectionProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [selectedBank, setSelectedBank] = useState<string>('all')

  const copyToClipboard = async (text: string, accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(accountNumber)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const bankTypes = ['all', ...new Set(registry.banks.map(bank => bank.name.toLowerCase().split(' ')[0]))]
  
  const filteredBanks = selectedBank === 'all' 
    ? registry.banks 
    : registry.banks.filter(bank => bank.name.toLowerCase().includes(selectedBank))

  return (
    <section className="py-20 px-4 bg-gradient-to-bl from-teal-200 via-green-200 to-blue-200">
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
            Wedding Registry 🎁
          </motion.h2>
          <p className="font-nunito text-xl text-gray-700 max-w-2xl mx-auto">
            Your love and presence are the greatest gifts, but if you'd like to celebrate with us! 💕
          </p>
          <motion.div 
            className="w-40 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mx-auto rounded-full mt-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Bank filter */}
        {bankTypes.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-500 ml-2" />
                {bankTypes.map((type, index) => (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedBank(type)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-4 py-2 rounded-xl font-nunito font-semibold text-sm transition-all duration-300
                      ${selectedBank === type
                        ? `bg-gradient-to-r ${bankGradients[index % bankGradients.length]} text-white shadow-md`
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    {type === 'all' ? 'All Banks 🏦' : `${type.charAt(0).toUpperCase() + type.slice(1)} 💳`}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bank accounts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBanks.map((bank, index) => {
            const gradient = bankGradients[index % bankGradients.length]
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: index % 2 === 0 ? 2 : -2
                }}
                className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
              >
                {/* Floating decorations */}
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
                  {index % 3 === 0 && <Gift size={24} />}
                  {index % 3 === 1 && <Heart size={24} />}
                  {index % 3 === 2 && <Star size={24} />}
                </motion.div>

                <div className="text-center mb-6 text-white">
                  <motion.div 
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CreditCard className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-pacifico text-2xl mb-2 drop-shadow-lg">
                    {bank.name}
                  </h3>
                  <motion.div 
                    className="w-16 h-1 bg-white/50 mx-auto rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                <div className="space-y-4 text-white">
                  <div>
                    <label className="font-nunito text-sm font-semibold mb-1 block opacity-90">
                      Account Holder
                    </label>
                    <p className="font-nunito font-bold">
                      {bank.holder}
                    </p>
                  </div>

                  <div>
                    <label className="font-nunito text-sm font-semibold mb-1 block opacity-90">
                      Account Number
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="font-mono font-medium flex-1 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/30">
                        {bank.account}
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          onClick={() => copyToClipboard(bank.account, bank.account)}
                          className={`
                            p-2 rounded-xl transition-all duration-300 border border-white/30
                            ${copiedAccount === bank.account
                              ? 'bg-white text-green-500 hover:bg-white/90'
                              : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                            }
                          `}
                          variant="ghost"
                        >
                          {copiedAccount === bank.account ? (
                            <Check size={18} />
                          ) : (
                            <Copy size={18} />
                          )}
                        </Button>
                      </motion.div>
                    </div>
                    {copiedAccount === bank.account && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white text-sm mt-1 font-nunito font-semibold"
                      >
                        Copied! ✨
                      </motion.p>
                    )}
                  </div>

                  {/* Copy all info button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => copyToClipboard(
                        `${bank.name}\nAccount Holder: ${bank.holder}\nAccount Number: ${bank.account}`,
                        `${bank.name}-all`
                      )}
                      className={`
                        w-full mt-4 transition-all duration-300 font-nunito font-bold rounded-xl border-2 border-white/30
                        ${copiedAccount === `${bank.name}-all`
                          ? 'bg-white text-green-500 hover:bg-white/90'
                          : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                        }
                      `}
                    >
                      {copiedAccount === `${bank.name}-all` ? (
                        <div className="flex items-center gap-2">
                          <Check size={18} />
                          All Details Copied! ✨
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Gift size={18} />
                          Copy All Details 📋
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Thank you message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg max-w-3xl mx-auto relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Floating decorations */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 text-pink-300"
            >
              <Heart size={32} />
            </motion.div>
            
            <h3 className="font-pacifico text-3xl md:text-4xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
              Thank You for Your Love! 💕
            </h3>
            <p className="font-nunito text-lg text-gray-700 leading-relaxed">
              Your love, laughter, and presence at our wedding mean the world to us! 
              Whether you choose to give a gift or simply celebrate with us, 
              you're already giving us the greatest gift of all - your friendship! 🌈✨
            </p>
            <motion.div 
              className="flex justify-center gap-2 mt-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>💖</span>
              <span>🎉</span>
              <span>🌟</span>
              <span>🥳</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}