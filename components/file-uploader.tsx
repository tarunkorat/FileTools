"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
  removeBackground,
  mergePDFs,
  splitPDF,
  compressPDF,
  pdfToJpg,
  jpgToPdf,
  createZipFromBlobs,
  downloadFile,
} from "@/lib/file-processing"

interface FileUploaderProps {
  acceptedFileTypes: string
  maxFiles: number
  maxSize: number
  toolType: string
  instructionText: string
}

export function FileUploader({ acceptedFileTypes, maxFiles, maxSize, toolType, instructionText }: FileUploaderProps) {
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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)
      if (acceptedFiles.length + files.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files at once.`)
        return
      }

      const newFiles = acceptedFiles.filter((file) => !files.some((f) => f.name === file.name && f.size === file.size))

      setFiles((prev) => [...prev, ...newFiles])
    },
    [files, maxFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.split(",").reduce(
      (acc, type) => {
        acc[type] = []
        return acc
      },
      {} as Record<string, string[]>,
    ),
    maxSize: maxSize * 1024 * 1024,
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
      setError("Please upload at least one file.")
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

      // Process files based on tool type
      if (toolType === "compress-image") {
        for (let i = 0; i < files.length; i++) {
          setCurrentFileIndex(i)
          setProcessingStep(1)
          setProgress(Math.round((i / files.length) * 100))

          try {
            const file = files[i]
            // Validate file type
            if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
              throw new Error(`Invalid file type: ${file.name}. Only JPG, PNG, and WebP images are supported.`);
            }

            // Convert compression level to quality (0-1)
            // Lower compression level means higher quality
            const quality = Math.max(0.1, Math.min(1, (100 - compressionLevel) / 100));
            console.log(`Compressing ${file.name} with quality: ${quality}`);
            
            const compressedBlob = await compressImage(file, quality * 100)
            const url = URL.createObjectURL(compressedBlob)

            // Log compression results
            console.log(`Original size: ${file.size}, Compressed size: ${compressedBlob.size}, Reduction: ${Math.round((1 - compressedBlob.size / file.size) * 100)}%`);

            processed.push({
              name: file.name.replace(/\.(jpg|jpeg|png|webp)$/i, `_compressed.$1`),
              url,
              size: compressedBlob.size,
              type: compressedBlob.type,
            })
          } catch (error) {
            console.error(`Error compressing ${files[i].name}:`, error);
            setError(error instanceof Error ? error.message : `Failed to compress ${files[i].name}. Please try again.`);
          }
        }
      } else if (toolType === "resize-image") {
        for (let i = 0; i < files.length; i++) {
          setCurrentFileIndex(i)
          setProcessingStep(1)
          setProgress(Math.round((i / files.length) * 100))

          const file = files[i]
          const resizeOptions: any = {}

          if (resizeMethod === "percentage") {
            resizeOptions.percentage = resizePercentage
          } else {
            resizeOptions.width = resizeWidth
            resizeOptions.height = resizeHeight
            resizeOptions.maintainAspectRatio = maintainAspectRatio
          }

          const resizedBlob = await resizeImage(file, resizeOptions)
          const url = URL.createObjectURL(resizedBlob)

          processed.push({
            name: file.name.replace(/\.(jpg|jpeg|png|gif|webp)$/, `_resized.$1`),
            url,
            size: resizedBlob.size,
            type: resizedBlob.type,
          })
        }
      } else if (toolType === "remove-background") {
        for (let i = 0; i < files.length; i++) {
          setCurrentFileIndex(i)
          setProcessingStep(1)
          setProgress(Math.round((i / files.length) * 100))

          try {
            const file = files[i]
            // Validate file type
            if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
              throw new Error(`Invalid file type: ${file.name}. Only JPG and PNG images are supported.`);
            }

            const processedBlob = await removeBackground(file)
            const url = URL.createObjectURL(processedBlob)

            // Log processing results
            console.log(`Original size: ${file.size}, Processed size: ${processedBlob.size}`);

            processed.push({
              name: file.name.replace(/\.(jpg|jpeg|png)$/i, `_nobg.png`),
              url,
              size: processedBlob.size,
              type: "image/png", // Always output as PNG for transparency
            })
          } catch (error) {
            console.error(`Error processing ${files[i].name}:`, error);
            setError(error instanceof Error ? error.message : `Failed to remove background from ${files[i].name}. Please try again.`);
          }
        }
      } else if (toolType === "merge-pdf") {
        setProcessingStep(1)
        setProgress(30)

        try {
          const mergedBlob = await mergePDFs(files)
          const url = URL.createObjectURL(mergedBlob)

          processed.push({
            name: "merged_document.pdf",
            url,
            size: mergedBlob.size,
            type: "application/pdf",
          })
        } catch (error) {
          console.error("Error merging PDFs:", error)
          setError("Failed to merge PDF files. Please try again.")
        }

        setProgress(100)
      } else if (toolType === "split-pdf") {
        setProcessingStep(1)
        setProgress(30)

        try {
          const pages =
            pageRange === "all"
              ? []
              : customRange.split(",").flatMap((range) => {
                  if (range.includes("-")) {
                    const [start, end] = range.split("-").map(Number)
                    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
                  }
                  return [Number(range)]
                })

          const splitBlobs = await splitPDF(files[0], pages)

          for (let i = 0; i < splitBlobs.length; i++) {
            const url = URL.createObjectURL(splitBlobs[i])
            processed.push({
              name: `split_document_part${i + 1}.pdf`,
              url,
              size: splitBlobs[i].size,
              type: "application/pdf",
            })
          }
        } catch (error) {
          console.error("Error splitting PDF:", error)
          setError("Failed to split PDF file. Please try again.")
        }

        setProgress(100)
      } else if (toolType === "compress-pdf") {
        for (let i = 0; i < files.length; i++) {
          setCurrentFileIndex(i)
          setProcessingStep(1)
          setProgress(Math.round((i / files.length) * 100))

          try {
            const file = files[i]
            const compressedBlob = await compressPDF(file, compressionLevel)
            const url = URL.createObjectURL(compressedBlob)

            processed.push({
              name: file.name.replace(".pdf", "_compressed.pdf"),
              url,
              size: compressedBlob.size,
              type: "application/pdf",
            })
          } catch (error) {
            console.error("Error compressing PDF:", error)
            setError("Failed to compress PDF file. Please try again.")
          }
        }
      } else if (toolType === "pdf-to-jpg") {
        for (let i = 0; i < files.length; i++) {
          setCurrentFileIndex(i)
          setProcessingStep(1)
          setProgress(Math.round((i / files.length) * 100))

          try {
            const file = files[i]
            const imageBlobs = await pdfToJpg(file)

            for (let j = 0; j < imageBlobs.length; j++) {
              const url = URL.createObjectURL(imageBlobs[j])
              processed.push({
                name: `${file.name.replace(".pdf", "")}_page${j + 1}.jpg`,
                url,
                size: imageBlobs[j].size,
                type: "image/jpeg",
              })
            }
          } catch (error) {
            console.error("Error converting PDF to JPG:", error)
            setError("Failed to convert PDF to JPG. Please try again.")
          }
        }
      } else if (toolType === "jpg-to-pdf") {
        setProcessingStep(1)
        setProgress(30)

        try {
          // Validate that all files are valid JPG/JPEG images
          for (const file of files) {
            if (!file.type.match(/^image\/(jpeg|jpg)$/i)) {
              throw new Error(`Invalid file type: ${file.name}. Only JPG/JPEG files are supported.`);
            }
            
            // Check if the file is actually a valid image
            const img = new Image();
            const imgUrl = URL.createObjectURL(file);
            
            await new Promise((resolve, reject) => {
              img.onload = () => {
                URL.revokeObjectURL(imgUrl);
                resolve(true);
              };
              img.onerror = () => {
                URL.revokeObjectURL(imgUrl);
                reject(new Error(`Invalid image file: ${file.name}`));
              };
              img.src = imgUrl;
            });
          }

          const pdfBlob = await jpgToPdf(files);
          const url = URL.createObjectURL(pdfBlob);

          processed.push({
            name: files.length === 1 ? files[0].name.replace(/\.(jpg|jpeg)$/i, ".pdf") : "converted_document.pdf",
            url,
            size: pdfBlob.size,
            type: "application/pdf",
          });
        } catch (error) {
          console.error("Error converting JPG to PDF:", error);
          setError(error instanceof Error ? error.message : "Failed to convert JPG to PDF. Please try again.");
        }

        setProgress(100);
      } else {
        // For other tools, simulate processing
        for (let i = 0; i < files.length; i++) {
          setCurrentFileIndex(i)
          setProcessingStep(1)
          setProgress(Math.round((i / files.length) * 100))

          // Create a blob URL for the file
          const url = URL.createObjectURL(files[i])

          let processedName = files[i].name
          if (toolType === "crop-image") {
            processedName = files[i].name.replace(/\.(jpg|jpeg|png|gif)$/, `_cropped.$1`)
          }

          processed.push({
            name: processedName,
            url,
            size: files[i].size,
            type: files[i].type,
          })

          // Add a small delay to simulate processing
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }

      setProcessedFiles(processed)
      setProgress(100)
    } catch (error: any) {
      console.error("Processing error:", error)
      setError(`Processing failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsProcessing(false)
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
        // Download single file
        handleDownload(processedFiles[0].url, processedFiles[0].name, processedFiles[0].type)
      } else {
        // Create a zip file with all processed files
        const fileBlobs = await Promise.all(
          processedFiles.map(async (file) => {
            try {
              // Fetch the blob directly from the URL
              const response = await fetch(file.url)
              if (!response.ok) throw new Error(`Failed to fetch ${file.name}`)
              const blob = await response.blob()

              // Ensure the blob has the correct type
              const typedBlob = new Blob([blob], { type: file.type })

              return { name: file.name, blob: typedBlob }
            } catch (error) {
              console.error(`Error processing ${file.name}:`, error)
              // Return a placeholder file as fallback
              return {
                name: `${file.name}.txt`,
                blob: new Blob([`Failed to process ${file.name}`], { type: "text/plain" }),
              }
            }
          }),
        )

        // Create the zip file
        const zipBlob = await createZipFromBlobs(fileBlobs)
        const zipUrl = URL.createObjectURL(zipBlob)

        // Download the zip file
        handleDownload(zipUrl, `processed_files.zip`, "application/zip")

        // Clean up the zip URL after download
        setTimeout(() => {
          URL.revokeObjectURL(zipUrl)
        }, 1000)
      }
    } catch (error: any) {
      console.error("Download error:", error)
      setError(`Download failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsDownloading(false)
    }
  }

  // Clean up object URLs when component unmounts or when processed files change
  useEffect(() => {
    // Store URLs to revoke them later
    const urlsToRevoke = processedFiles.map((file) => file.url)

    return () => {
      // Clean up URLs when component unmounts or when processedFiles changes
      urlsToRevoke.forEach((url) => {
        try {
          URL.revokeObjectURL(url)
        } catch (error) {
          console.error("Error revoking URL:", error)
        }
      })
    }
  }, [processedFiles])

  const renderToolOptions = () => {
    if (files.length === 0) return null

    switch (toolType) {
      case "compress-pdf":
      case "compress-image":
        return (
          <div className="mb-6">
            <Label htmlFor="compression-level" className="mb-2 block">
              Compression Level: {compressionLevel}%
            </Label>
            <Slider
              id="compression-level"
              min={1}
              max={100}
              step={1}
              value={[compressionLevel]}
              onValueChange={(value) => setCompressionLevel(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Maximum Compression</span>
              <span>Balanced</span>
              <span>Maximum Quality</span>
            </div>
          </div>
        )

      case "pdf-to-jpg":
        return (
          <div className="mb-6">
            <Label htmlFor="image-quality" className="mb-2 block">
              Image Quality: {imageQuality}%
            </Label>
            <Slider
              id="image-quality"
              min={1}
              max={100}
              step={1}
              value={[imageQuality]}
              onValueChange={(value) => setImageQuality(value[0])}
              className="w-full"
            />
          </div>
        )

      case "split-pdf":
        return (
          <div className="mb-6">
            <Label className="mb-2 block">Split Options</Label>
            <RadioGroup value={pageRange} onValueChange={setPageRange} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">Extract all pages</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="range" id="range" />
                <Label htmlFor="range">Custom range</Label>
              </div>
            </RadioGroup>
            {pageRange === "range" && (
              <div className="mt-2">
                <Label htmlFor="custom-range" className="sr-only">
                  Custom Range
                </Label>
                <Input
                  id="custom-range"
                  type="text"
                  placeholder="e.g. 1-3, 5, 7-9"
                  value={customRange}
                  onChange={(e) => setCustomRange(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter page numbers and/or page ranges separated by commas.
                </p>
              </div>
            )}
          </div>
        )

      case "resize-image":
        return (
          <div className="mb-6 space-y-4">
            <div>
              <Label className="mb-2 block">Resize Method</Label>
              <RadioGroup value={resizeMethod} onValueChange={setResizeMethod} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage">By percentage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pixels" id="pixels" />
                  <Label htmlFor="pixels">By pixels</Label>
                </div>
              </RadioGroup>
            </div>

            {resizeMethod === "percentage" ? (
              <div>
                <Label htmlFor="resize-percentage" className="mb-2 block">
                  Resize to: {resizePercentage}% of original
                </Label>
                <Slider
                  id="resize-percentage"
                  min={1}
                  max={200}
                  step={1}
                  value={[resizePercentage]}
                  onValueChange={(value) => setResizePercentage(value[0])}
                  className="w-full"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="resize-width" className="mb-2 block">
                      Width (px)
                    </Label>
                    <Input
                      id="resize-width"
                      type="number"
                      value={resizeWidth}
                      onChange={(e) => setResizeWidth(Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="resize-height" className="mb-2 block">
                      Height (px)
                    </Label>
                    <Input
                      id="resize-height"
                      type="number"
                      value={resizeHeight}
                      onChange={(e) => setResizeHeight(Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintain-aspect-ratio"
                    checked={maintainAspectRatio}
                    onCheckedChange={setMaintainAspectRatio}
                  />
                  <Label htmlFor="maintain-aspect-ratio">Maintain aspect ratio</Label>
                </div>
              </div>
            )}
          </div>
        )

      case "remove-background":
        return (
          <div className="mb-6">
            <Alert className="bg-muted/50">
              <AlertDescription>
                Our AI will automatically detect and remove the background from your images using a free API service.
                For best results, use images with clear subjects and contrasting backgrounds.
              </AlertDescription>
            </Alert>
          </div>
        )

      default:
        return null
    }
  }

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
          <div {...getRootProps()} className={`file-drop-area ${isDragActive ? "active" : ""} mb-4`}>
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-1">{instructionText}</p>
              <p className="text-sm text-muted-foreground mb-4">Drag & drop files here, or click to select files</p>
              <Button>Select Files</Button>
              <p className="text-xs text-muted-foreground mt-4">
                Maximum: {maxFiles} files, {maxSize}MB each
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

          {renderToolOptions()}

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

