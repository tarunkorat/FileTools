import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { defaultMetadata } from "@/lib/metadata"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: [
      { url: '/file-icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/file-icon.svg',
    apple: '/file-icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/file-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/file-icon.svg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'