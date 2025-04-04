import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = generatePageMetadata(
  "Remove Background from Images Online - Transparent Background",
  "Free online tool to remove backgrounds from images. Create transparent backgrounds for product photos, portraits, and more.",
  "/remove-background"
)

export default function RemoveBackgroundPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Remove Background"
        description="Automatically remove the background from your images with AI technology."
        isPremium={true}
      />
      <FileUploader
        acceptedFileTypes=".jpg,.jpeg,.png"
        maxFiles={5}
        maxSize={10}
        toolType="remove-background"
        instructionText="Upload the images to remove backgrounds"
      />
    </div>
  )
}

