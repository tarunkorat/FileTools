import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { HeroSection } from "@/components/hero-section"
import { TabsSection } from "@/components/tabs-section"

export const metadata: Metadata = generatePageMetadata(
  "FileTools - Free Online PDF and Image Tools",
  "Free online tools for PDF and image processing. Merge, split, compress PDFs, convert images, and more. No installation required.",
  "/"
)

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <TabsSection />
    </div>
  )
}

