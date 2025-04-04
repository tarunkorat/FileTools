import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = generatePageMetadata(
  "Compress Images Online - Reduce Image File Size",
  "Free online tool to compress images and reduce their file size. Optimize JPG, PNG, and WebP images while maintaining quality.",
  "/compress-image"
)

export default function CompressImagePage() {
  return (
    <div className="container py-8">
      <PageHeader title="Compress Image" description="Reduce the file size of your images while maintaining quality." />
      <FileUploader
        acceptedFileTypes=".jpg,.jpeg,.png,.gif,.webp"
        maxFiles={20}
        maxSize={50}
        toolType="compress-image"
        instructionText="Upload the images you want to compress"
      />
    </div>
  )
}

