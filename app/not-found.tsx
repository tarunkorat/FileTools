import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileQuestion, ArrowLeft } from "lucide-react"

export const metadata: Metadata = generatePageMetadata(
  "Page Not Found - FileTools",
  "The page you're looking for doesn't exist. Return to our home page to access our free online PDF and image tools.",
  "/404"
)

export default function NotFoundPage() {
  return (
    <div className="container py-16 md:py-24 flex flex-col items-center justify-center text-center">
      <FileQuestion className="h-24 w-24 text-primary mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="text-xl text-muted-foreground max-w-lg mb-8">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
    </div>
  )
}

