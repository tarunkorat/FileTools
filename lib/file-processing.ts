import JSZip from "jszip"
import { PDFDocument } from 'pdf-lib';
import { getDocument } from 'pdfjs-dist';

// Function to compress image
export async function compressImage(file: File, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Validate input file
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
        reject(new Error('Invalid file type. Only JPG, PNG, and WebP images are supported.'));
        return;
      }

      const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
      img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha channel for better compression
          
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

        // Set canvas dimensions to match the image
          canvas.width = img.width;
          canvas.height = img.height;

          // Fill background with white for transparent images
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw image on canvas
          ctx.drawImage(img, 0, 0);

        // Convert canvas to blob with specified quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
                // If the compressed size is larger than original, try with lower quality
                if (blob.size >= file.size) {
                  // Try with progressively lower quality until size is reduced
                  let currentQuality = quality / 100;
                  let attempts = 0;
                  const maxAttempts = 3;
                  
                  const tryCompression = () => {
                    if (attempts >= maxAttempts) {
                      resolve(blob); // Return the best we could do
                      return;
                    }
                    
                    currentQuality *= 0.7; // Reduce quality by 30% each attempt
                    canvas.toBlob(
                      (smallerBlob) => {
                        if (smallerBlob && smallerBlob.size < file.size) {
                          resolve(smallerBlob);
            } else {
                          attempts++;
                          tryCompression();
            }
          },
          file.type,
                      currentQuality
                    );
                  };
                  
                  tryCompression();
                } else {
                  resolve(blob);
                }
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            file.type,
            quality / 100
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    } catch (error) {
      reject(new Error('Failed to compress image'));
    }
  });
}

// Function to resize image
export async function resizeImage(
  file: File,
  options: {
    width?: number;
    height?: number;
    percentage?: number;
    maintainAspectRatio?: boolean;
  }
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
      img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          let newWidth: number;
          let newHeight: number;

        if (options.percentage) {
          // Resize by percentage
            newWidth = img.width * (options.percentage / 100);
            newHeight = img.height * (options.percentage / 100);
        } else if (options.width && options.height) {
          // Resize by dimensions
            newWidth = options.width;
            newHeight = options.height;

          // Maintain aspect ratio if specified
          if (options.maintainAspectRatio) {
              const aspectRatio = img.width / img.height;
            if (newWidth / newHeight > aspectRatio) {
                newWidth = newHeight * aspectRatio;
            } else {
                newHeight = newWidth / aspectRatio;
              }
            }
          } else {
            reject(new Error('Invalid resize options'));
            return;
        }

        // Set canvas dimensions to the new size
          canvas.width = newWidth;
          canvas.height = newHeight;

        // Draw resized image on canvas
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert canvas to blob
          canvas.toBlob(
            (blob) => {
          if (blob) {
                resolve(blob);
          } else {
                reject(new Error('Failed to resize image'));
              }
            },
            file.type,
            0.95 // High quality for resizing
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    } catch (error) {
      reject(new Error('Failed to resize image'));
    }
  });
}

// Function to crop image
export async function cropImage(
  file: File,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          // Set canvas dimensions to the crop size
          canvas.width = options.width;
          canvas.height = options.height;

          // Draw the cropped portion of the image
          ctx.drawImage(
            img,
            options.x,
            options.y,
            options.width,
            options.height,
            0,
            0,
            options.width,
            options.height
          );

          // Convert canvas to blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to crop image'));
              }
            },
            file.type,
            0.95 // High quality for cropping
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    } catch (error) {
      reject(new Error('Failed to crop image'));
    }
  });
}

// Function to remove background
export async function removeBackground(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Validate input file
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
        reject(new Error('Invalid file type. Only JPG and PNG images are supported.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

    if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          // Set canvas dimensions to match the image
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw image on canvas
          ctx.drawImage(img, 0, 0);

          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Enhanced background removal algorithm
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Check for white/light background
            if (r > 240 && g > 240 && b > 240) {
              data[i + 3] = 0; // Make transparent
            }
            // Check for light gray background
            else if (r > 200 && g > 200 && b > 200 && Math.abs(r - g) < 10 && Math.abs(g - b) < 10) {
              data[i + 3] = 0; // Make transparent
            }
            // Check for green screen (common in product photos)
            else if (g > r && g > b && g > 150) {
              data[i + 3] = 0; // Make transparent
            }
          }

          // Put the modified image data back
          ctx.putImageData(imageData, 0, 0);

          // Convert canvas to PNG blob (PNG supports transparency)
          canvas.toBlob(
            (blob) => {
        if (blob) {
                resolve(blob);
        } else {
                reject(new Error('Failed to remove background'));
              }
            },
            'image/png',
            0.95 // High quality for transparency
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    } catch (error) {
      reject(new Error('Failed to remove background'));
    }
  });
}

// Helper function to create an Image from a File
function createImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = URL.createObjectURL(file)
  })
}

// Function to merge PDF files using PDF-LIB
export async function mergePDFs(files: File[]): Promise<Blob> {
  try {
    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }
    
    const mergedPdfBytes = await mergedPdf.save();
    return new Blob([mergedPdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw new Error('Failed to merge PDF files. Please try again.');
  }
}

// Function to split PDF into multiple PDFs
export async function splitPDF(file: File, pages: number[]): Promise<Blob[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPageCount();
    
    // If no specific pages are provided, split into individual pages
    const pagesToSplit = pages.length > 0 ? pages : Array.from({ length: totalPages }, (_, i) => i);
    
    const splitPdfs: Blob[] = [];
    
    for (const pageNum of pagesToSplit) {
      if (pageNum >= 0 && pageNum < totalPages) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum]);
        newPdf.addPage(copiedPage);
        
        const pdfBytes = await newPdf.save();
        splitPdfs.push(new Blob([pdfBytes], { type: 'application/pdf' }));
      }
    }
    
    return splitPdfs;
  } catch (error) {
    console.error('Error splitting PDF:', error);
    throw new Error('Failed to split PDF file. Please try again.');
  }
}

// Function to compress PDF
export async function compressPDF(file: File, quality: number): Promise<Blob> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      updateMetadata: false,
      ignoreEncryption: true,
    });
    
    // PDF-LIB doesn't have direct compression options, but we can optimize the PDF
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
    
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error compressing PDF:', error);
    throw new Error('Failed to compress PDF file. Please try again.');
  }
}

// Function to convert PDF to JPG
export async function pdfToJpg(file: File): Promise<Blob[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = getDocument(arrayBuffer);
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;
    const jpgBlobs: Blob[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/jpeg', 0.95);
      });
      
      jpgBlobs.push(blob);
    }
    
    return jpgBlobs;
  } catch (error) {
    console.error('Error converting PDF to JPG:', error);
    throw new Error('Failed to convert PDF to JPG. Please try again.');
  }
}

// Function to convert JPG to PDF
export async function jpgToPdf(files: File[]): Promise<Blob> {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided for conversion');
    }

    const pdfDoc = await PDFDocument.create();
    
    for (const file of files) {
      try {
        // Read the file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Create an image element to get the actual dimensions
        const img = new Image();
        const imgUrl = URL.createObjectURL(new Blob([arrayBuffer], { type: file.type }));
        
        // Wait for image to load
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imgUrl;
        });
        
        // Embed the image in the PDF
        const image = await pdfDoc.embedJpg(arrayBuffer);
        
        // Create a page with the same dimensions as the image
        const page = pdfDoc.addPage([image.width, image.height]);
        
        // Draw the image on the page
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
        
        // Clean up the object URL
        URL.revokeObjectURL(imgUrl);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        throw new Error(`Failed to process image ${file.name}. Please ensure it's a valid JPG file.`);
      }
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error converting JPG to PDF:', error);
    throw new Error('Failed to convert JPG to PDF. Please try again with valid JPG files.');
  }
}

// Function to create a downloadable URL from a blob
export function createDownloadUrl(blob: Blob, filename: string): { url: string; download: () => void } {
  const url = URL.createObjectURL(blob)

  const download = () => {
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return { url, download }
}

// Function to create a zip file from multiple blobs
export async function createZipFromBlobs(files: { name: string; blob: Blob }[]): Promise<Blob> {
  try {
    const zip = new JSZip()

    // Add each file to the zip
    for (const file of files) {
      // Ensure the blob is properly handled
      const arrayBuffer = await file.blob.arrayBuffer()
      zip.file(file.name, arrayBuffer)
    }

    // Generate the zip file with proper compression
    return await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6, // Balanced compression level
      },
    })
  } catch (error) {
    console.error("Error creating ZIP file:", error)
    throw new Error("Failed to create ZIP file")
  }
}

// Function to safely download a file
export function downloadFile(url: string, filename: string, fileType: string): void {
  try {
    // Create a temporary anchor element
    const a = document.createElement("a")
    a.style.display = "none"
    a.href = url
    a.download = filename

    // For Safari compatibility
    if (typeof a.download === "undefined") {
      a.target = "_blank"
    }

    // Append to the document, click it, and remove it
    document.body.appendChild(a)
    a.click()

    // Small delay before removing to ensure download starts
    setTimeout(() => {
      document.body.removeChild(a)
    }, 100)
  } catch (error) {
    console.error("Download error:", error)
    throw new Error("Failed to download file")
  }
}

