'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, CreditCard, Zap, Filter, Star, Target } from 'lucide-react'
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

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
}

const bankColors = [
  { bg: 'bg-red-600', icon: Zap },
  { bg: 'bg-blue-600', icon: Star },
  { bg: 'bg-purple-600', icon: Target },
  { bg: 'bg-green-500', icon: CreditCard }
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
    <section className="py-20 px-4 bg-gradient-to-br from-yellow-400 via-green-500 to-blue-600">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, -1, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-white border-4 border-black p-8 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-wider mb-4" style={comicTextStyle}>
              SUPER REGISTRY!
            </h2>
            <div className="bg-red-600 text-white px-4 py-2 border-2 border-black inline-block font-bold" style={comicTextStyle}>
              POWER UP OUR LOVE!
            </div>
          </motion.div>
        </motion.div>

        {/* Bank filter */}
        {bankTypes.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-black ml-2" />
                {bankTypes.map((type, index) => (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedBank(type)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-4 py-2 font-bold text-sm transition-all duration-300 border-2 border-black uppercase tracking-wide
                      ${selectedBank === type
                        ? `${bankColors[index % bankColors.length].bg} text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`
                        : 'bg-yellow-400 text-black hover:bg-yellow-500'
                      }
                    `}
                    style={comicTextStyle}
                  >
                    {type === 'all' ? 'ALL BANKS!' : `${type.toUpperCase()}!`}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bank accounts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBanks.map((bank, index) => {
            const colorConfig = bankColors[index % bankColors.length]
            const IconComponent = colorConfig.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -1, 1, 0]
                }}
                className="relative"
              >
                <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                  {/* Corner decorations */}
                  <div className={`absolute -top-2 -left-2 w-6 h-6 ${colorConfig.bg} border-2 border-black`}></div>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 ${colorConfig.bg} border-2 border-black`}></div>
                  <div className={`absolute -bottom-2 -left-2 w-6 h-6 ${colorConfig.bg} border-2 border-black`}></div>
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 ${colorConfig.bg} border-2 border-black`}></div>

                  {/* Hero badge */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4 + index, repeat: Infinity, ease: "linear" }}
                    className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colorConfig.bg} text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center`}
                  >
                    <IconComponent size={20} />
                  </motion.div>

                  <div className="text-center mb-6 pt-4">
                    <h3 className="text-2xl font-bold text-black mb-2 uppercase tracking-wide" style={comicTextStyle}>
                      {bank.name}
                    </h3>
                    <div className="w-16 h-1 bg-black mx-auto"></div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="font-bold text-black text-sm mb-1 block uppercase tracking-wide">
                        ACCOUNT HOLDER
                      </label>
                      <div className="bg-yellow-400 border-2 border-black p-2">
                        <p className="font-bold text-black">
                          {bank.holder}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-black text-sm mb-1 block uppercase tracking-wide">
                        ACCOUNT NUMBER
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="font-mono font-bold flex-1 bg-yellow-400 border-2 border-black p-2">
                          {bank.account}
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            onClick={() => copyToClipboard(bank.account, bank.account)}
                            className={`
                              p-2 border-4 border-black transition-all duration-300 font-bold
                              ${copiedAccount === bank.account
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : `${colorConfig.bg} text-white hover:opacity-80`
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
                          className="text-black text-sm mt-1 font-bold"
                        >
                          COPIED! ZAP!
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
                          w-full mt-4 transition-all duration-300 font-bold border-4 border-black uppercase tracking-wide
                          ${copiedAccount === `${bank.name}-all`
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : `${colorConfig.bg} hover:opacity-80 text-white`
                          }
                        `}
                        style={comicTextStyle}
                      >
                        {copiedAccount === `${bank.name}-all` ? (
                          <div className="flex items-center gap-2">
                            <Check size={18} />
                            ALL COPIED! BOOM!
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CreditCard size={18} />
                            COPY ALL DATA!
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Action word */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className={`absolute -bottom-4 -right-4 ${colorConfig.bg} text-white px-3 py-1 border-4 border-black font-bold text-sm transform rotate-12`}
                  style={comicTextStyle}
                >
                  {index % 4 === 0 && "ZAP!"}
                  {index % 4 === 1 && "POW!"}
                  {index % 4 === 2 && "BOOM!"}
                  {index % 4 === 3 && "WHAM!"}
                </motion.div>
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
            className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-3xl mx-auto relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Action burst */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
            >
              <Star size={20} />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase tracking-wide pt-4" style={comicTextStyle}>
              THANK YOU HEROES!
            </h3>
            <p className="font-bold text-black leading-relaxed">
              YOUR SUPER GENEROSITY POWERS UP OUR LOVE ADVENTURE! 
              WHETHER YOU CHOOSE TO GIVE A GIFT OR JUST CELEBRATE WITH US, 
              YOU'RE ALREADY OUR GREATEST TREASURE!
            </p>
            <motion.div 
              className="flex justify-center gap-2 mt-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="bg-red-600 text-white px-2 py-1 border-2 border-black font-bold text-sm" style={comicTextStyle}>LOVE!</div>
              <div className="bg-blue-600 text-white px-2 py-1 border-2 border-black font-bold text-sm" style={comicTextStyle}>POWER!</div>
              <div className="bg-yellow-400 text-black px-2 py-1 border-2 border-black font-bold text-sm" style={comicTextStyle}>JOY!</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}