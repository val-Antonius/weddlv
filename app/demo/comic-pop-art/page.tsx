import { ComicPopArtTemplate, sampleComicPopArtConfig } from '@/components/invitations/templates/comic-pop-art'

export default function ComicPopArtDemo() {
  return (
    <div className="min-h-screen">
      <ComicPopArtTemplate config={sampleComicPopArtConfig} />
    </div>
  )
}

export const metadata = {
  title: 'Comic Pop Art Wedding Invitation - Demo',
  description: 'A bold, dynamic, comic book-inspired wedding invitation template with retro pop art energy and superhero styling.',
}