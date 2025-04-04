import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  isPremium?: boolean
}

export function PageHeader({ title, description, isPremium = false }: PageHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {isPremium && (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 flex items-center">
            <Sparkles className="h-3 w-3 mr-1" /> Premium
          </Badge>
        )}
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
    </div>
  )
}

