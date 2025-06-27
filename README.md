# YouTube Downloader

A full-stack application for downloading YouTube videos in MP3 and MP4 formats, built with modern web technologies.

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

## Features

- 🎥 Download YouTube videos in MP4 format
- 🎵 Extract audio in MP3 format
- 🎯 Multiple quality options for downloads
- 📱 Responsive modern UI design
- 💾 Download history tracking
- 🌓 Light/Dark theme support

## Tech Stack

- **Frontend:**
  - Next.js 13+ (App Router)
  - TypeScript
  - Tailwind CSS
  - React Components

- **Backend:**
  - Next.js API Routes
  - TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/codewithbhm/YouTube-Downloader.git
```

2. Navigate to the project directory:
```bash
cd YouTube-Downloader
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
YouTube-Downloader/
├── app/                    # Next.js app router directory
│   ├── api/               # API routes
│   │   └── download/      # Download endpoint
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── app-sidebar.tsx    # Application sidebar
│   └── download-dialog.tsx# Download modal
├── lib/                   # Utility functions
│   ├── api.ts            # API functions
│   ├── storage.ts        # Storage utilities
│   └── types.ts          # TypeScript types
└── public/               # Static files
```

## API Routes

### POST /api/download
Downloads a YouTube video with specified format and quality.

Request body:
```json
{
  "videoId": "string",
  "format": "mp3" | "mp4",
  "quality": "high" | "medium" | "low"
}
```

Response:
```json
{
  "success": true,
  "downloadUrl": "string",
  "filename": "string"
}
```

## Development

The project uses the following development tools and practices:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Next.js App Router for routing
- React Server Components
- Tailwind CSS for styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Known Issues

- The current version uses mock data for development purposes
- Download progress is simulated for demonstration

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Next.js
- UI components from a custom component library
- Icons from various open-source libraries

## Support

For support, please create an issue in the GitHub repository or contact the maintainers.
