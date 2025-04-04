import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = generatePageMetadata(
  "Convert PDF to JPG Online - PDF to Image Converter",
  "Free online tool to convert PDF pages to JPG images. Extract high-quality images from your PDF documents instantly.",
  "/pdf-to-jpg"
)

export default function PDFToJPGPage() {
  return (
    <div className="container py-8">
      <PageHeader title="PDF to JPG" description="Convert PDF pages to JPG images or extract all images from a PDF." />
      <FileUploader
        acceptedFileTypes=".pdf"
        maxFiles={3}
        maxSize={100}
        toolType="pdf-to-jpg"
        instructionText="Upload the PDF files you want to convert to JPG"
      />
    </div>
  )
}

