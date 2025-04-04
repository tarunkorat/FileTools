"use client"

import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export default function SplitPDFPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Split PDF"
        description="Split PDF files into multiple documents. Extract specific pages or ranges of pages."
      />
      <FileUploader toolType="split-pdf" />
    </div>
  )
}

