import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = generatePageMetadata(
  "Split PDF Online - Divide PDF into Multiple Files",
  "Free online tool to split PDF files into multiple documents. Extract pages or ranges from your PDF easily and securely.",
  "/split-pdf"
)

export default function SplitPDFPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Split PDF" description="Extract pages from your PDF or split it into multiple files." />
      <FileUploader
        acceptedFileTypes=".pdf"
        maxFiles={1}
        maxSize={100}
        toolType="split-pdf"
        instructionText="Upload the PDF file you want to split"
      />
    </div>
  )
}

