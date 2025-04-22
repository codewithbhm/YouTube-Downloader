import { render, screen } from "@testing-library/react"
import { SearchBar } from "@/components/search-bar"

// Mock the API and hooks
jest.mock("@/lib/api", () => ({
  searchVideos: jest.fn(),
}))

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe("SearchBar", () => {
  it("renders the search input", () => {
    render(<SearchBar />)

    // Check if the search input is rendered
    expect(screen.getByPlaceholderText(/search for youtube videos/i)).toBeInTheDocument()

    // Check if the search button is rendered
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument()
  })
})
