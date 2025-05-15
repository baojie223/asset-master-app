'use client'

import { useState, RefObject } from 'react'
import { motion } from 'framer-motion'
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

interface TimelineProps {
  playMusicRef: RefObject<(() => void) | null>
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "2023-06-03",
    title: "Beginning",
    description: "第一次合照，我就漏了个边",
    imageUrl: "/images/20230603上海.jpg"
  },
  {
    id: 2,
    date: "2023-06-22",
    title: "长沙",
    description: "长沙菜顶呱呱",
    imageUrl: "/images/20230622长沙.jpg"
  },
  {
    id: 3,
    date: "2023-08-22",
    title: "上海",
    description: "百日纪念日一起去撸狗",
    imageUrl: "/images/20230822上海520.jpg"
  },
  {
    id: 4,
    date: "2023-09-24",
    title: "上海 - 外滩",
    description: "坐了最后一趟露天观光车",
    imageUrl: "/images/20230924上海观光车.jpg"
  },
  {
    id: 5,
    date: "2023-09-29",
    title: "上海 - 豫园",
    description: "中秋一起去豫园凑热闹",
    imageUrl: "/images/20230929上海豫园.jpg",
  },
  {
    id: 6,
    date: "2023-10-02",
    title: "西安",
    description: "第一次体验汉服",
    imageUrl: "/images/20231002西安.jpg"
  },
  {
    id: 7,
    date: "2023-11-25",
    title: "浙江 - 南浔古镇",
    description: "开启了古镇探索的序幕",
    imageUrl: "/images/20231125浙江南浔古镇.jpg"
  },
  {
    id: 8,
    date: "2023-12-10",
    title: "重庆",
    description: "串串性价比无敌",
    imageUrl: "/images/20231210重庆.jpg"
  },
  {
    id: 9,
    date: "2023-12-31",
    title: "无锡",
    description: "去灵山大佛跨年，人很多",
    imageUrl: "/images/20231231无锡灵山大佛.jpg"
  },
  {
    id: 10,
    date: "2024-01-31",
    title: "曼谷",
    description: "异域风情好啊",
    imageUrl: "/images/20240131曼谷.jpg"
  },
  {
    id: 11,
    date: "2024-02-01",
    title: "芭提雅",
    description: "可惜没看到人妖秀",
    imageUrl: "/images/20240201泰国芭提雅.jpg",
  },
  {
    id: 12,
    date: "2024-03-11",
    title: "北京 - 环球影城",
    description: "张丽娜参与了魔杖演出, 做了次NPC",
    imageUrl: "/images/20240311北京环球影城.jpg"
  },
  {
    id: 13,
    date: "2024-03-12",
    title: "北京 - 天安门",
    description: "远远看了升旗仪式",
    imageUrl: "/images/20240312北京天安门.jpg"
  },
  {
    id: 14,
    date: "2024-03-13",
    title: "北京 - 长城",
    description: "全部都爬完了, good!",
    imageUrl: "/images/20240313北京长城.jpg"
  },
  {
    id: 15,
    date: "2024-05-15",
    title: "苏州 - 苏州中心",
    description: "一周年纪念日，头发一塌糊涂",
    imageUrl: "/images/20240515苏州一周年.jpg"
  },
  {
    id: 16,
    date: "2024-06-09",
    title: "舟山",
    description: "皮皮虾真好吃，松叶蟹也是一顶一",
    imageUrl: "/images/20240609舟山.jpg"
  },
  {
    id: 17,
    date: "2024-08-10",
    title: "无锡 - 演唱会",
    description: "看了小霞的演唱会，享受",
    imageUrl: "/images/20240810无锡演唱会.jpg",
  },
  {
    id: 18,
    date: "2024-08-17",
    title: "苏州 - 淀山湖",
    description: "去淀山湖露营，第一次(靠路人)搭天幕",
    imageUrl: "/images/20240817苏州淀山湖.jpg"
  },
  {
    id: 19,
    date: "2024-09-22",
    title: "上海 - 迪士尼",
    description: "第一次一起去迪士尼，还没花门票钱",
    imageUrl: "/images/20240922上海迪士尼.jpg"
  },
  {
    id: 20,
    date: "2024-10-02",
    title: "台州 - 神仙居",
    description: "天地之根很美",
    imageUrl: "/images/20241002台州神仙居.jpg"
  },
  {
    id: 21,
    date: "2024-10-03",
    title: "霞浦",
    description: "下雨天什么都没有",
    imageUrl: "/images/20241003霞浦.jpg"
  },
  {
    id: 22,
    date: "2024-10-05",
    title: "福州",
    description: "接福气",
    imageUrl: "/images/20241005福州.jpg"
  },
  {
    id: 23,
    date: "2024-12-25",
    title: "哈尔滨 - 冰雪大世界",
    description: "冻得跟个狗日的一样",
    imageUrl: "/images/20241225哈尔滨冰雪大世界.jpg",
  },
  {
    id: 24,
    date: "2025-04-05",
    title: "衢州",
    description: "只知道后来再没吃过鸭头",
    imageUrl: "/images/20250405衢州.jpg"
  },
  {
    id: 25,
    date: "2025-05-01",
    title: "南昌",
    description: "南昌拌粉真好吃",
    imageUrl: "/images/20250501南昌.jpg",
  },
  {
    id: 26,
    date: "2025-05-02",
    title: "Now",
    description: "两周年纪念日，送给张丽娜的寄语",
    imageUrl: "/images/20241208考公.jpg",
    isAnniversary: true
  }
]

export function Timeline({ playMusicRef }: TimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [showAnniversary, setShowAnniversary] = useState(false)

  const handleEventClick = (event: TimelineEvent) => {
    if (event.id === 1 && playMusicRef.current) {
      playMusicRef.current()
    }
    if (event.isAnniversary) {
      setShowAnniversary(true)
    } else {
      setSelectedEvent(event)
    }
  }

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
            onClick={() => handleEventClick(event)}
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