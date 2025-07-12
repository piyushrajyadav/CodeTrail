"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, Clock } from "lucide-react"

interface EmailVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export function EmailVerificationModal({ isOpen, onClose, email }: EmailVerificationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-blue-500" />
            <span>Verify Your Email</span>
          </DialogTitle>
          <DialogDescription>
            We've sent a verification link to your email address.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Mail className="h-16 w-16 text-blue-500" />
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Check Your Inbox!
            </h3>
            
            <p className="text-blue-700 mb-4">
              We've sent a verification email to:
            </p>
            
            <div className="bg-white px-4 py-2 rounded-md border border-blue-300">
              <span className="font-medium text-blue-900">{email}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3 text-sm text-gray-600">
              <Clock className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-medium">What's next?</p>
                <ol className="list-decimal list-inside space-y-1 mt-1">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the verification link in the email</li>
                  <li>Return here and sign in with your credentials</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Mail className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Didn't receive the email?
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check your spam or junk folder</li>
                    <li>Make sure you entered the correct email address</li>
                    <li>Wait a few minutes for the email to arrive</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              I'll Check My Email
            </Button>
            <Button onClick={onClose} className="flex-1">
              Got It, Thanks!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
