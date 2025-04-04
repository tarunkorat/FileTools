import { ImageToolsGrid } from "@/components/image-tools-grid"
import { ImageHeroSection } from "@/components/image-hero-section"

export default function ImageToolsPage() {
  return (
    <div className="container mx-auto px-4">
      <ImageHeroSection />
      <ImageToolsGrid />
    </div>
  )
}

