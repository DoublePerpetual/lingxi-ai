'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
  Sun, Moon, Star, Brain, Heart, Briefcase, 
  TrendingUp, Shield, Download, Share2, MessageCircle,
  ChevronLeft, Sparkles
} from 'lucide-react'

function AstrologyResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('personality')

  useEffect(() => {
    const sessionId = searchParams.get('sessionId')
    if (sessionId) {
      try {
        const storedData = sessionStorage.getItem(sessionId)
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          setResult(parsedData)
          sessionStorage.removeItem(sessionId)
        }
      } catch (error) {
        console.error('Error parsing result data:', error)
      }
    }
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">正在加载你的专属星盘分析...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">未找到分析结果</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all"
          >
            返回重新分析
          </button>
        </div>
      </div>
    )
  }

  const { chart, analysis, nextSteps } = result

  const tabs = [
    { id: 'personality', label: '性格特质', icon: <Brain className="w-4 h-4" /> },
    { id: 'career', label: '事业财运', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'love', label: '感情婚姻', icon: <Heart className="w-4 h-4" /> },
    { id: 'health', label: '健康运势', icon: <Shield className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          返回
        </button>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            保存报告
          </button>
          <button className="flex items-center px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Share2 className="w-4 h-4 mr-2" />
            分享
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-purple-200/50 dark:border-purple-900/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI星盘解读报告
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {chart.name}的专属星盘分析
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              基于专业占星算法与DeepSeek AI的深度解读
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                <Sun className="w-10 h-10 text-white" />
              </div>
              <div className="font-semibold">太阳星座</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {chart.sunSign.chinese}
              </div>
              <div className="text-sm text-gray-500">{chart.sunSign.english}</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                <Moon className="w-10 h-10 text-white" />
              </div>
              <div className="font-semibold">月亮星座</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {chart.moonSign.chinese}
              </div>
              <div className="text-sm text-gray-500">{chart.moonSign.english}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-800/50 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">上升星座</div>
          <div className="font-semibold text-gray-900 dark:text-white">{chart.risingSign.chinese}</div>
        </div>
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-800/50 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">主导元素</div>
          <div className="font-semibold text-gray-900 dark:text-white">{chart.dominantElement}</div>
        </div>
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-800/50 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">主导模式</div>
          <div className="font-semibold text-gray-900 dark:text-white">{chart.dominantModality}</div>
        </div>
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-800/50 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">分析置信度</div>
          <div className="font-semibold text-gray-900 dark:text-white">{Math.round(analysis.confidence * 100)}%</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            {tab.icon}
            <span className="ml-2 font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personality Tab */}
          {activeTab === 'personality' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  核心性格特质
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {analysis.personality.overview}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-900/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  成长建议
                </h3>
                <ul className="space-y-3">
                  {analysis.personality.growthAdvice.map((advice: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Career Tab */}
          {activeTab === 'career' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  事业发展方向
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {analysis.career.overview}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-900/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  适合职业领域
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.career.suitableFields.map((field: string, index: number) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Love Tab */}
          {activeTab === 'love' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-600" />
                  感情模式分析
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {analysis.love.overview}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl p-6 border border-pink-200/50 dark:border-pink-900/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  关系建议
                </h3>
                <ul className="space-y-3">
                  {analysis.love.relationshipAdvice.map((advice: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Health Tab */}
          {activeTab === 'health' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  健康关注要点
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {analysis.health.overview}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-200/50 dark:border-green-900/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  养生建议
                </h3>
                <ul className="space-y-3">
                  {analysis.health.wellnessTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Chat */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-900/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
              与AI深入探讨
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              对星盘分析有疑问？想了解更多细节？
            </p>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all">
              开始AI对话
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              下一步建议
            </h3>
            <ul className="space-y-3">
              {nextSteps.map((step: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          占星智慧启示
        </h3>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          星盘是地图，不是命运。真正的智慧在于理解自己的特质、发挥优势、成长进化。
          无论星盘如何，人的自由意志和持续成长才是决定人生的关键。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-full bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-colors">
            记录本次分析
          </button>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
          >
            新的分析
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AstrologyResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">正在加载星盘分析...</p>
        </div>
      </div>
    }>
      <AstrologyResultContent />
    </Suspense>
  )
}
