import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageDown, ImageUp, Crop, ImageIcon, Scissors, RotateCw, Stamp, FileCode, Smile, EyeOff } from "lucide-react"

// List of implemented pages
const IMPLEMENTED_PAGES = ["/compress-image", "/resize-image", "/crop-image", "/remove-background"]

const tools = [
  {
    title: "Compress Image",
    description: "Compress JPG, PNG, SVG, and GIFs while saving space and maintaining quality.",
    icon: <ImageDown className="h-8 w-8 text-green-600" />,
    href: "/compress-image",
    iconBg: "bg-green-600/10",
  },
  {
    title: "Resize Image",
    description: "Define your dimensions, by percent or pixel, and resize your JPG, PNG, SVG, and GIF images.",
    icon: <ImageUp className="h-8 w-8 text-cyan-600" />,
    href: "/resize-image",
    iconBg: "bg-cyan-600/10",
  },
  {
    title: "Crop Image",
    description: "Crop JPG, PNG, or GIFs with ease. Choose pixels to define your rectangle or use our visual editor.",
    icon: <Crop className="h-8 w-8 text-blue-600" />,
    href: "/crop-image",
    iconBg: "bg-blue-600/10",
  },
  {
    title: "Remove Background",
    description:
      "Quickly remove image backgrounds with high accuracy. Instantly detect objects and cut out backgrounds with ease.",
    icon: <EyeOff className="h-8 w-8 text-green-600" />,
    href: "/remove-background",
    iconBg: "bg-green-600/10",
    badge: "New!",
  },
  // Tools below are not yet implemented - they'll show as "Coming Soon"
  {
    title: "Convert to JPG",
    description: "Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW format images to JPG in bulk with ease.",
    icon: <ImageIcon className="h-8 w-8 text-yellow-600" />,
    href: "/convert-to-jpg",
    iconBg: "bg-yellow-600/10",
    comingSoon: true,
  },
  {
    title: "Convert from JPG",
    description: "Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!",
    icon: <ImageIcon className="h-8 w-8 text-yellow-600" />,
    href: "/convert-from-jpg",
    iconBg: "bg-yellow-600/10",
    comingSoon: true,
  },
  {
    title: "Photo Editor",
    description:
      "Spice up your pictures with text, effects, frames or stickers. Simple editing tools for your image needs.",
    icon: <Scissors className="h-8 w-8 text-purple-600" />,
    href: "/photo-editor",
    iconBg: "bg-purple-600/10",
    comingSoon: true,
  },
  {
    title: "Upscale Image",
    description:
      "Enlarge your images with high resolution. Easily increase the size of your JPG and PNG images while maintaining visual quality.",
    icon: <ImageUp className="h-8 w-8 text-blue-600" />,
    href: "/upscale-image",
    iconBg: "bg-blue-600/10",
    badge: "New!",
    comingSoon: true,
  },
  {
    title: "Watermark Image",
    description:
      "Stamp an image or text over your images in seconds. Choose the typography, transparency and position.",
    icon: <Stamp className="h-8 w-8 text-blue-600" />,
    href: "/watermark-image",
    iconBg: "bg-blue-600/10",
    comingSoon: true,
  },
  {
    title: "Meme Generator",
    description:
      "Create your memes online with ease. Caption meme images or upload your pictures to make custom memes.",
    icon: <Smile className="h-8 w-8 text-pink-600" />,
    href: "/meme-generator",
    iconBg: "bg-pink-600/10",
    comingSoon: true,
  },
  {
    title: "Rotate Image",
    description: "Rotate many images JPG, PNG or GIF at same time. Choose to rotate only landscape or portrait images!",
    icon: <RotateCw className="h-8 w-8 text-cyan-600" />,
    href: "/rotate-image",
    iconBg: "bg-cyan-600/10",
    comingSoon: true,
  },
  {
    title: "HTML to Image",
    description:
      "Convert webpages in HTML to JPG or SVG. Copy and paste the URL of the page you want and convert it to IMAGE with a click.",
    icon: <FileCode className="h-8 w-8 text-yellow-600" />,
    href: "/html-to-image",
    iconBg: "bg-yellow-600/10",
    comingSoon: true,
  },
]

export function ImageToolsGrid() {
  // Helper function to check if a page is implemented
  const isImplemented = (path: string) => IMPLEMENTED_PAGES.includes(path)

  return (
    <section className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 tool-grid">
        {tools.map((tool) => {
          // For implemented tools, render as a link
          if (isImplemented(tool.href)) {
            return (
              <Link key={tool.href} href={tool.href} className="block">
                <Card className="h-full tool-card">
                  <CardHeader className="pb-2">
                    <div className={`tool-icon rounded-full w-12 h-12 flex items-center justify-center ${tool.iconBg}`}>
                      {tool.icon}
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {tool.title}
                      {tool.badge && (
                        <span className="badge new text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          New!
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          }

          // For unimplemented tools, render as a non-clickable card with "Coming Soon" badge
          return (
            <div key={tool.href} className="block">
              <Card className="h-full opacity-70">
                <CardHeader className="pb-2">
                  <div className={`tool-icon rounded-full w-12 h-12 flex items-center justify-center ${tool.iconBg}`}>
                    {tool.icon}
                  </div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {tool.title}
                    <span className="badge text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">
                      Coming Soon
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </section>
  )
}

