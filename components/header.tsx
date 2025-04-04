"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X } from "lucide-react"
import { UnifiedLogo } from "@/components/unified-logo"

// List of implemented pages
const IMPLEMENTED_PAGES = [
  "/",
  "/merge-pdf",
  "/split-pdf",
  "/compress-pdf",
  "/pdf-to-jpg",
  "/jpg-to-pdf",
  "/compress-image",
  "/resize-image",
  "/crop-image",
  "/remove-background",
  "/image-tools",
  "/all-tools",
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Helper function to check if a page is implemented
  const isImplemented = (path: string) => IMPLEMENTED_PAGES.includes(path)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <UnifiedLogo href="/" />
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium">
                PDF TOOLS <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {isImplemented("/merge-pdf") && (
                <DropdownMenuItem asChild>
                  <Link href="/merge-pdf">Merge PDF</Link>
                </DropdownMenuItem>
              )}
              {isImplemented("/split-pdf") && (
                <DropdownMenuItem asChild>
                  <Link href="/split-pdf">Split PDF</Link>
                </DropdownMenuItem>
              )}
              {isImplemented("/compress-pdf") && (
                <DropdownMenuItem asChild>
                  <Link href="/compress-pdf">Compress PDF</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {isImplemented("/pdf-to-jpg") && (
                <DropdownMenuItem asChild>
                  <Link href="/pdf-to-jpg">PDF to JPG</Link>
                </DropdownMenuItem>
              )}
              {isImplemented("/jpg-to-pdf") && (
                <DropdownMenuItem asChild>
                  <Link href="/jpg-to-pdf">JPG to PDF</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium">
                IMAGE TOOLS <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {isImplemented("/compress-image") && (
                <DropdownMenuItem asChild>
                  <Link href="/compress-image">Compress Image</Link>
                </DropdownMenuItem>
              )}
              {isImplemented("/resize-image") && (
                <DropdownMenuItem asChild>
                  <Link href="/resize-image">Resize Image</Link>
                </DropdownMenuItem>
              )}
              {isImplemented("/crop-image") && (
                <DropdownMenuItem asChild>
                  <Link href="/crop-image">Crop Image</Link>
                </DropdownMenuItem>
              )}
              {isImplemented("/remove-background") && (
                <DropdownMenuItem asChild>
                  <Link href="/remove-background">Remove Background</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium">
                ALL TOOLS <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {isImplemented("/all-tools") && (
                <DropdownMenuItem asChild>
                  <Link href="/all-tools">View All PDF Tools</Link>
                </DropdownMenuItem>
              )}
              {isImplemented("/image-tools") && (
                <DropdownMenuItem asChild>
                  <Link href="/image-tools">View All Image Tools</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" className="hidden md:flex" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-2 pb-4">
            <div className="font-medium text-sm px-4 py-2">PDF Tools</div>
            {isImplemented("/merge-pdf") && (
              <Link href="/merge-pdf" className="px-4 py-2 hover:bg-muted rounded-md">
                Merge PDF
              </Link>
            )}
            {isImplemented("/split-pdf") && (
              <Link href="/split-pdf" className="px-4 py-2 hover:bg-muted rounded-md">
                Split PDF
              </Link>
            )}
            {isImplemented("/compress-pdf") && (
              <Link href="/compress-pdf" className="px-4 py-2 hover:bg-muted rounded-md">
                Compress PDF
              </Link>
            )}
            {isImplemented("/pdf-to-jpg") && (
              <Link href="/pdf-to-jpg" className="px-4 py-2 hover:bg-muted rounded-md">
                PDF to JPG
              </Link>
            )}
            {isImplemented("/jpg-to-pdf") && (
              <Link href="/jpg-to-pdf" className="px-4 py-2 hover:bg-muted rounded-md">
                JPG to PDF
              </Link>
            )}
            <div className="border-t my-2"></div>
            <div className="font-medium text-sm px-4 py-2">Image Tools</div>
            {isImplemented("/compress-image") && (
              <Link href="/compress-image" className="px-4 py-2 hover:bg-muted rounded-md">
                Compress Image
              </Link>
            )}
            {isImplemented("/resize-image") && (
              <Link href="/resize-image" className="px-4 py-2 hover:bg-muted rounded-md">
                Resize Image
              </Link>
            )}
            {isImplemented("/crop-image") && (
              <Link href="/crop-image" className="px-4 py-2 hover:bg-muted rounded-md">
                Crop Image
              </Link>
            )}
            {isImplemented("/remove-background") && (
              <Link href="/remove-background" className="px-4 py-2 hover:bg-muted rounded-md">
                Remove Background
              </Link>
            )}
            <div className="border-t my-2"></div>
            <Link href="/login" className="px-4 py-2 hover:bg-muted rounded-md">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-primary text-white rounded-md text-center">
              Sign up
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

