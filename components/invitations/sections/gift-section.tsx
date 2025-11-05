'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gift, Copy, Check, CreditCard, Smartphone, Building } from 'lucide-react'
import type { Gift as GiftType, BankAccount } from '@/types/invitation'

interface GiftSectionProps {
  gift: GiftType
  template: 'simple-modern' | 'classic-elegant' | 'romantic-feminine'
  className?: string
}

export function GiftSection({ gift, template, className }: GiftSectionProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const getTemplateStyles = () => {
    switch (template) {
      case 'classic-elegant':
        return {
          container: 'bg-gradient-to-br from-amber-50 to-amber-100',
          title: 'text-amber-900',
          card: 'bg-amber-50 border-amber-200',
          accountCard: 'bg-white border-amber-200',
          button: 'bg-amber-600 hover:bg-amber-700 text-white',
          icon: 'text-amber-600'
        }
      case 'romantic-feminine':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-rose-100',
          title: 'text-pink-900',
          card: 'bg-pink-50 border-pink-200',
          accountCard: 'bg-white border-pink-200',
          button: 'bg-pink-600 hover:bg-pink-700 text-white',
          icon: 'text-pink-600'
        }
      default: // simple-modern
        return {
          container: 'bg-gradient-to-br from-gray-50 to-gray-100',
          title: 'text-gray-900',
          card: 'bg-gray-50 border-gray-200',
          accountCard: 'bg-white border-gray-200',
          button: 'bg-gray-600 hover:bg-gray-700 text-white',
          icon: 'text-gray-600'
        }
    }
  }

  const styles = getTemplateStyles()

  const copyToClipboard = async (text: string, accountKey: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(accountKey)
      setTimeout(() => setCopiedAccount(null), 3000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getBankIcon = (bankName: string) => {
    const bankNameLower = bankName.toLowerCase()
    
    if (bankNameLower.includes('mandiri')) return '🏦'
    if (bankNameLower.includes('bca')) return '🏦'
    if (bankNameLower.includes('bni')) return '🏦'
    if (bankNameLower.includes('bri')) return '🏦'
    if (bankNameLower.includes('danamon')) return '🏦'
    if (bankNameLower.includes('cimb')) return '🏦'
    if (bankNameLower.includes('gopay')) return '📱'
    if (bankNameLower.includes('ovo')) return '📱'
    if (bankNameLower.includes('dana')) return '📱'
    if (bankNameLower.includes('shopeepay')) return '📱'
    
    // Default icons based on type
    if (bankNameLower.includes('e-wallet') || bankNameLower.includes('wallet')) {
      return '📱'
    }
    
    return '🏦'
  }

  if (!gift?.enabled || !gift.accounts || gift.accounts.length === 0) {
    return null
  }

  return (
    <section className={`py-16 ${styles.container} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className={`h-6 w-6 ${styles.icon}`} />
            <h2 className={`text-3xl md:text-4xl font-bold ${styles.title}`}>
              Digital Gift
            </h2>
          </div>
          <p className="text-lg opacity-80">
            Your presence is the greatest gift, but if you'd like to give a wedding gift:
          </p>
        </div>

        {/* Thank You Message */}
        <Card className={`${styles.card} max-w-2xl mx-auto mb-8`}>
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-3">💝</div>
            <h3 className={`font-semibold text-lg mb-2 ${styles.title}`}>
              Thank You for Your Love & Support
            </h3>
            <p className="text-gray-600">
              Your presence at our wedding is the greatest gift of all. However, if you wish to honor us 
              with a gift, we've provided several convenient options below. Your kindness means the world to us!
            </p>
          </CardContent>
        </Card>

        {/* Bank Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gift.accounts.map((account: BankAccount, index: number) => {
            const accountKey = `${account.bankName}-${index}`
            const isCopied = copiedAccount === accountKey
            const icon = getBankIcon(account.bankName)

            return (
              <Card key={accountKey} className={`${styles.accountCard} shadow-lg overflow-hidden`}>
                <CardHeader className={`pb-4 ${styles.card}`}>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <span className="text-2xl">{icon}</span>
                    <span className="text-lg font-semibold">{account.bankName}</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Account Name */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Name</p>
                    <p className="font-medium text-gray-900">{account.accountName}</p>
                  </div>

                  {/* Account Number */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Number</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-sm font-medium text-gray-900 flex-1">
                        {account.accountNumber}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(account.accountNumber, accountKey)}
                        className="h-8 w-8 p-0 flex-shrink-0"
                        aria-label={`Copy account number for ${account.bankName}`}
                      >
                        {isCopied ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Copy Status */}
                  {isCopied && (
                    <div className="text-xs text-green-600 text-center animate-pulse">
                      ✓ Copied to clipboard
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Instructions */}
        <Card className={`${styles.card} max-w-2xl mx-auto mt-8`}>
          <CardContent className="p-6">
            <h4 className={`font-semibold mb-4 ${styles.title} text-center`}>
              How to Send Your Gift
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Building className={`h-5 w-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
                <div>
                  <h5 className="font-medium text-sm text-gray-900">Bank Transfer</h5>
                  <p className="text-xs text-gray-600">
                    Use ATM, mobile banking, or visit the nearest bank branch
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Smartphone className={`h-5 w-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
                <div>
                  <h5 className="font-medium text-sm text-gray-900">E-Wallet</h5>
                  <p className="text-xs text-gray-600">
                    Transfer using your preferred e-wallet application
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className={`h-5 w-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
                <div>
                  <h5 className="font-medium text-sm text-gray-900">Online Banking</h5>
                  <p className="text-xs text-gray-600">
                    Transfer through your bank's website or mobile app
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Copy className={`h-5 w-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
                <div>
                  <h5 className="font-medium text-sm text-gray-900">Copy & Paste</h5>
                  <p className="text-xs text-gray-600">
                    Click the copy button to quickly copy account numbers
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Closing Message */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 italic">
            "Every gift, big or small, is deeply appreciated. Thank you for being part of our journey!"
          </p>
          <div className="text-2xl mt-2">💕</div>
        </div>
      </div>
    </section>
  )
}
