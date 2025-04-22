import type { Settings, DownloadRecord } from "@/lib/types"

// Local storage keys
const SETTINGS_KEY = "yt-downloader-settings"
const HISTORY_KEY = "yt-downloader-history"

// Default settings
const DEFAULT_SETTINGS: Settings = {
  defaultFormat: "mp4",
  defaultQuality: "high",
  downloadPath: "Downloads",
  autoDownload: true,
  saveHistory: true,
}

/**
 * Get user settings from localStorage
 */
export function getSettings(): Settings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS
  }

  const savedSettings = localStorage.getItem(SETTINGS_KEY)
  if (!savedSettings) {
    return DEFAULT_SETTINGS
  }

  try {
    return JSON.parse(savedSettings) as Settings
  } catch (error) {
    console.error("Failed to parse settings:", error)
    return DEFAULT_SETTINGS
  }
}

/**
 * Save user settings to localStorage
 */
export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

/**
 * Get download history from localStorage
 */
export function getDownloadHistory(): DownloadRecord[] {
  if (typeof window === "undefined") {
    return []
  }

  const savedHistory = localStorage.getItem(HISTORY_KEY)
  if (!savedHistory) {
    return []
  }

  try {
    return JSON.parse(savedHistory) as DownloadRecord[]
  } catch (error) {
    console.error("Failed to parse download history:", error)
    return []
  }
}

/**
 * Add a download record to history
 */
export function addDownloadToHistory(record: DownloadRecord): void {
  if (typeof window === "undefined") {
    return
  }

  const settings = getSettings()
  if (!settings.saveHistory) {
    return
  }

  const history = getDownloadHistory()
  const updatedHistory = [record, ...history].slice(0, 50) // Keep only the last 50 downloads

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory))
}

/**
 * Clear download history
 */
export function clearDownloadHistory(): void {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(HISTORY_KEY)
}
