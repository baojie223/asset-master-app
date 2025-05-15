'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageModal } from './image-modal'
import { AnniversaryMessage } from './anniversary-message'

interface TimelineEvent {
  id: number
  date: string
  title: string
  description: string
  imageUrl: string
  isAnniversary?: boolean
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "2022-03-14",
    title: "我们的第一次相遇",
    description: "在樱花盛开的季节，命运让我们相遇",
    imageUrl: "/images/first-meet.jpg"
  },
  {
    id: 2,
    date: "2022-04-01",
    title: "第一次约会",
    description: "在咖啡厅的午后，我们聊了很多很多",
    imageUrl: "/images/first-date.jpg"
  },
  {
    id: 3,
    date: "2022-05-20",
    title: "表白日",
    description: "在这个特别的日子，我们决定在一起",
    imageUrl: "/images/confession.jpg"
  },
  {
    id: 4,
    date: "2023-03-14",
    title: "一周年纪念",
    description: "一年的时光，让我们的感情更加深厚",
    imageUrl: "/images/first-anniversary.jpg"
  },
  {
    id: 5,
    date: "2024-03-14",
    title: "两周年纪念",
    description: "我们的爱情故事继续书写",
    imageUrl: "/images/anniversary.jpg",
    isAnniversary: true
  }
]

export function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [showAnniversary, setShowAnniversary] = useState(false)

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-300" />
      
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className={`relative mb-8 ${index % 2 === 0 ? 'ml-0' : 'ml-auto'} w-1/2`}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => event.isAnniversary ? setShowAnniversary(true) : setSelectedEvent(event)}
          >
            <div className="text-pink-500 font-semibold">{event.date}</div>
            <h3 className="text-xl font-bold mt-2">{event.title}</h3>
            <p className="text-gray-600 mt-2">{event.description}</p>
          </div>
        </motion.div>
      ))}

      {selectedEvent && (
        <ImageModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {showAnniversary && (
        <AnniversaryMessage onClose={() => setShowAnniversary(false)} />
      )}
    </div>
  )
} 