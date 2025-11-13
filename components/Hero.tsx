'use client'

import type { FC } from 'react'

interface HeroProps {
  openCount: number
  deltaText?: string
  subtitle?: string
  className?: string
}

const Hero: FC<HeroProps> = ({ openCount, deltaText, subtitle, className = '' }) => (
  <div className={`relative p-5 lg:p-6 rounded-3xl glass-card flex items-center justify-between group ${className}`}>
    <div className="flex-1 relative">
      <div className="text-lg font-display font-semibold leading-none text-gray-600">
        Total open issues
      </div>
      <div className="text-6xl lg:text-7xl font-display font-extrabold mt-1 text-gray-900 glow-brand">
        {openCount}
      </div>
      {deltaText && (
        <div className="mt-2 text-gray-600 text-sm lg:text-base flex items-center gap-2">
          <span className="status-badge">
            {deltaText.includes('improvement') ? '↑' : '↓'}
          </span>
          <span className="font-medium">{deltaText}</span>
        </div>
      )}
    </div>

    <div className="text-right flex-shrink-0">
      <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-500">
        <span className="hover-underline cursor-default">
          Solid Systems — Live overview
        </span>
      </div>
      {subtitle && (
        <div className="text-lg text-gray-700 mt-2 font-display">
          {subtitle}
        </div>
      )}
    </div>
  </div>
)

export default Hero