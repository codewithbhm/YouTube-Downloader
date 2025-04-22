import { SearchBar } from "@/components/search-bar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">YouTube Downloader</h1>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-5xl">
            <SearchBar />
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
