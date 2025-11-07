import { FloralForestTemplate, sampleFloralForestConfig } from '@/components/invitations/templates/floral-forest'

export default function FloralForestDemo() {
  return (
    <div className="min-h-screen">
      <FloralForestTemplate config={sampleFloralForestConfig} />
    </div>
  )
}

export const metadata = {
  title: 'Floral Forest Wedding Invitation - Demo',
  description: 'A beautiful floral-themed wedding invitation template with natural, organic, romantic woodland atmosphere.',
}