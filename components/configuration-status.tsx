"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface ConfigStatus {
  supabase: boolean
  gemini: boolean
  resend: boolean
  github: boolean
}

export function ConfigurationStatus() {
  const checkConfig = (): ConfigStatus => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    return {
      supabase: !!(supabaseUrl && !supabaseUrl.includes('your-project') && supabaseKey && !supabaseKey.includes('your_actual')),
      gemini: !!(process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes('your_actual')),
      resend: !!(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('your_actual')),
      github: !!(process.env.GITHUB_TOKEN && !process.env.GITHUB_TOKEN.includes('your_actual'))
    }
  }

  const config = checkConfig()
  const allConfigured = Object.values(config).every(Boolean)

  if (allConfigured) {
    return null // Don't show anything if everything is configured
  }

  return (
    <div className="mb-6 space-y-4">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Configuration Required</AlertTitle>
        <AlertDescription>
          Some services need to be configured in your .env.local file for full functionality.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className={`flex items-center space-x-2 ${config.supabase ? 'text-green-600' : 'text-red-600'}`}>
          {config.supabase ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <span>Supabase Database</span>
        </div>
        
        <div className={`flex items-center space-x-2 ${config.gemini ? 'text-green-600' : 'text-red-600'}`}>
          {config.gemini ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <span>Gemini AI</span>
        </div>
        
        <div className={`flex items-center space-x-2 ${config.resend ? 'text-green-600' : 'text-amber-600'}`}>
          {config.resend ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          <span>Email Service</span>
        </div>
        
        <div className={`flex items-center space-x-2 ${config.github ? 'text-green-600' : 'text-amber-600'}`}>
          {config.github ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          <span>GitHub API</span>
        </div>
      </div>
    </div>
  )
}
