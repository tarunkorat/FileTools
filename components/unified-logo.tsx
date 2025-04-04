import { FileText, Heart } from "lucide-react"
import Link from "next/link"

interface UnifiedLogoProps {
  size?: "small" | "medium" | "large"
  href?: string
}

export function UnifiedLogo({ size = "medium", href = "/" }: UnifiedLogoProps) {
  const sizeClasses = {
    small: {
      container: "gap-1",
      icon: "h-4 w-4",
      heart: "h-3.5 w-3.5",
      text: "text-base",
    },
    medium: {
      container: "gap-1.5",
      icon: "h-6 w-6",
      heart: "h-5 w-5",
      text: "text-xl",
    },
    large: {
      container: "gap-2",
      icon: "h-8 w-8",
      heart: "h-7 w-7",
      text: "text-2xl",
    },
  }

  const classes = sizeClasses[size]

  const LogoContent = () => (
    <>
      <FileText className={`${classes.icon} text-primary`} />
      <Heart className={`${classes.heart} text-primary fill-primary`} />
      <span className={`${classes.text} font-bold`}>FileTools</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`flex items-center ${classes.container}`}>
        <LogoContent />
      </Link>
    )
  }

  return (
    <div className={`flex items-center ${classes.container}`}>
      <LogoContent />
    </div>
  )
}

