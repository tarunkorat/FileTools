"use client"

import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export default function CompressImagePage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Compress Image"
        description="Reduce the file size of your images while maintaining quality. Perfect for web optimization and faster loading times."
      />
      <FileUploader toolType="compress-image" />
    </div>
  )
}

