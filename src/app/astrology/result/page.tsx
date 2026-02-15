'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
  Sun, Moon, Star, Brain, Heart, Briefcase, 
  TrendingUp, Shield, Download, Share2, MessageCircle,
  ChevronLeft, Sparkles
} from 'lucide-react'
import { AstrologyResponse } from '@/types/astrology'

export default function AstrologyResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [result, setResult] = useState<AstrologyResponse | null>(null)
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
            返回首页重新分析
          </button>
        </div>
      </div>
    )
  }

  const { chart, analysis } = result

  const tabs = [
    { id: 'personality', label: '性格分析', icon: <Brain className="w-4 h-4" /> },
    { id: 'relationships', label: '人际关系', icon: <Heart className="w-4 h-4" /> },
    { id: 'career', label: '事业发展', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'lifePath', label: '人生课题', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'advice', label: '实用建议', icon: <Shield className="w-4 h-4" /> },
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
              AI专属星盘分析
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              你的专属星盘解读
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              基于你的出生信息，结合DeepSeek AI与专业占星知识生成的个性化分析
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-2">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold">太阳星座</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{chart.sunSign}</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold">月亮星座</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{chart.moonSign}</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold">上升星座</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{chart.risingSign}</div>
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
        <div className="lg:col-span-2 space-y-8">
          {/* Personality Tab */}
          {activeTab === 'personality' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  核心优势
                </h3>
                <ul className="space-y-3">
                  {analysis.personality.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  潜在挑战
                </h3>
                <ul className="space-y-3">
                  {analysis.personality.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  内在动机
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {analysis.personality.coreMotivation}
                </p>
              </div>
            </div>
          )}

          {/* Relationships Tab */}
          {activeTab === 'relationships' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-600" />
                  情感需求
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {analysis.relationships.emotionalNeeds}
                </p>
              </div>
              
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  沟通风格
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {analysis.relationships.communicationStyle}
                </p>
              </div>
              
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  相处建议
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {analysis.relationships.compatibility}
                </p>
              </div>
            </div>
          )}

          {/* Add other tabs similarly... */}
          {activeTab !== 'personality' && activeTab !== 'relationships' && (
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                功能开发中
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                更多详细分析功能正在开发中，敬请期待！
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Chart Summary */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              星盘摘要
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">主导元素</div>
                <div className="font-medium text-gray-900 dark:text-white">{chart.dominantElement}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">主导模式</div>
                <div className="font-medium text-gray-900 dark:text-white">{chart.dominantModality}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">行星分布</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {chart.planets.length} 颗行星
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">重要相位</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {chart.aspects.length} 个相位
                </div>
              </div>
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-900/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
              与AI深入交流
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              对分析结果有疑问？想了解更多细节？
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
              {analysis.advice.immediate.slice(0, 3).map((advice, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{advice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          想要更深入的个性化分析？
        </h3>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          解锁无限AI对话、详细运势报告、情感陪护等高级功能
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-full bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-colors">
            升级高级版
          </button>
          <button className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors">
            免费试用7天
          </button>
        </div>
      </div>
    </div>
  )
}