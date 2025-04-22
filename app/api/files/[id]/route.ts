import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // In a real app, this would stream the actual file
  // For now, we'll return a mock response

  // Extract the file extension from the ID
  const fileExtension = id.split(".").pop()
  const isAudio = fileExtension === "mp3"

  // Set appropriate content type
  const contentType = isAudio ? "audio/mpeg" : "video/mp4"

  // Create a simple response with appropriate headers
  return new NextResponse("Mock file content", {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="youtube-download-${id}"`,
    },
  })
}
