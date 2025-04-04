import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = generatePageMetadata(
  "Merge PDF Files Online - Combine Multiple PDFs into One",
  "Free online tool to merge multiple PDF files into a single document. Combine PDFs quickly and easily with our secure tool.",
  "/merge-pdf"
)

export default function MergePDFPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Merge PDF"
        description="Combine multiple PDFs into a single document. Arrange them in any order you want."
      />
      <FileUploader
        acceptedFileTypes=".pdf"
        maxFiles={10}
        maxSize={100}
        toolType="merge-pdf"
        instructionText="Upload the PDF files you want to merge"
      />
    </div>
  )
}

