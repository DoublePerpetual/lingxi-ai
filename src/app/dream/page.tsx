'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Brain, Heart, Zap, BookOpen, Sparkles } from 'lucide-react'

export default function DreamPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [dreamData, setDreamData] = useState({
    content: '',
    emotion: 'confused' as 'happy' | 'anxious' | 'confused' | 'peaceful' | 'fearful' | 'excited',
    recurring: false,
    sleepQuality: 'average' as 'good' | 'average' | 'poor'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/dreams/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dream: dreamData.content,
          emotion: dreamData.emotion,
          recurring: dreamData.recurring,
          context: {
            sleepQuality: dreamData.sleepQuality
          }
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        // 使用sessionStorage存储数据，避免URL过长
        const sessionId = `dream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem(sessionId, JSON.stringify(data))
        // 跳转到结果页面，只传递sessionId
        router.push(`/dream/result?sessionId=${sessionId}`)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setDreamData(prev => ({ ...prev, [name]: checked }))
    } else {
      setDreamData(prev => ({ ...prev, [name]: value }))
    }
  }

  const emotions = [
    { value: 'happy', label: '😊 快乐', color: 'bg-green-100 text-green-800' },
    { value: 'anxious', label: '😰 焦虑', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confused', label: '😕 困惑', color: 'bg-blue-100 text-blue-800' },
    { value: 'peaceful', label: '😌 平静', color: 'bg-purple-100 text-purple-800' },
    { value: 'fearful', label: '😨 恐惧', color: 'bg-red-100 text-red-800' },
    { value: 'excited', label: '🤩 兴奋', color: 'bg-pink-100 text-pink-800' }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-medium">
          <Moon className="w-5 h-5 mr-2" />
          梦境解析
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          探索梦境背后的秘密
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          融合心理学与玄学智慧，用AI解读你的梦境，发现潜意识的讯息
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dream Content */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <BookOpen className="inline w-5 h-5 mr-2 text-purple-600" />
                  描述你的梦境
                </label>
                <textarea
                  name="content"
                  value={dreamData.content}
                  onChange={handleChange}
                  placeholder="详细描述你的梦境，包括场景、人物、感受和细节..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  required
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  描述越详细，分析越准确。包括颜色、声音、感受等细节。
                </p>
              </div>

              {/* Emotion Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <Heart className="inline w-5 h-5 mr-2 text-pink-600" />
                  梦中的主要情绪
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {emotions.map(emotion => (
                    <label
                      key={emotion.value}
                      className="cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="emotion"
                        value={emotion.value}
                        checked={dreamData.emotion === emotion.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`px-4 py-3 rounded-xl text-center border transition-all ${
                        dreamData.emotion === emotion.value
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                          : 'border-gray-300 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                      }`}>
                        {emotion.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    这个梦重复出现吗？
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recurring"
                        value="false"
                        checked={!dreamData.recurring}
                        onChange={() => setDreamData(prev => ({ ...prev, recurring: false }))}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">第一次出现</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recurring"
                        value="true"
                        checked={dreamData.recurring}
                        onChange={() => setDreamData(prev => ({ ...prev, recurring: true }))}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">重复出现</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    近期睡眠质量
                  </label>
                  <select
                    name="sleepQuality"
                    value={dreamData.sleepQuality}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="good">😴 良好</option>
                    <option value="average">😐 一般</option>
                    <option value="poor">😫 较差</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !dreamData.content.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    正在分析你的梦境...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    开始AI梦境解析
                  </div>
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                你的梦境内容将受到严格保护，仅用于生成个性化解读
              </p>
            </form>
          </div>
        </div>

        {/* Sidebar - Features */}
        <div className="space-y-6">
          {/* Features */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <Brain className="inline w-5 h-5 mr-2 text-blue-600" />
              分析维度
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">心理学视角（弗洛伊德、荣格）</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">玄学视角（东西方解梦传统）</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">个性化建议与行动指南</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">符号识别与深度解读</span>
              </li>
            </ul>
          </div>

          {/* Common Symbols */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-900/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <Zap className="inline w-5 h-5 mr-2 text-blue-600" />
              常见梦境符号
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">飞翔</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">自由·成就</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">水</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">情绪·净化</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">考试</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">压力·评估</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">蛇</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">转变·智慧</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💡 记录技巧
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 醒来立即记录，避免遗忘</li>
              <li>• 注意细节：颜色、声音、感受</li>
              <li>• 记录醒来时的情绪状态</li>
              <li>• 观察重复出现的模式</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            梦境解析原理
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">心理学分析</h3>
              <p className="text-gray-600 dark:text-gray-400">
                结合弗洛伊德、荣格等心理学理论，解读潜意识信息
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <Moon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">玄学智慧</h3>
              <p className="text-gray-600 dark:text-gray-400">
                融合东西方解梦传统，提供跨文化视角
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">AI增强</h3>
              <p className="text-gray-600 dark:text-gray-400">
                DeepSeek AI提供个性化、深入的解读分析
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}