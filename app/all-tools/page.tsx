import { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { PDFToolsGrid } from "@/components/pdf-tools-grid"
import { ImageToolsGrid } from "@/components/image-tools-grid"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = generatePageMetadata(
  "All Tools - FileTools Complete Tool Collection",
  "Browse our complete collection of free online tools for PDF and image processing. Find the perfect tool for your needs.",
  "/all-tools"
)

export default function AllToolsPage() {
  return (
    <div className="container py-8">
      <PageHeader title="All Tools" description="Every tool you need to work with PDFs and images in one place." />

      <Tabs defaultValue="pdf" className="py-8">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pdf">PDF Tools</TabsTrigger>
            <TabsTrigger value="image">Image Tools</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pdf">
          <PDFToolsGrid />
        </TabsContent>
        <TabsContent value="image">
          <ImageToolsGrid />
        </TabsContent>
      </Tabs>
    </div>
  )
}

