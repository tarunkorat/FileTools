import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileUp,
  FileIcon as FileSplit,
  FileDown,
  FileText,
  FileImage,
  FileSpreadsheet,
  FileType,
  FileOutput,
  RotateCw,
  Edit,
  Lock,
  Unlock,
  Stamp,
  FileCode,
} from "lucide-react"

const tools = [
  {
    title: "Merge PDF",
    description: "Combine PDFs in the order you want with the PDF merger.",
    icon: <FileUp className="h-8 w-8 text-primary" />,
    href: "/merge-pdf",
  },
  {
    title: "Split PDF",
    description: "Separate one page or a whole set for easy conversion into independent PDF files.",
    icon: <FileSplit className="h-8 w-8 text-primary" />,
    href: "/split-pdf",
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while optimizing for maximal PDF quality.",
    icon: <FileDown className="h-8 w-8 text-green-600" />,
    href: "/compress-pdf",
  },
  {
    title: "PDF to Word",
    description: "Easily convert your PDF files into easy to edit DOC and DOCX documents.",
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    href: "/pdf-to-word",
  },
  {
    title: "PDF to PowerPoint",
    description: "Turn your PDF into easy to edit PPT and PPTX slideshows.",
    icon: <FileOutput className="h-8 w-8 text-orange-600" />,
    href: "/pdf-to-powerpoint",
  },
  {
    title: "PDF to Excel",
    description: "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
    icon: <FileSpreadsheet className="h-8 w-8 text-green-600" />,
    href: "/pdf-to-excel",
  },
  {
    title: "Word to PDF",
    description: "Make DOC and DOCX files easy to read by converting them to PDF.",
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    href: "/word-to-pdf",
  },
  {
    title: "PowerPoint to PDF",
    description: "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
    icon: <FileOutput className="h-8 w-8 text-orange-600" />,
    href: "/powerpoint-to-pdf",
  },
  {
    title: "Excel to PDF",
    description: "Make EXCEL spreadsheets easy to read by converting them to PDF.",
    icon: <FileSpreadsheet className="h-8 w-8 text-green-600" />,
    href: "/excel-to-pdf",
  },
  {
    title: "Edit PDF",
    description: "Add text, images, shapes or freehand annotations to a PDF document.",
    icon: <Edit className="h-8 w-8 text-purple-600" />,
    href: "/edit-pdf",
  },
  {
    title: "PDF to JPG",
    description: "Convert each PDF page into a JPG or extract all images contained in a PDF.",
    icon: <FileImage className="h-8 w-8 text-yellow-600" />,
    href: "/pdf-to-jpg",
  },
  {
    title: "JPG to PDF",
    description: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
    icon: <FileImage className="h-8 w-8 text-yellow-600" />,
    href: "/jpg-to-pdf",
  },
  {
    title: "Sign PDF",
    description: "Sign yourself or request electronic signatures from others.",
    icon: <FileType className="h-8 w-8 text-blue-600" />,
    href: "/sign-pdf",
  },
  {
    title: "Watermark",
    description: "Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.",
    icon: <Stamp className="h-8 w-8 text-purple-600" />,
    href: "/watermark-pdf",
  },
  {
    title: "Rotate PDF",
    description: "Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!",
    icon: <RotateCw className="h-8 w-8 text-pink-600" />,
    href: "/rotate-pdf",
  },
  {
    title: "HTML to PDF",
    description:
      "Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it to PDF with a click.",
    icon: <FileCode className="h-8 w-8 text-yellow-600" />,
    href: "/html-to-pdf",
  },
  {
    title: "Unlock PDF",
    description: "Remove PDF password security, giving you the freedom to use your PDFs as you want.",
    icon: <Unlock className="h-8 w-8 text-blue-600" />,
    href: "/unlock-pdf",
  },
  {
    title: "Protect PDF",
    description: "Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.",
    icon: <Lock className="h-8 w-8 text-blue-600" />,
    href: "/protect-pdf",
  },
]

export function ToolsGrid() {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="block">
            <Card className="h-full tool-card">
              <CardHeader className="pb-2">
                <div className="mb-2">{tool.icon}</div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

