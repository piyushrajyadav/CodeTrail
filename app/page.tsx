import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, FileText, Github, Mail, TrendingUp, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">Career Path Advisor</span>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">AI-Powered Career Guidance</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Upload your resume and GitHub profile to get personalized skill gap analysis, role recommendations, project
          suggestions, and a custom learning roadmap.
        </p>
        <Link href="/login">
          <Button size="lg" className="text-lg px-8 py-4">
            Start Your Career Analysis
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <FileText className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>Upload Resume</CardTitle>
              <CardDescription>
                Upload your PDF resume and we'll extract your skills, experience, and education
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Github className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>Connect GitHub</CardTitle>
              <CardDescription>
                Add your GitHub username to analyze your coding projects and contributions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                Get personalized insights, skill gaps, role matches, and learning roadmaps
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Skill Gap Analysis</h3>
              <p className="text-gray-600">Identify missing skills for your target role</p>
            </div>

            <div className="text-center">
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Role Matching</h3>
              <p className="text-gray-600">Find the best tech roles for your profile</p>
            </div>

            <div className="text-center">
              <FileText className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Project Ideas</h3>
              <p className="text-gray-600">Get suggestions for portfolio projects</p>
            </div>

            <div className="text-center">
              <Mail className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Learning Roadmap</h3>
              <p className="text-gray-600">Step-by-step plan to reach your goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy;  CodeTrail and piyush yadav . All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
