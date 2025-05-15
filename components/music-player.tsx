'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MusicPlayerProps {
  onPlay?: (play: () => void) => void
}

export function MusicPlayer({ onPlay }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(typeof window !== 'undefined' ? new Audio('/bg.mp3') : null)

  useEffect(() => {
    if (audio) {
      audio.loop = true
    }
    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [audio])

  const play = () => {
    if (audio && !isPlaying) {
      audio.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (onPlay) {
      onPlay(play)
    }
  }, [onPlay])

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <motion.button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
      >
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-4 border-pink-500" />
          <div className="absolute inset-2 rounded-full border-2 border-pink-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-pink-500" />
          </div>
        </div>
      </motion.button>
    </div>
  )
} 