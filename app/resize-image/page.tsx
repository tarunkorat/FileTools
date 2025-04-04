"use client"

import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export default function ResizeImagePage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Resize Image"
        description="Resize your images to any dimension. Maintain aspect ratio or customize the size to fit your needs."
      />
      <FileUploader toolType="resize-image" />
    </div>
  )
}

