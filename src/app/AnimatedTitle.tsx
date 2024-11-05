"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function AnimatedTitle() {
  return (
    <div className="relative text-left">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-2xl font-bold text-[#4fc3f7] whitespace-nowrap overflow-hidden"
      >
        <div
          className="animate-slide"
          style={{
            backgroundImage: 'linear-gradient(to right, #4fc3f7 0%, #4fc3f7 40%, #EAFF66 50%, #4fc3f7 60%, #4fc3f7 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '200% 100%',
            animation: 'slide 3s linear infinite',
          }}
        >
          Chrysalis
        </div>
      </motion.div>
      <style jsx>{`
        @keyframes slide {
          0%, 100% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}