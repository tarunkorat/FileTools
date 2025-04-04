import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata(
  "Crop Images Online - Free Image Cropping Tool",
  "Free online tool to crop images. Easily crop JPG, PNG, and WebP images to your desired dimensions. No registration required.",
  "/crop-image"
) 