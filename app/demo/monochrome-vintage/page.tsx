import { MonochromeVintageTemplate, sampleMonochromeVintageConfig } from '@/components/invitations/templates/monochrome-vintage'

export default function MonochromeVintageDemo() {
  return (
    <div className="min-h-screen">
      <MonochromeVintageTemplate config={sampleMonochromeVintageConfig} />
    </div>
  )
}

export const metadata = {
  title: 'Monochrome Vintage Wedding Invitation - Demo',
  description: 'A classic, timeless, sophisticated black and white wedding invitation template with Old Hollywood glamour and 1920s sophistication.',
}