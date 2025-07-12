import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Test if we can connect to the database
    const { data, error } = await supabaseAdmin
      .from("analyses")
      .select("count(*)")
      .limit(1)

    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        hint: "Make sure the 'analyses' table exists and SUPABASE_SERVICE_ROLE_KEY is set"
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Database connection successful",
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasGeminiKey: !!process.env.GEMINI_API_KEY
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
