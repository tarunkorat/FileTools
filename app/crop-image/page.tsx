"use client"

import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export default function CropImagePage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Crop Image"
        description="Crop your images to the perfect size. Upload an image and use our intuitive cropping tool to get exactly what you need."
      />
      <FileUploader toolType="crop-image" />
    </div>
  )
}

