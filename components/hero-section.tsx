import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        Every tool you need to work with PDFs and images in one place
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
        All the tools you need at your fingertips. 100% FREE and easy to use! Process, convert, merge, split, and edit
        your files with just a few clicks.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/merge-pdf">Merge PDF</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/remove-background">Remove Background</Link>
        </Button>
      </div>
    </section>
  )
}

