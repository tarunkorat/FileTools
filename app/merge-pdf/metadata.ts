import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata(
  "Merge PDFs Online - Combine PDF Files",
  "Free online tool to merge multiple PDF files into one document. Arrange pages in any order. No registration required.",
  "/merge-pdf"
) 