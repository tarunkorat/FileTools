import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata(
  "Resize Images Online - Free Image Resizer",
  "Free online tool to resize images. Change image dimensions by pixels or percentage while maintaining aspect ratio.",
  "/resize-image"
) 