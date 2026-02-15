import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  gradient: string
  href: string
}

export function FeatureCard({ icon, title, description, gradient, href }: FeatureCardProps) {
  return (
    <Link href={href}>
      <div className="group relative h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 hover:border-transparent transition-all duration-300 card-hover overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative space-y-4">
          {/* Icon */}
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} text-white`}>
            {icon}
          </div>
          
          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Arrow */}
          <div className="flex items-center text-purple-600 dark:text-purple-400 group-hover:text-pink-600 transition-colors">
            <span className="text-sm font-medium">开始体验</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}