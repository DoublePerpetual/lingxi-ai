'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
  Book, Sparkles, Target, Clock, Shield, 
  Download, Share2, MessageCircle, ChevronLeft,
  TrendingUp, AlertCircle, Lightbulb, Heart, Circle
} from 'lucide-react'

function IChingResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

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
          <div className="w-16 h-16 mx-auto border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">正在生成卦象解读...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">未找到占卜结果</p>
          <button
            onClick={() => router.push('/iching')}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg transition-all"
          >
            返回重新占卜
          </button>
        </div>
      </div>
    )
  }

  const { reading } = result
  const { primaryHexagram, changingHexagram } = reading

  const tabs = [
    { id: 'overview', label: '卦象总览', icon: <Circle className="w-4 h-4" /> },
    { id: 'lines', label: '爻线分析', icon: <Book className="w-4 h-4" /> },
    { id: 'advice', label: '行动建议', icon: <Target className="w-4 h-4" /> },
    { id: 'timing', label: '时机把握', icon: <Clock className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/iching')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
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
      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-8 border border-amber-200/50 dark:border-amber-900/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI周易占卜解读
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              你的卦象解读
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              基于《周易》经典与DeepSeek AI的个性化分析
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                <div className="text-3xl font-bold text-white">{primaryHexagram?.symbol || '䷀'}</div>
              </div>
              <div className="font-semibold">主卦</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {primaryHexagram?.chineseName || '乾'}卦
              </div>
              <div className="text-sm text-gray-500">{primaryHexagram?.name || 'Qian'}</div>
            </div>
            
            {changingHexagram && (
              <>
                <div className="text-2xl text-amber-600">→</div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-3">
                    <div className="text-3xl font-bold text-white">{changingHexagram.symbol}</div>
                  </div>
                  <div className="font-semibold">变卦</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {changingHexagram.chineseName}卦
                  </div>
                  <div className="text-sm text-gray-500">{changingHexagram.name}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
          <Book className="w-5 h-5 mr-2 text-amber-600" />
          你的问题
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{reading.question}</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                : 'bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-amber-300 dark:hover:border-amber-700'
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Circle className="w-5 h-5 mr-2 text-amber-600" />
                  卦象总览
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {reading.reading?.overview || '卦象反映了当前的情境和趋势，需要结合具体问题分析。'}
                </p>
              </div>
              
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  当前情境
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {reading.reading?.currentSituation || '需要结合具体情境进行分析。'}
                </p>
              </div>
              
              {changingHexagram && (
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-200/50 dark:border-orange-900/50">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    变卦启示
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    从{primaryHexagram?.chineseName || '乾'}卦变为{changingHexagram.chineseName}卦，
                    表明事情可能发生重要转变，需要关注变化的方向和时机。
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Advice Tab */}
          {activeTab === 'advice' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  行动建议
                </h3>
                <ul className="space-y-3">
                  {(reading.reading?.advice || ['保持心态平和，顺势而为', '注重道德修养和人际关系', '审时度势，把握时机']).map((advice: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                  注意事项
                </h3>
                <ul className="space-y-3">
                  {(reading.reading?.warning || ['避免极端和冲动的决定', '注意人际关系中的沟通']).map((warning: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        ⚠️
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {(activeTab === 'lines' || activeTab === 'timing') && (
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                功能完善中
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                更多详细分析功能正在开发中，敬请期待！
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Hexagram Info */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              卦象信息
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">卦名</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {primaryHexagram?.chineseName || '乾'} · {primaryHexagram?.name || 'Qian'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">卦辞</div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {primaryHexagram?.judgment || '元亨利贞。'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">象传</div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {primaryHexagram?.image || '天行健，君子以自强不息。'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">占卜方法</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {reading.method === 'coins' ? '硬币法' : 
                   reading.method === 'yarrow' ? '蓍草法' : '数字法'}
                </div>
              </div>
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-900/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-amber-600" />
              与AI深入探讨
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              对卦象解读有疑问？想了解更多细节？
            </p>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium hover:shadow-lg transition-all">
              开始AI对话
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              下一步建议
            </h3>
            <ul className="space-y-3">
              {(result.nextSteps || ['静心反思卦象启示', '记录本次占卜结果', '结合现实情况制定行动计划']).map((step: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
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
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          《周易》智慧启示
        </h3>
        <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
          卦象提供的是地图，不是命运。真正的智慧在于理解变化、把握时机、修养德行。
          无论卦象吉凶，人的主观能动性和道德修养才是决定成败的关键。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-full bg-white text-amber-600 font-semibold hover:bg-amber-50 transition-colors">
            记录本次占卜
          </button>
          <button 
            onClick={() => router.push('/iching')}
            className="px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
          >
            新的占卜
          </button>
        </div>
      </div>
    </div>
  )
}

export default function IChingResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">正在加载卦象解读...</p>
        </div>
      </div>
    }>
      <IChingResultContent />
    </Suspense>
  )
}