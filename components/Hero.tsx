'use client'

import type { FC } from 'react'

interface HeroProps {
  openCount: number
  deltaText?: string
  subtitle?: string
  className?: string
}

const Hero: FC<HeroProps> = ({ openCount, deltaText, subtitle, className = '' }) => (
  <div className={`relative p-3 lg:p-4 rounded-3xl glass-card flex items-center justify-between group ${className}`}>
    <div className="flex-1 relative">
      <div className="text-sm lg:text-base font-display font-semibold leading-none text-gray-600">
        Total open issues
      </div>
      <div className="text-4xl lg:text-6xl font-display font-extrabold mt-0.5 lg:mt-1 text-gray-900 glow-brand">
        {openCount}
      </div>
      {deltaText && (
        <div className="mt-1 lg:mt-2 text-gray-600 text-xs lg:text-sm flex items-center gap-2">
          <span className="status-badge">
            {deltaText.includes('improvement') ? '↑' : '↓'}
          </span>
          <span className="font-medium">{deltaText}</span>
        </div>
      )}
    </div>

    <div className="text-right flex-shrink-0">
      <div className="inline-flex items-center gap-2 text-xs lg:text-sm font-medium text-gray-500">
        <span className="hover-underline cursor-default">
          Solid Systems — Live
        </span>
      </div>
      {subtitle && (
        <div className="text-sm lg:text-base text-gray-700 mt-1 font-display">
          {subtitle}
        </div>
      )}
    </div>
  </div>
)

export default Hero