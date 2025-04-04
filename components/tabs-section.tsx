"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PDFToolsGrid } from "@/components/pdf-tools-grid"
import { ImageToolsGrid } from "@/components/image-tools-grid"

export function TabsSection() {
  const [activeTab, setActiveTab] = useState("pdf")

  return (
    <Tabs defaultValue="pdf" className="py-8" onValueChange={setActiveTab}>
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="pdf">PDF Tools</TabsTrigger>
          <TabsTrigger value="image">Image Tools</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="pdf">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Every tool you need to work with PDFs</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </p>
        </div>
        <PDFToolsGrid />
      </TabsContent>
      <TabsContent value="image">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Every tool you could want to edit images in bulk</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your online photo editor is here and forever free! Compress, resize, crop, and edit your images with ease.
          </p>
        </div>
        <ImageToolsGrid />
      </TabsContent>
    </Tabs>
  )
}

