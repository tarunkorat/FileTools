"use client"

import Link from "next/link"
import { Twitter, Facebook, Github, Shield } from "lucide-react"
import { UnifiedLogo } from "./unified-logo"
import { useEffect, useState } from "react"

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

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Helper function to check if a page is implemented
  const isImplemented = (path: string) => IMPLEMENTED_PAGES.includes(path)

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <UnifiedLogo />
            <p className="mt-4 text-sm text-muted-foreground">
              All the PDF and image tools you need in one place. Fast, free, and easy to use.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your files are secure and automatically deleted after 2 hours</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">PDF Tools</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {isImplemented("/merge-pdf") && (
                <li>
                  <Link href="/merge-pdf" className="text-muted-foreground hover:text-foreground">
                    Merge PDF
                  </Link>
                </li>
              )}
              {isImplemented("/split-pdf") && (
                <li>
                  <Link href="/split-pdf" className="text-muted-foreground hover:text-foreground">
                    Split PDF
                  </Link>
                </li>
              )}
              {isImplemented("/compress-pdf") && (
                <li>
                  <Link href="/compress-pdf" className="text-muted-foreground hover:text-foreground">
                    Compress PDF
                  </Link>
                </li>
              )}
              {isImplemented("/pdf-to-jpg") && (
                <li>
                  <Link href="/pdf-to-jpg" className="text-muted-foreground hover:text-foreground">
                    PDF to JPG
                  </Link>
                </li>
              )}
              {isImplemented("/jpg-to-pdf") && (
                <li>
                  <Link href="/jpg-to-pdf" className="text-muted-foreground hover:text-foreground">
                    JPG to PDF
                  </Link>
                </li>
              )}
              <li>
                <span className="text-muted-foreground opacity-60">Edit PDF (Coming Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground opacity-60">Rotate PDF (Coming Soon)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Image Tools</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {isImplemented("/compress-image") && (
                <li>
                  <Link href="/compress-image" className="text-muted-foreground hover:text-foreground">
                    Compress Image
                  </Link>
                </li>
              )}
              {isImplemented("/resize-image") && (
                <li>
                  <Link href="/resize-image" className="text-muted-foreground hover:text-foreground">
                    Resize Image
                  </Link>
                </li>
              )}
              {isImplemented("/crop-image") && (
                <li>
                  <Link href="/crop-image" className="text-muted-foreground hover:text-foreground">
                    Crop Image
                  </Link>
                </li>
              )}
              {isImplemented("/remove-background") && (
                <li>
                  <Link href="/remove-background" className="text-muted-foreground hover:text-foreground">
                    Remove Background
                  </Link>
                </li>
              )}
              <li>
                <span className="text-muted-foreground opacity-60">Convert to JPG (Coming Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground opacity-60">Watermark Image (Coming Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground opacity-60">Rotate Image (Coming Soon)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground opacity-60">About (Coming Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground opacity-60">Privacy Policy (Coming Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground opacity-60">Terms of Service (Coming Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground opacity-60">Contact (Coming Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground opacity-60">FAQ (Coming Soon)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} FileTools. All rights reserved.</p>
          <p className="mt-2">
            Designed and developed by{" "}
            <Link 
              href="https://tarun-korat.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Tarun Korat
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

