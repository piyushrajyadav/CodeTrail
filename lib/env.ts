// Environment variable validation and exports
export const env = {
  // Supabase (client-side)
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

  // Server-side only
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
  RESEND_API_KEY: process.env.RESEND_API_KEY!,

  // App config
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}

// Validate required environment variables
export function validateEnv() {
  const requiredEnvVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "GEMINI_API_KEY",
    "RESEND_API_KEY",
  ]

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` + "Please check your .env.local file.",
    )
  }
}
