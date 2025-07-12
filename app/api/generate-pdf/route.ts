import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const analysisId = searchParams.get("id")

  if (!analysisId) {
    return NextResponse.json({ error: "Analysis ID is required" }, { status: 400 })
  }

  try {
    // Fetch analysis data
    const { data: analysis, error } = await supabase.from("analyses").select("*").eq("id", analysisId).single()

    if (error || !analysis) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 })
    }

    // Generate HTML content for browser printing
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>CodeTrail Career Analysis Report</title>
        <style>
            @media print {
                body { margin: 0; }
                .no-print { display: none; }
            }
            body { 
                font-family: Arial, sans-serif; 
                margin: 40px; 
                color: #333; 
                line-height: 1.6;
            }
            .header { 
                text-align: center; 
                margin-bottom: 40px; 
                border-bottom: 3px solid #4F46E5;
                padding-bottom: 20px;
            }
            .logo {
                font-size: 32px;
                font-weight: bold;
                color: #4F46E5;
                margin-bottom: 10px;
            }
            .score { 
                font-size: 48px; 
                font-weight: bold; 
                color: #4F46E5; 
                margin: 20px 0;
            }
            .section { 
                margin-bottom: 30px; 
                page-break-inside: avoid;
            }
            .section h2 { 
                color: #4F46E5; 
                border-bottom: 2px solid #4F46E5; 
                padding-bottom: 10px; 
                margin-bottom: 15px;
                font-size: 24px;
            }
            .skill-gap { 
                background: #EEF2FF; 
                border: 1px solid #C7D2FE;
                padding: 8px 12px; 
                margin: 5px; 
                border-radius: 5px; 
                display: inline-block; 
                font-weight: 500;
            }
            .project { 
                background: #FFFBEB; 
                border: 1px solid #FEF3C7;
                padding: 15px; 
                margin: 10px 0; 
                border-radius: 5px; 
                border-left: 4px solid #F59E0B;
            }
            .roadmap-step { 
                background: #F0FDF4; 
                border: 1px solid #BBF7D0;
                padding: 15px; 
                margin: 10px 0; 
                border-radius: 5px; 
                border-left: 4px solid #10B981;
            }
            .badge { 
                background: #4F46E5; 
                color: white; 
                padding: 8px 16px; 
                border-radius: 20px; 
                font-weight: 600;
            }
            .print-button {
                background: #4F46E5;
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                margin: 20px 0;
            }
            .print-button:hover {
                background: #4338CA;
            }
        </style>
        <script>
            function printReport() {
                window.print();
            }
            // Auto-print when page loads
            window.onload = function() {
                setTimeout(function() {
                    window.print();
                }, 500);
            }
        </script>
    </head>
    <body>
        <div class="no-print">
            <button class="print-button" onclick="printReport()">🖨️ Print Report</button>
        </div>
        
        <div class="header">
            <div class="logo">🧠 CodeTrail</div>
            <h1>Career Analysis Report</h1>
            <p>Generated on ${new Date(analysis.created_at).toLocaleDateString()}</p>
            <div class="score">${analysis.score}/100</div>
        </div>

        <div class="section">
            <h2>🎯 Best Role Match</h2>
            <span class="badge">${analysis.suitable_role}</span>
        </div>

        <div class="section">
            <h2>📈 Skill Gaps to Address</h2>
            <div style="margin-top: 15px;">
                ${analysis.skill_gaps.map((skill: string) => `<span class="skill-gap">${skill}</span>`).join("")}
            </div>
        </div>

        <div class="section">
            <h2>💡 Project Suggestions</h2>
            ${analysis.project_suggestions
              .map(
                (project: string, index: number) =>
                  `<div class="project"><strong>Project ${index + 1}:</strong> ${project}</div>`,
              )
              .join("")}
        </div>

        <div class="section">
            <h2>🗺️ Learning Roadmap</h2>
            ${analysis.learning_roadmap
              .map(
                (step: string, index: number) =>
                  `<div class="roadmap-step"><strong>Step ${index + 1}:</strong> ${step}</div>`,
              )
              .join("")}
        </div>

        <div class="section no-print" style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #E5E7EB;">
            <p style="color: #6B7280; font-style: italic;">
                Generated by CodeTrail - AI-Powered Career Path Advisor<br>
                thank for using CodeTrail <strong>Best wished from Piyush Yadav</strong>
            </p>
        </div>
    </body>
    </html>
    `

    // Return HTML content for browser printing
    const headers = new Headers()
    headers.set("Content-Type", "text/html; charset=utf-8")
    
    return new Response(htmlContent, { headers })
  } catch (error: any) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
