'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { MessageCircle, Send, Heart, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface GuestbookMessage {
  id: string
  name: string
  message: string
  created_at: string
}

interface GuestbookSectionProps {
  invitationId: string
  template: 'simple-modern' | 'classic-elegant' | 'romantic-feminine'
  className?: string
}

export function GuestbookSection({ invitationId, template, className }: GuestbookSectionProps) {
  const [messages, setMessages] = useState<GuestbookMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })
  const [mounted, setMounted] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    fetchMessages()
  }, [invitationId])

  const fetchMessages = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('guestbook')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error fetching guestbook messages:', error)
        return
      }

      setMessages(data || [])
    } catch (error) {
      console.error('Unexpected error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.message.trim()) {
      return
    }

    if (formData.message.length > 500) {
      return
    }

    setSubmitting(true)

    try {
      const { data, error } = await (supabase as any)
        .from('guestbook')
        .insert({
          invitation_id: invitationId,
          name: formData.name.trim(),
          message: formData.message.trim()
        })
        .select()
        .single()

      if (error) {
        console.error('Error submitting message:', error)
        return
      }

      // Add new message to the list
      setMessages(prev => [data as GuestbookMessage, ...prev])
      
      // Clear form
      setFormData({ name: '', message: '' })
    } catch (error) {
      console.error('Unexpected error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const getTemplateStyles = () => {
    switch (template) {
      case 'classic-elegant':
        return {
          container: 'bg-gradient-to-br from-amber-50 to-amber-100',
          title: 'text-amber-900',
          card: 'bg-amber-50 border-amber-200',
          messageCard: 'bg-white border-amber-200',
          input: 'border-amber-200 focus:border-amber-400',
          button: 'bg-amber-600 hover:bg-amber-700 text-white',
          icon: 'text-amber-600'
        }
      case 'romantic-feminine':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-rose-100',
          title: 'text-pink-900',
          card: 'bg-pink-50 border-pink-200',
          messageCard: 'bg-white border-pink-200',
          input: 'border-pink-200 focus:border-pink-400',
          button: 'bg-pink-600 hover:bg-pink-700 text-white',
          icon: 'text-pink-600'
        }
      default: // simple-modern
        return {
          container: 'bg-gradient-to-br from-gray-50 to-gray-100',
          title: 'text-gray-900',
          card: 'bg-gray-50 border-gray-200',
          messageCard: 'bg-white border-gray-200',
          input: 'border-gray-200 focus:border-gray-400',
          button: 'bg-gray-600 hover:bg-gray-700 text-white',
          icon: 'text-gray-600'
        }
    }
  }

  const styles = getTemplateStyles()

  if (!mounted) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section className={`py-16 ${styles.container} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className={`h-6 w-6 ${styles.icon}`} />
            <h2 className={`text-3xl md:text-4xl font-bold ${styles.title}`}>
              Guestbook
            </h2>
          </div>
          <p className="text-lg opacity-80">
            Leave a message for the happy couple
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Message Form */}
          <Card className={`${styles.card} shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Write a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={styles.input}
                    maxLength={100}
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className={`${styles.input} min-h-[120px] resize-none`}
                    maxLength={500}
                    required
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formData.message.length}/500 characters
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting || !formData.name.trim() || !formData.message.trim()}
                  className={`w-full ${styles.button} flex items-center justify-center gap-2`}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Messages Display */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <Card className={`${styles.messageCard} text-center py-8`}>
                <CardContent>
                  <Heart className={`h-12 w-12 ${styles.icon} mx-auto mb-4 opacity-50`} />
                  <p className="text-gray-500">No messages yet. Be the first to wish the couple!</p>
                </CardContent>
              </Card>
            ) : (
              messages.map((message) => (
                <Card key={message.id} className={`${styles.messageCard} shadow`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{message.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {formatDate(message.created_at)}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
