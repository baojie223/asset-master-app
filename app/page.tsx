import { Timeline } from '@/components/timeline'
import { MusicPlayer } from '@/components/music-player'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-pink-600 animate-fade-in">
          Jie & Lina&apos;s love story
        </h1>
        <Timeline />
        <MusicPlayer />
      </div>
    </main>
  )
}
