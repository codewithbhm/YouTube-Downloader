import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const searchParams = request.nextUrl.searchParams
  const title = searchParams.get("title") || id

  // In a real app, this would stream the actual file
  // For now, we'll return a mock response with better headers for downloading

  // Extract the file extension from the ID
  const fileExtension = id.split(".").pop()
  const isAudio = fileExtension === "mp3"

  // Set appropriate content type
  const contentType = isAudio ? "audio/mpeg" : "video/mp4"

  // Create a simple buffer of dummy data to simulate a real file
  const dummyData = new Uint8Array(isAudio ? 1024 * 1024 : 5 * 1024 * 1024) // 1MB for audio, 5MB for video
  for (let i = 0; i < dummyData.length; i++) {
    dummyData[i] = Math.floor(Math.random() * 256)
  }

  // Create a more realistic response with appropriate headers
  return new NextResponse(dummyData, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${title}.${fileExtension}"`,
      "Content-Length": `${dummyData.length}`,
      "Cache-Control": "no-cache",
    },
  })
}
