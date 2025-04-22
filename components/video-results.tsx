"use client"

import type { VideoResult } from "@/lib/types"
import { VideoCard } from "@/components/video-card"
import { motion } from "framer-motion"

interface VideoResultsProps {
  results: VideoResult[]
}

export function VideoResults({ results }: VideoResultsProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <h3 className="text-xl font-semibold mb-4">Search Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <VideoCard video={video} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
