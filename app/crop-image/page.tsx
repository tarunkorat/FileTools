import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = generatePageMetadata(
  "Crop Images Online - Trim and Adjust Image Size",
  "Free online tool to crop images and remove unwanted parts. Select any area to keep and download the cropped image instantly.",
  "/crop-image"
)

export default function CropImagePage() {
  return (
    <div className="container py-8">
      <PageHeader title="Crop Image" description="Crop your images to the perfect size and aspect ratio." />
      <FileUploader
        acceptedFileTypes=".jpg,.jpeg,.png,.gif"
        maxFiles={10}
        maxSize={50}
        toolType="crop-image"
        instructionText="Upload the images you want to crop"
      />
    </div>
  )
}

