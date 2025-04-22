"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Clock, User } from "lucide-react"
import type { VideoResult } from "@/lib/types"
import { DownloadDialog } from "@/components/download-dialog"
import Image from "next/image"

interface VideoCardProps {
  video: VideoResult
}

export function VideoCard({ video }: VideoCardProps) {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-slate-800 h-full flex flex-col bg-background/60 backdrop-blur-sm">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnail || "/placeholder.svg?height=720&width=1280"}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <User className="h-3 w-3 mr-1" />
            <span className="line-clamp-1">{video.channel}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{video.publishedAt}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() => setShowDownloadDialog(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </CardFooter>
      </Card>

      <DownloadDialog video={video} open={showDownloadDialog} onOpenChange={setShowDownloadDialog} />
    </>
  )
}
