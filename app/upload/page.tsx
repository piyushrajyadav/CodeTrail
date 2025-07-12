"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Brain, FileText, Github, Upload, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function UploadPage() {
  const [user, setUser] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const [githubUsername, setGithubUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/login")
    } else {
      setUser(user)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !githubUsername) {
      toast({
        title: "Error",
        description: "Please provide both resume and GitHub username",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setProgress(0)

    try {
      // Step 1: Upload file to Supabase Storage
      setStep(1)
      setProgress(20)

      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("resumes").upload(fileName, file)

      if (uploadError) throw uploadError

      // Step 2: Extract text from PDF
      setStep(2)
      setProgress(40)

      const formData = new FormData()
      formData.append("file", file)

      const extractResponse = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      })

      if (!extractResponse.ok) throw new Error("Failed to extract PDF text")

      const { text: resumeText } = await extractResponse.json()

      // Step 3: Fetch GitHub data
      setStep(3)
      setProgress(60)

      const githubResponse = await fetch(`/api/github?username=${githubUsername}`)
      if (!githubResponse.ok) throw new Error("Failed to fetch GitHub data")

      const githubData = await githubResponse.json()

      // Step 4: Analyze with Gemini
      setStep(4)
      setProgress(80)

      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          githubData,
          userId: user.id,
        }),
      })

      if (!analysisResponse.ok) throw new Error("Failed to analyze data")

      const analysis = await analysisResponse.json()

      setProgress(100)

      toast({
        title: "Success",
        description: "Analysis completed successfully!",
      })

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error: any) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error.message || "An error occurred during analysis",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setProgress(0)
      setStep(1)
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Uploading resume..."
      case 2:
        return "Extracting text from PDF..."
      case 3:
        return "Fetching GitHub data..."
      case 4:
        return "Analyzing with AI..."
      default:
        return "Processing..."
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">Career Path Advisor</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Profile</h1>
            <p className="text-gray-600">
              Upload your resume and provide your GitHub username to get personalized career insights
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Analysis</CardTitle>
              <CardDescription>
                We'll analyze your resume and GitHub profile to provide personalized career guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-lg font-semibold">{getStepDescription()}</p>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-gray-600 text-center">This may take a few moments...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume (PDF)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          {file ? file.name : "Click to upload or drag and drop your resume"}
                        </p>
                        <Input id="resume" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("resume")?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose PDF File
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* GitHub Username */}
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Username</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="github"
                        type="text"
                        placeholder="Enter your GitHub username"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">We'll analyze your public repositories and contributions</p>
                  </div>

                  <Button type="submit" className="w-full" disabled={!file || !githubUsername}>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze My Profile
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* What happens next */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Resume Analysis</p>
                    <p className="text-sm text-gray-600">We extract your skills, experience, and education</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">GitHub Analysis</p>
                    <p className="text-sm text-gray-600">We review your repositories and coding activity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">AI Analysis</p>
                    <p className="text-sm text-gray-600">Our AI provides personalized insights and recommendations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Get Results</p>
                    <p className="text-sm text-gray-600">View your personalized career roadmap and recommendations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
