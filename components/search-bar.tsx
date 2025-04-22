"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { VideoResults } from "@/components/video-results"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { searchVideos } from "@/lib/api"
import type { VideoResult } from "@/lib/types"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<VideoResult[]>([])
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) {
      toast({
        title: "Search query is empty",
        description: "Please enter a search term",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const data = await searchVideos(query)
      setResults(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search videos. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Download YouTube Videos</h2>
          <p className="text-muted-foreground">Search for videos and download them as MP3 or MP4</p>
        </div>

        <form onSubmit={handleSearch} className="flex w-full max-w-3xl mx-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for YouTube videos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 bg-background/80 backdrop-blur-sm"
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
      </motion.div>

      {results.length > 0 && <VideoResults results={results} />}
    </div>
  )
}
