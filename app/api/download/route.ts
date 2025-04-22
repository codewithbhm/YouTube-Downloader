import { type NextRequest, NextResponse } from "next/server"
import type { VideoResult } from "@/lib/types"

// Mock data for development
const mockVideos: VideoResult[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    description: 'The official music video for "Never Gonna Give You Up" by Rick Astley',
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    channel: "Rick Astley",
    publishedAt: "Oct 25, 2009",
    duration: "3:33",
  },
  {
    id: "9bZkp7q19f0",
    title: "PSY - GANGNAM STYLE(강남스타일) M/V",
    description:
      "PSY - 'I LUV IT' M/V @ https://youtu.be/Xvjnoagk6GU PSY - 'New Face' M/V @https://youtu.be/OwJPPaEyqhI PSY - 8TH ALBUM '4X2=8' on iTunes @",
    thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    channel: "officialpsy",
    publishedAt: "Jul 15, 2012",
    duration: "4:13",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Luis Fonsi - Despacito ft. Daddy Yankee",
    description:
      'Despacito" disponible ya en todas las plataformas digitales: https://UMLE.lnk.to/DOoUzFp "Imposible" disponible ya en todas las plataformas digitales: ...',
    thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
    channel: "Luis Fonsi",
    publishedAt: "Jan 12, 2017",
    duration: "4:41",
  },
  {
    id: "JGwWNGJdvx8",
    title: "Ed Sheeran - Shape of You (Official Music Video)",
    description: "The official music video for Ed Sheeran - Shape Of You",
    thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
    channel: "Ed Sheeran",
    publishedAt: "Jan 30, 2017",
    duration: "4:24",
  },
  {
    id: "OPf0YbXqDm0",
    title: "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
    description: "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
    thumbnail: "https://i.ytimg.com/vi/OPf0YbXqDm0/maxresdefault.jpg",
    channel: "Mark Ronson",
    publishedAt: "Nov 19, 2014",
    duration: "4:31",
  },
  {
    id: "RgKAFK5djSk",
    title: "Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack",
    description:
      "The Fate of the Furious: The Album available now - https://atlantic.lnk.to/f8 Download the new Furious 7 Soundtrack Deluxe Version on iTunes here: ...",
    thumbnail: "https://i.ytimg.com/vi/RgKAFK5djSk/maxresdefault.jpg",
    channel: "Wiz Khalifa",
    publishedAt: "Apr 6, 2015",
    duration: "3:58",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoId, format, quality } = body

    if (!videoId || !format || !quality) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Find the video in our mock data
    const video = mockVideos.find((v) => v.id === videoId)

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // In a real app, this would use ytdl-core or similar to download the video
    // For now, we'll simulate a download

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return a mock download URL
    return NextResponse.json({
      success: true,
      downloadUrl: `/api/files/${videoId}.${format}`,
      filename: `${video.title}.${format}`,
    })
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: "Failed to process download request" }, { status: 500 })
  }
}
