'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ImageModalProps {
  event: {
    title: string
    imageUrl: string
    description: string
  }
  onClose: () => void
}

export function ImageModal({ event, onClose }: ImageModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-white p-4 rounded-lg max-w-2xl w-full mx-4"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-auto rounded-lg"
          />
          <h3 className="text-xl font-bold mt-4">{event.title}</h3>
          <p className="text-gray-600 mt-2">{event.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 