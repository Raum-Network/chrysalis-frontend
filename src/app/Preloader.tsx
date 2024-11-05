import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Preloader() {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1929]">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#4fc3f7]" />
        <p className="mt-4 text-lg font-medium text-[#4fc3f7] text-center">Loading Chrysalis...</p>
      </div>
    </div>
  )
  
}