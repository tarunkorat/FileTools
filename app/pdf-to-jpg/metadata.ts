import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata(
  "Convert PDF to JPG Online - Free PDF to Image Converter",
  "Free online tool to convert PDF pages to JPG images. Extract images from PDF documents. No registration required.",
  "/pdf-to-jpg"
) 