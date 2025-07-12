import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

// Use environment variable from .env.local
const resend = new Resend(process.env.RESEND_API_KEY!)

// Create Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { analysisId, email } = await request.json()

    if (!analysisId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // TODO: Email functionality - Coming Soon!
    // Currently disabled for demo purposes
    
    /*
    // Fetch analysis data
    const { data: analysis, error } = await supabase.from("analyses").select("*").eq("id", analysisId).single()

    if (error || !analysis) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 })
    }

    // Create email content
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; background: #4F46E5; color: white; padding: 20px; border-radius: 8px; }
            .section { margin: 20px 0; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
            .score { font-size: 36px; font-weight: bold; color: #4F46E5; }
            .skill-gap { background: #FEF2F2; padding: 4px 8px; margin: 2px; border-radius: 4px; display: inline-block; }
            .badge { background: #4F46E5; color: white; padding: 8px 16px; border-radius: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>CodeTrail Career Analysis Report</h1>
                <p>Generated on ${new Date(analysis.created_at).toLocaleDateString()}</p>
            </div>

            <div class="section">
                <h2>Profile Score</h2>
                <div class="score">${analysis.score}/100</div>
            </div>

            <div class="section">
                <h2>Best Role Match</h2>
                <span class="badge">${analysis.suitable_role}</span>
            </div>

            <div class="section">
                <h2>Skill Gaps to Address</h2>
                ${analysis.skill_gaps.map((skill: string) => `<span class="skill-gap">${skill}</span>`).join(" ")}
            </div>

            <div class="section">
                <h2>Project Suggestions</h2>
                <ul>
                    ${analysis.project_suggestions.map((project: string) => `<li>${project}</li>`).join("")}
                </ul>
            </div>

            <div class="section">
                <h2>Learning Roadmap</h2>
                <ol>
                    ${analysis.learning_roadmap.map((step: string) => `<li>${step}</li>`).join("")}
                </ol>
            </div>

            <div class="section">
                <p><strong>Next Steps:</strong> Focus on addressing your skill gaps and building the suggested projects to improve your career prospects.</p>
                <p>Visit your dashboard for more detailed insights and to track your progress.</p>
            </div>
        </div>
    </body>
    </html>
    `

    // Send email
    const { data, error: emailError } = await resend.emails.send({
      from: "CodeTrail <noreply@codetrail.example.com>",
      to: [email],
      subject: "Your Career Analysis Report",
      html: emailHtml,
    })

    if (emailError) {
      console.error("Email error:", emailError)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: data?.id })
    */

    // Return "coming soon" response for now
    return NextResponse.json({ 
      success: false, 
      comingSoon: true,
      message: "Email feature coming soon! For now, you can download the PDF report." 
    })

  } catch (error: any) {
    console.error("Error in send-email route:", error)
    return NextResponse.json({ 
      success: false, 
      comingSoon: true,
      message: "Email feature coming soon!." 
    })
  }
}
