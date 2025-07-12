import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // For this MVP, we'll simulate PDF text extraction
    // In production, you'd use a library like pdf-parse or pdf2pic
    const simulatedText = `
    John Doe
    Software Engineer
    
    EXPERIENCE:
    - Senior Software Engineer at Tech Corp (2020-2024)
    - Full Stack Developer at StartupXYZ (2018-2020)
    - Junior Developer at WebAgency (2016-2018)
    
    SKILLS:
    JavaScript, TypeScript, React, Node.js, Python, SQL, AWS, Docker
    
    EDUCATION:
    Bachelor of Science in Computer Science
    University of Technology (2012-2016)
    
    PROJECTS:
    - E-commerce Platform using React and Node.js
    - Machine Learning Model for Predictive Analytics
    - Mobile App Development with React Native
    `

    return NextResponse.json({ text: simulatedText })
  } catch (error) {
    console.error("Error extracting PDF:", error)
    return NextResponse.json({ error: "Failed to extract PDF text" }, { status: 500 })
  }
}
