"use client"

import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export default function PDFToJPGPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="PDF to JPG"
        description="Convert PDF pages to JPG images. Extract images from your PDF documents."
      />
      <FileUploader toolType="pdf-to-jpg" />
    </div>
  )
}

