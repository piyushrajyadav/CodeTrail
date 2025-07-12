"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Crown, Star, Zap } from "lucide-react"

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <span>Premium Features Coming Soon!</span>
          </DialogTitle>
          <DialogDescription>
            We're working hard to bring you advanced career insights and premium features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">Advanced skill gap analysis</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">Personalized learning paths</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">Industry-specific insights</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">Priority support</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold text-indigo-900">Stay Tuned!</span>
            </div>
            <p className="text-sm text-indigo-700">
              Premium features will be available soon. Keep using the free version to get valuable career insights!
            </p>
          </div>

          <Button onClick={onClose} className="w-full">
            Got it, thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
