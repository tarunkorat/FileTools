"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { compressImage, resizeImage, cropImage, removeBackground, mergePDFs, splitPDF, compressPDF, jpgToPdf, pdfToJpg } from "@/lib/file-processing"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import browser-dependent components with loading state
const FileUploaderContent = dynamic(() => import("./file-uploader-content"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Loading file uploader...</p>
      </div>
    </div>
  ),
})

interface FileUploaderProps {
  toolType: string
  acceptedFileTypes?: string
  maxFiles?: number
  maxSize?: number
  instructionText?: string
}

export function FileUploader({
  toolType,
  acceptedFileTypes = ".jpg,.jpeg,.png,.gif,.webp,.pdf",
  maxFiles = 20,
  maxSize = 50,
  instructionText = "Upload your files to get started",
}: FileUploaderProps) {
  return (
    <FileUploaderContent
      toolType={toolType}
      acceptedFileTypes={acceptedFileTypes}
      maxFiles={maxFiles}
      maxSize={maxSize}
      instructionText={instructionText}
    />
  )
}

