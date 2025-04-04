import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = generatePageMetadata(
  "Convert JPG to PDF Online - Image to PDF Converter",
  "Free online tool to convert JPG images to PDF documents. Create high-quality PDFs from your photos and images instantly.",
  "/jpg-to-pdf"
)

export default function JPGToPDFPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="JPG to PDF"
        description="Convert JPG images to PDF. Adjust orientation and margins as needed."
      />
      <FileUploader
        acceptedFileTypes=".jpg,.jpeg,.png"
        maxFiles={20}
        maxSize={50}
        toolType="jpg-to-pdf"
        instructionText="Upload the JPG images you want to convert to PDF"
      />
    </div>
  )
}

