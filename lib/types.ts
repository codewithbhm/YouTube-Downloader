// Video search result type
export interface VideoResult {
  id: string
  title: string
  description: string
  thumbnail: string
  channel: string
  publishedAt: string
  duration: string
}

// Download format type
export type DownloadFormat = "mp3" | "mp4"

// Download options type
export interface DownloadOptions {
  videoId: string
  format: DownloadFormat
  quality: string
  onProgress?: (progress: number) => void
}

// Download record type for history
export interface DownloadRecord {
  id: string
  videoId: string
  title: string
  thumbnail?: string
  format: DownloadFormat
  quality: string
  downloadedAt: number
  filePath?: string
}

// Settings type
export interface Settings {
  defaultFormat: DownloadFormat
  defaultQuality: "high" | "medium" | "low"
  downloadPath: string
  autoDownload: boolean
  saveHistory: boolean
}
