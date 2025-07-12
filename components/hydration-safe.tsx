"use client"

import React, { useEffect, useState } from 'react'

interface HydrationSafeProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Component that prevents hydration errors by only rendering children on the client side
 * This helps with browser extensions that modify form elements
 */
export function HydrationSafe({ children, fallback = null }: HydrationSafeProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

/**
 * Form wrapper that suppresses hydration warnings for form elements
 * Use this for forms that might be affected by browser extensions
 */
export function HydrationSafeForm({ 
  children, 
  className, 
  ...props 
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form 
      className={className} 
      suppressHydrationWarning={true}
      {...props}
    >
      {children}
    </form>
  )
}
