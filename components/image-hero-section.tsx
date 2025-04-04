import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ImageHeroSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        Every tool you could want to edit images in bulk
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
        Your online photo editor is here and forever free! Compress, resize, crop, and edit your images with ease.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/compress-image">Compress Image</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/remove-background">Remove Background</Link>
        </Button>
      </div>
    </section>
  )
}

