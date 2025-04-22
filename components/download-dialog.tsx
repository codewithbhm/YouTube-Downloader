"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { VideoResult, DownloadFormat } from "@/lib/types"
import { downloadVideo } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface DownloadDialogProps {
  video: VideoResult
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DownloadDialog({ video, open, onOpenChange }: DownloadDialogProps) {
  const [format, setFormat] = useState<DownloadFormat>("mp4")
  const [quality, setQuality] = useState("high")
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)
    setProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 300)

      // Call the API to download the video
      await downloadVideo({
        videoId: video.id,
        format,
        quality,
        onProgress: (p) => setProgress(p),
      })

      clearInterval(progressInterval)
      setProgress(100)

      toast({
        title: "Download complete",
        description: `${video.title} has been downloaded successfully.`,
      })

      // Close the dialog after a short delay
      setTimeout(() => {
        onOpenChange(false)
        setIsDownloading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading the video. Please try again.",
        variant: "destructive",
      })
      setIsDownloading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Video</DialogTitle>
          <DialogDescription>Choose your preferred format and quality</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
            <Image
              src={video.thumbnail || "/placeholder.svg?height=720&width=1280"}
              alt={video.title}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="font-medium line-clamp-2">{video.title}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select
                value={format}
                onValueChange={(value) => setFormat(value as DownloadFormat)}
                disabled={isDownloading}
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp4">MP4 (Video)</SelectItem>
                  <SelectItem value="mp3">MP3 (Audio)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality">Quality</Label>
              <Select value={quality} onValueChange={setQuality} disabled={isDownloading}>
                <SelectTrigger id="quality">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isDownloading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Downloading...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDownloading}>
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
