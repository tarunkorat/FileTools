import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = generatePageMetadata(
  "Compress PDF Online - Reduce PDF File Size",
  "Free online tool to compress PDF files and reduce their size. Optimize your PDFs for sharing and storage while maintaining quality.",
  "/compress-pdf"
)

export default function CompressPDFPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Compress PDF" description="Reduce the size of your PDF files while maintaining quality." />
      <FileUploader
        acceptedFileTypes=".pdf"
        maxFiles={3}
        maxSize={100}
        toolType="compress-pdf"
        instructionText="Upload the PDF files you want to compress"
      />
    </div>
  )
}

