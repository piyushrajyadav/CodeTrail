"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, FileText, LogOut, Mail, Plus, TrendingUp, Upload } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { ComingSoonModal } from "@/components/coming-soon-modal"

interface Analysis {
  id: string
  skill_gaps: string[]
  suitable_role: string
  project_suggestions: string[]
  learning_roadmap: string[]
  score: number
  created_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkUser()
    fetchAnalyses()
  }, [])

  const checkUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
      } else {
        setUser(user)
      }
    } catch (error) {
      console.error('Error checking user:', error)
      router.push("/login")
    }
    setLoading(false)
  }

  const fetchAnalyses = async () => {
    try {
      const { data, error } = await supabase.from("analyses").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching analyses:", error)
      } else {
        setAnalyses(data || [])
      }
    } catch (error) {
      console.error("Error in fetchAnalyses:", error)
      setAnalyses([])
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleDownloadReport = async (analysisId: string) => {
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

  const handleEmailReport = async (analysisId: string) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId, email: user?.email }),
      })

      const data = await response.json()

      if (data.comingSoon) {
        // Show coming soon modal
        setShowComingSoon(true)
      } else if (response.ok) {
        toast({
          title: "Success",
          description: "Report sent to your email!",
        })
      } else {
        throw new Error(data.error || "Failed to send email")
      }
    } catch (error) {
      // Fallback: show coming soon modal for any error
      setShowComingSoon(true)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">CodeTrail</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.email}</span>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/upload">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Upload className="h-6 w-6 text-indigo-600" />
                    <CardTitle>New Analysis</CardTitle>
                  </div>
                  <CardDescription>Upload your resume and GitHub profile for AI analysis</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowComingSoon(true)}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                  <CardTitle>Premium Features</CardTitle>
                </div>
                <CardDescription>Unlock advanced insights and detailed reports</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Recent Analyses */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Career Analyses</h2>

          {analyses.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No analyses yet</h3>
                <p className="text-gray-600 mb-4">
                  Upload your resume and GitHub profile to get started with your first career analysis.
                </p>
                <Link href="/upload">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Analysis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {analyses.map((analysis) => (
                <Card key={analysis.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>Career Analysis</span>
                          <Badge variant="secondary">Score: {analysis.score}/100</Badge>
                        </CardTitle>
                        <CardDescription>
                          Created on {new Date(analysis.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Score */}
                      <div>
                        <h4 className="font-semibold mb-2">Profile Score</h4>
                        <Progress value={analysis.score} className="mb-2" />
                        <p className="text-sm text-gray-600">{analysis.score}/100</p>
                      </div>

                      {/* Suitable Role */}
                      <div>
                        <h4 className="font-semibold mb-2">Best Role Match</h4>
                        <Badge variant="default" className="text-sm">
                          {analysis.suitable_role}
                        </Badge>
                      </div>

                      {/* Skill Gaps */}
                      <div>
                        <h4 className="font-semibold mb-2">Skill Gaps</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.skill_gaps.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {analysis.skill_gaps.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{analysis.skill_gaps.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Project Suggestions */}
                      <div>
                        <h4 className="font-semibold mb-2">Project Ideas</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {analysis.project_suggestions.slice(0, 2).map((project, index) => (
                            <li key={index} className="truncate">
                              • {project}
                            </li>
                          ))}
                          {analysis.project_suggestions.length > 2 && (
                            <li className="text-indigo-600">
                              +{analysis.project_suggestions.length - 2} more suggestions
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link href={`/report?id=${analysis.id}`}>
                        <Button 
                          variant="outline" 
                          className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <TrendingUp className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                          <span className="font-semibold text-lg">View Full Report</span>
                          <div className="ml-3 flex space-x-1">
                            <span className="animate-bounce delay-0">✨</span>
                            <span className="animate-bounce delay-100">🚀</span>
                            <span className="animate-bounce delay-200">💎</span>
                          </div>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  )
}
