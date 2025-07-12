import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeTrail - AI-Powered Career Guidance",
  description: "Get personalized career advice, skill gap analysis, and learning roadmaps powered by AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <Toaster />
        
        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 text-sm mb-2">
              Developed by{" "}
              <a 
                href="https://github.com/piyushrajyadav" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors"
              >
                Piyush Yadav
              </a>
            </p>
            <p className="text-gray-500 text-xs">
              Empowering developers to navigate their career journey with AI-powered insights
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
