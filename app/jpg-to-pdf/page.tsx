"use client"

import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export default function JPGToPDFPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="JPG to PDF"
        description="Convert JPG images to PDF documents. Combine multiple images into a single PDF file."
      />
      <FileUploader toolType="jpg-to-pdf" />
    </div>
  )
}

