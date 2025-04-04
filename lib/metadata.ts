import { Metadata } from "next"

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://filetools.com"),
  title: {
    default: "FileTools - Online PDF and Image Tools",
    template: "%s | FileTools"
  },
  description: "Free online tools for PDF and image processing. Merge, split, compress PDFs, convert images, and more. No installation required.",
  keywords: ["PDF tools", "image tools", "PDF converter", "image converter", "online tools", "free tools"],
  authors: [{ name: "FileTools Team" }],
  creator: "FileTools",
  publisher: "FileTools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://filetools.com",
    siteName: "FileTools",
    title: "FileTools - Online PDF and Image Tools",
    description: "Free online tools for PDF and image processing. Merge, split, compress PDFs, convert images, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FileTools - Online PDF and Image Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FileTools - Online PDF and Image Tools",
    description: "Free online tools for PDF and image processing. Merge, split, compress PDFs, convert images, and more.",
    images: ["/twitter-image.png"],
    creator: "@filetools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export const generatePageMetadata = (title: string, description: string, path: string): Metadata => {
  return {
    ...defaultMetadata,
    title,
    description,
    alternates: {
      canonical: `https://filetools.com${path}`,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `https://filetools.com${path}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  }
} 