import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Mail } from "lucide-react"
import { generatePageMetadata } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata(
  "Login to FileTools - Access Premium Features",
  "Sign in to your FileTools account to access premium PDF and image processing features. Coming soon!",
  "/login"
)

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to access all features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" disabled />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300" disabled />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button variant="link" className="px-0" disabled>
              Forgot password?
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" disabled>
            Coming Soon
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" disabled>
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" disabled>
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Button variant="link" className="px-0" disabled>
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 