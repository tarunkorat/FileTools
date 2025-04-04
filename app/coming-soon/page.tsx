import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, ArrowLeft } from "lucide-react"

export default function ComingSoonPage() {
  return (
    <div className="container py-16 md:py-24 flex flex-col items-center justify-center text-center">
      <Clock className="h-24 w-24 text-primary mb-6 animate-pulse" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Coming Soon</h1>
      <p className="text-xl text-muted-foreground max-w-lg mb-8">
        We're working hard to bring you this feature. Please check back later!
      </p>
      <Button asChild size="lg">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
    </div>
  )
}

