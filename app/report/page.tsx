"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain, Download, Mail, TrendingUp, Target, Lightbulb, BookOpen } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface Analysis {
  id: string
  skill_gaps: string[]
  suitable_role: string
  project_suggestions: string[]
  learning_roadmap: string[]
  score: number
  created_at: string
}

export default function ReportPage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const analysisId = searchParams.get("id")

  useEffect(() => {
    checkUser()
    if (analysisId) {
      fetchAnalysis()
    }
  }, [analysisId])

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

  const fetchAnalysis = async () => {
    if (!analysisId) return

    const { data, error } = await supabase.from("analyses").select("*").eq("id", analysisId).single()

    if (error) {
      console.error("Error fetching analysis:", error)
      toast({
        title: "Error",
        description: "Failed to load analysis",
        variant: "destructive",
      })
    } else {
      setAnalysis(data)
    }
    setLoading(false)
  }

  const handleDownloadReport = async () => {
    if (!analysisId) return

    try {
      // Open the PDF generation route in a new window for printing
      const printWindow = window.open(`/api/generate-pdf?id=${analysisId}`, '_blank')
      
      if (!printWindow) {
        toast({
          title: "Popup Blocked",
          description: "Please allow popups and try again",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open print dialog",
        variant: "destructive",
      })
    }
  }

  const handleEmailReport = async () => {
    if (!analysisId || !user?.email) return

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId, email: user.email }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Report sent to your email!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      })
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent profile! You're well-positioned for your target roles."
    if (score >= 60) return "Good profile with room for improvement in key areas."
    return "Your profile needs significant development to match target roles."
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Analysis not found</p>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="text-2xl font-bold text-gray-900">Career Analysis Report</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={handleEmailReport}>
                <Mail className="h-4 w-4 mr-2" />
                Email Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
                <span>Profile Overview</span>
              </CardTitle>
              <CardDescription>Generated on {new Date(analysis.created_at).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Profile Score</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">
                        <span className={getScoreColor(analysis.score)}>{analysis.score}</span>
                        <span className="text-gray-400">/100</span>
                      </span>
                    </div>
                    <Progress value={analysis.score} className="h-3" />
                    <p className="text-sm text-gray-600">{getScoreDescription(analysis.score)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Best Role Match</h3>
                  <Badge variant="default" className="text-lg px-4 py-2">
                    {analysis.suitable_role}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">
                    Based on your skills and experience, this role aligns best with your profile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Gaps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-red-500" />
                <span>Skill Gap Analysis</span>
              </CardTitle>
              <CardDescription>Key skills to develop for your target role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {analysis.skill_gaps.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-700">{skill}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Tip:</strong> Focus on developing these skills through online courses, personal projects, or
                  contributing to open-source projects.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Project Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                <span>Project Suggestions</span>
              </CardTitle>
              <CardDescription>Build these projects to strengthen your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.project_suggestions.map((project, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">{project}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-green-500" />
                <span>Learning Roadmap</span>
              </CardTitle>
              <CardDescription>Step-by-step plan to achieve your career goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.learning_roadmap.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      {index < analysis.learning_roadmap.length - 1 && (
                        <div className="w-0.5 h-8 bg-green-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-gray-800 font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Recommended actions to improve your career prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm">Start with the highest priority skill gaps</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm">Build one project from the suggestions list</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm">Follow the learning roadmap step by step</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm">Update your resume and GitHub profile regularly</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
