'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
  Moon, Brain, Sparkles, Book, Heart, AlertCircle,
  Download, Share2, MessageCircle, ChevronLeft,
  TrendingUp, Lightbulb, Shield, Clock
} from 'lucide-react'

function DreamResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('summary')

  useEffect(() => {
    const sessionId = searchParams.get('sessionId')
    if (sessionId) {
      try {
        const storedData = sessionStorage.getItem(sessionId)
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          setResult(parsedData)
          // 清理sessionStorage
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
          <div className="w-16 h-16 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">正在加载梦境分析...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">未找到梦境分析结果</p>
          <button
            onClick={() => router.push('/dream')}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all"
          >
            返回重新分析
          </button>
        </div>
      </div>
    )
  }

  const { interpretation, symbols, nextSteps } = result

  const tabs = [
    { id: 'summary', label: '分析摘要', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'psychological', label: '心理学解读', icon: <Brain className="w-4 h-4" /> },
    { id: 'esoteric', label: '玄学解读', icon: <Moon className="w-4 h-4" /> },
    { id: 'symbols', label: '符号分析', icon: <Book className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/dream')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          返回
        </button>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            保存记录
          </button>
          <button className="flex items-center px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Share2 className="w-4 h-4 mr-2" />
            分享
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-900/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI梦境解析报告
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              你的梦境深度分析
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              基于心理学理论与玄学智慧的综合解读
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-3">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold">分析置信度</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(interpretation.confidence * 100)}%
              </div>
            </div>
          </div>
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
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700'
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
          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                  核心解读
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {interpretation.summary}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-900/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  成长方向
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {interpretation.summary.includes('成长方向') 
                    ? interpretation.summary.split('成长方向')[1] 
                    : '梦境提示你需要关注内在成长和情绪管理，通过自我觉察实现心理平衡。'}
                </p>
              </div>
            </div>
          )}

          {/* Psychological Tab */}
          {activeTab === 'psychological' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  心理学视角
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">弗洛伊德视角</h4>
                    <ul className="space-y-2">
                      {interpretation.psychological.freudian.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">荣格视角</h4>
                    <ul className="space-y-2">
                      {interpretation.psychological.jungian.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">现代心理学</h4>
                    <ul className="space-y-2">
                      {interpretation.psychological.modern.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Esoteric Tab */}
          {activeTab === 'esoteric' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Moon className="w-5 h-5 mr-2 text-indigo-600" />
                  玄学视角
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">西方解梦</h4>
                    <ul className="space-y-2">
                      {interpretation.esoteric.western.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-3" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">东方解梦</h4>
                    <ul className="space-y-2">
                      {interpretation.esoteric.eastern.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-3" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">通用符号</h4>
                    <ul className="space-y-2">
                      {interpretation.esoteric.universal.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-3" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Symbols Tab */}
          {activeTab === 'symbols' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Book className="w-5 h-5 mr-2 text-green-600" />
                  梦境符号分析
                </h3>
                <div className="space-y-4">
                  {symbols.map((symbol: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {symbol.symbol}
                        </div>
                        <div className="text-sm text-gray-500">
                          出现频率: {symbol.frequency}%
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">心理学意义</div>
                          <ul className="space-y-1">
                            {symbol.meanings.psychological.map((meaning: string, idx: number) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                • {meaning}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">玄学意义</div>
                          <ul className="space-y-1">
                            {symbol.meanings.esoteric.map((meaning: string, idx: number) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                • {meaning}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">文化意义</div>
                          <ul className="space-y-1">
                            {symbol.meanings.cultural.map((meaning: string, idx: number) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                • {meaning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          情绪关联: {symbol.emotionAssociation.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Personalized Insights */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-600" />
              个性化洞察
            </h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">基于星盘</div>
                <ul className="space-y-1">
                  {interpretation.personalized.basedOnChart.map((insight: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      • {insight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">行动建议</div>
                <ul className="space-y-1">
                  {interpretation.personalized.actionableAdvice.map((advice: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      • {advice}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-900/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
              与AI深入探讨
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              对梦境分析有疑问？想了解更多细节？
            </p>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all">
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
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          梦境智慧启示
        </h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          梦境是潜意识的信使，不是命运的预言。真正的智慧在于理解内在需求、整合自我、实现心理平衡。
          无论梦境吉凶，自我觉察和积极行动才是成长的关键。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
            记录本次分析
          </button>
          <button 
            onClick={() => router.push('/dream')}
            className="px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
          >
            新的梦境分析
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DreamResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">正在加载梦境分析...</p>
        </div>
      </div>
    }>
      <DreamResultContent />
    </Suspense>
  )
}