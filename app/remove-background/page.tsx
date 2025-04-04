"use client"

import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export default function RemoveBackgroundPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Remove Background"
        description="Remove backgrounds from your images automatically. Perfect for product photos, portraits, and more."
      />
      <FileUploader toolType="remove-background" />
    </div>
  )
}

