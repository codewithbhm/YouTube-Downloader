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
      // First, call the API to start the download process
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: video.id,
          format,
          quality,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      // Simulate download progress with smoother updates
      let currentProgress = 0
      const progressInterval = setInterval(() => {
        currentProgress += Math.random() * 5
        if (currentProgress >= 100) {
          currentProgress = 100
          clearInterval(progressInterval)

          // Show success toast
          toast({
            title: "Download complete",
            description: `${video.title} has been downloaded successfully.`,
            variant: "success",
          })

          // Create a temporary anchor to trigger the download
          const a = document.createElement("a")
          a.href = data.downloadUrl
          a.download = data.filename || `${video.title}.${format}`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)

          // Close the dialog after a short delay
          setTimeout(() => {
            onOpenChange(false)
            setIsDownloading(false)
            setProgress(0)
          }, 1000)
        }
        setProgress(currentProgress)
      }, 200)
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download failed",
        description: "There was an error downloading the video. Please try again.",
        variant: "destructive",
      })
      setIsDownloading(false)
      setProgress(0)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (isDownloading && newOpen === false) {
          // Prevent closing while downloading
          toast({
            title: "Download in progress",
            description: "Please wait for the download to complete.",
          })
          return
        }
        onOpenChange(newOpen)
      }}
    >
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
