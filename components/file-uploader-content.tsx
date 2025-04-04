"use client"

import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { Upload, File, X, ArrowRight, Download, Trash2, MoveUp, MoveDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  compressImage,
  resizeImage,
  cropImage,
  removeBackground,
  mergePDFs,
  splitPDF,
  compressPDF,
  pdfToJpg,
  jpgToPdf,
  createZipFromBlobs,
  downloadFile,
} from "@/lib/file-processing"
import { cn } from "@/lib/utils"

interface FileUploaderContentProps {
  toolType: string
  acceptedFileTypes: string
  maxFiles: number
  maxSize: number
  instructionText: string
}

export default function FileUploaderContent({
  toolType,
  acceptedFileTypes,
  maxFiles,
  maxSize,
  instructionText,
}: FileUploaderContentProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [processedFiles, setProcessedFiles] = useState<{ name: string; url: string; size: number; type: string }[]>([])
  const [compressionLevel, setCompressionLevel] = useState(70)
  const [imageQuality, setImageQuality] = useState(80)
  const [pageRange, setPageRange] = useState("all")
  const [customRange, setCustomRange] = useState("")
  const [resizeMethod, setResizeMethod] = useState("percentage")
  const [resizePercentage, setResizePercentage] = useState(50)
  const [resizeWidth, setResizeWidth] = useState(800)
  const [resizeHeight, setResizeHeight] = useState(600)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [processingStep, setProcessingStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    if (acceptedFiles.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files at once.`)
      return
    }

    const newFiles = acceptedFiles.filter((file) => !files.some((f) => f.name === file.name && f.size === file.size))

    setFiles((prev) => [...prev, ...newFiles])
  }, [files, maxFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'application/pdf': ['.pdf']
    },
    maxFiles,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    onDropRejected: (rejections) => {
      if (rejections.some((r) => r.errors.some((e) => e.code === "file-too-large"))) {
        setError(`File is too large. Maximum size is ${maxSize}MB.`)
      } else if (rejections.some((r) => r.errors.some((e) => e.code === "file-invalid-type"))) {
        setError(`Invalid file type. Accepted types: ${acceptedFileTypes}`)
      } else {
        setError("File upload failed. Please try again.")
      }
    },
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const moveFile = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === files.length - 1)) {
      return
    }

    const newFiles = [...files]
    const newIndex = direction === "up" ? index - 1 : index + 1
    const temp = newFiles[index]
    newFiles[index] = newFiles[newIndex]
    newFiles[newIndex] = temp
    setFiles(newFiles)
  }

  const processFiles = async () => {
    if (files.length === 0) {
      toast.error("Please upload at least one file")
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setProcessingStep(0)
    setTotalSteps(files.length)
    setCurrentFileIndex(0)
    setError(null)

    try {
      const processed: { name: string; url: string; size: number; type: string }[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        setCurrentFileIndex(i)
        setProcessingStep(1)
        setProgress((i / files.length) * 100)

        let processedBlob: Blob
        switch (toolType) {
          case "compress-image":
            processedBlob = await compressImage(file)
            break
          case "resize-image":
            processedBlob = await resizeImage(file)
            break
          case "crop-image":
            processedBlob = await cropImage(file)
            break
          case "remove-background":
            processedBlob = await removeBackground(file)
            break
          case "merge-pdf":
            processedBlob = await mergePDFs(files)
            break
          case "split-pdf":
            processedBlob = await splitPDF(file)
            break
          case "compress-pdf":
            processedBlob = await compressPDF(file)
            break
          case "jpg-to-pdf":
            processedBlob = await jpgToPdf(files)
            break
          case "pdf-to-jpg":
            processedBlob = await pdfToJpg(file)
            break
          default:
            throw new Error("Invalid tool type")
        }

        const url = URL.createObjectURL(processedBlob)
        processed.push({
          name: file.name.replace(/\.(jpg|jpeg|png|webp|pdf)$/i, `_processed.$1`),
          url,
          size: processedBlob.size,
          type: processedBlob.type,
        })
      }

      setProcessedFiles(processed)
      setProgress(100)
      toast.success("Files processed successfully")
    } catch (error: any) {
      console.error("Error processing files:", error)
      toast.error("Error processing files. Please try again.")
    } finally {
      setIsProcessing(false)
      setFiles([])
    }
  }

  const handleDownload = (url: string, filename: string, fileType: string) => {
    try {
      downloadFile(url, filename, fileType)
    } catch (error) {
      console.error("Download error:", error)
      setError("Failed to download file. Please try again.")
    }
  }

  const downloadAllFiles = async () => {
    if (processedFiles.length === 0) return

    setIsDownloading(true)
    setError(null)

    try {
      if (processedFiles.length === 1) {
        handleDownload(processedFiles[0].url, processedFiles[0].name, processedFiles[0].type)
      } else {
        const fileBlobs = await Promise.all(
          processedFiles.map(async (file) => {
            try {
              const response = await fetch(file.url)
              if (!response.ok) throw new Error(`Failed to fetch ${file.name}`)
              const blob = await response.blob()
              return { name: file.name, blob: new Blob([blob], { type: file.type }) }
            } catch (error) {
              console.error(`Error processing ${file.name}:`, error)
              return {
                name: `${file.name}.txt`,
                blob: new Blob([`Failed to process ${file.name}`], { type: "text/plain" }),
              }
            }
          }),
        )

        const zipBlob = await createZipFromBlobs(fileBlobs)
        const zipUrl = URL.createObjectURL(zipBlob)
        handleDownload(zipUrl, `processed_files.zip`, "application/zip")
        setTimeout(() => URL.revokeObjectURL(zipUrl), 1000)
      }
    } catch (error: any) {
      console.error("Download error:", error)
      setError(`Download failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsDownloading(false)
    }
  }

  useEffect(() => {
    const urlsToRevoke = processedFiles.map((file) => file.url)
    return () => {
      urlsToRevoke.forEach((url) => {
        try {
          URL.revokeObjectURL(url)
        } catch (error) {
          console.error("Error revoking URL:", error)
        }
      })
    }
  }, [processedFiles])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div>
      {!processedFiles.length ? (
        <>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary"
            )}
          >
            <input {...getInputProps()} />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{instructionText}</p>
              <p className="text-xs text-muted-foreground">
                Supported formats: {acceptedFileTypes} (max {maxSize}MB each)
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Selected Files</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between p-3 border rounded-md bg-muted/30"
                  >
                    <div className="flex items-center">
                      <File className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {toolType === "merge-pdf" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFile(index, "up")}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                            <span className="sr-only">Move Up</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFile(index, "down")}
                            disabled={index === files.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                            <span className="sr-only">Move Down</span>
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isProcessing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Processing files...</p>
                <p className="text-sm text-muted-foreground">{progress}%</p>
              </div>
              <Progress value={progress} className="w-full" />
              <div className="text-sm text-muted-foreground">
                {currentFileIndex + 1} of {files.length} files
              </div>
            </div>
          ) : (
            files.length > 0 && (
              <div className="flex justify-center">
                <Button onClick={processFiles} className="px-8">
                  Process Files <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )
          )}
        </>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Processing Complete</CardTitle>
              <CardDescription>Your files have been processed successfully.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {processedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                    <div className="flex items-center">
                      <File className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(file.url, file.name, file.type)}>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setFiles([])
                  setProcessedFiles([])
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Clear All
              </Button>
              {processedFiles.length > 1 && (
                <Button variant="outline" onClick={downloadAllFiles} disabled={isDownloading}>
                  {isDownloading ? (
                    <>
                      <span className="animate-pulse mr-2">•••</span> Creating ZIP
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" /> Download All
                    </>
                  )}
                </Button>
              )}
              <Button onClick={() => setProcessedFiles([])}>Process More Files</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
} 