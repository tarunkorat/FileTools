import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = generatePageMetadata(
  "Resize Images Online - Change Image Dimensions",
  "Free online tool to resize images to any dimensions. Adjust width and height while maintaining aspect ratio and quality.",
  "/resize-image"
)

export default function ResizeImagePage() {
  return (
    <div className="container py-8">
      <PageHeader title="Resize Image" description="Change the dimensions of your images by pixels or percentage." />
      <FileUploader
        acceptedFileTypes=".jpg,.jpeg,.png,.gif,.webp"
        maxFiles={20}
        maxSize={50}
        toolType="resize-image"
        instructionText="Upload the images you want to resize"
      />
    </div>
  )
}

