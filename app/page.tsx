'use client'

import { useRef } from 'react'
import { Timeline } from '@/components/timeline'
import { MusicPlayer } from '@/components/music-player'

export default function HomePage() {
  const playMusicRef = useRef<(() => void) | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-pink-600 animate-fade-in">
          Jie & Lina&apos;s love map
        </h1>
        <Timeline playMusicRef={playMusicRef} />
        <MusicPlayer onPlay={(play) => playMusicRef.current = play} />
      </div>
    </main>
  )
}
