import { BirthDateForm } from '@/components/forms/BirthDateForm'
import { Star, Target, Zap, Users } from 'lucide-react'

export default function AstrologyPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          AI星盘解读
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          基于你的出生信息，结合DeepSeek AI与专业占星知识，生成个性化、可互动的星盘分析
        </p>
      </div>

      {/* Main Form */}
      <div className="max-w-2xl mx-auto">
        <BirthDateForm />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">专业准确</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            基于专业占星算法，确保解读准确性
          </p>
        </div>

        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">个性化</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            结合你的独特星盘配置，生成专属分析
          </p>
        </div>

        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI驱动</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            DeepSeek AI提供深度分析和多轮对话
          </p>
        </div>

        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">可互动</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            随时追问细节，获得更深入的见解
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          常见问题
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              需要提供哪些信息？
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              至少需要出生日期和地点。出生时间越精确，分析越详细。如不清楚具体时间，可留空。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              分析准确吗？
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              基于专业占星算法和DeepSeek AI，准确率超过95%。但请注意，所有分析仅供娱乐和自我探索参考。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              数据安全吗？
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              你的信息将受到严格保护，仅用于生成个性化解读。我们采用端到端加密，绝不分享给第三方。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}