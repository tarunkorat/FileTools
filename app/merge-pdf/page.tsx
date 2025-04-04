"use client"

import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export default function MergePDFPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Merge PDF"
        description="Combine multiple PDF files into one document. Arrange pages in any order you want."
      />
      <FileUploader toolType="merge-pdf" />
    </div>
  )
}

