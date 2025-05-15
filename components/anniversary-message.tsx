'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface AnniversaryMessageProps {
  onClose: () => void
}

// 在这里修改您的寄语内容
const messageContent = {
  title: "两周年快乐！",
  date: "2025年5月15日",
  greeting: "亲爱的张丽娜：",
  paragraphs: [
    "两年的时间转瞬即逝，",
    "这两年里，我们经历了很多，",
    "也去过很多个地方，",
    "为此，我希望能记录下我们自己的足迹。",
    "也希望未来的日子里，",
    "我们能一起继续书写属于我们的故事。",
    "最后，",
    "祝愿你的脸上，",
    "永远都有最灿烂的笑容！"
  ],
  signature: "你的杰哥"
}

export function AnniversaryMessage({ onClose }: AnniversaryMessageProps) {
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
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className="bg-white p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="max-w-xl mx-auto">
            {/* 信纸背景 */}
            <div className="bg-[#fff9f0] p-8 rounded-lg shadow-inner border border-[#e8d9c5]">
              {/* 日期 */}
              <div className="text-right text-gray-600 mb-6">
                {messageContent.date}
              </div>

              {/* 标题 */}
              <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
                {messageContent.title}
              </h2>

              {/* 称呼 */}
              <div className="text-gray-700 mb-4">
                {messageContent.greeting}
              </div>

              {/* 正文 */}
              <div className="space-y-4 text-gray-700 mb-8">
                {messageContent.paragraphs.map((paragraph, index) => (
                  <p key={index} className="indent-8 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* 图片 */}
              <div className="flex justify-center mb-8">
                <img 
                  src="/images/20241208考公.jpg" 
                  alt="我们的照片" 
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>

              {/* 签名 */}
              <div className="text-right text-gray-700">
                {messageContent.signature}
              </div>
            </div>
          </div>

          {/* 关闭按钮 */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              关闭
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 