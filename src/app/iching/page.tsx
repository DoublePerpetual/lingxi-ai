'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Book, Sparkles, Target, Clock, Shield, Coins, Leaf, Cpu, ChevronDown, Circle } from 'lucide-react'

export default function IChingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [divinationData, setDivinationData] = useState({
    question: '',
    method: 'digital' as 'coins' | 'yarrow' | 'digital',
    focusAreas: [] as string[]
  })

  const focusOptions = [
    { value: 'career', label: '事业工作' },
    { value: 'love', label: '感情婚姻' },
    { value: 'health', label: '健康养生' },
    { value: 'wealth', label: '财运投资' },
    { value: 'education', label: '学习考试' },
    { value: 'relationships', label: '人际关系' },
    { value: 'decision', label: '重大决策' },
    { value: 'spiritual', label: '心灵成长' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/iching/divine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(divinationData)
      })
      
      if (response.ok) {
        const data = await response.json()
        // 使用sessionStorage存储数据，避免URL过长
        const sessionId = `iching_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem(sessionId, JSON.stringify(data))
        // 跳转到结果页面，只传递sessionId
        router.push(`/iching/result?sessionId=${sessionId}`)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDivinationData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDivinationData(prev => ({ ...prev, [name]: value }))
  }

  const toggleFocusArea = (value: string) => {
    setDivinationData(prev => {
      const newFocusAreas = prev.focusAreas.includes(value)
        ? prev.focusAreas.filter(item => item !== value)
        : [...prev.focusAreas, value]
      return { ...prev, focusAreas: newFocusAreas }
    })
  }

  const methods = [
    { value: 'digital', label: '数字摇卦', icon: <Cpu className="w-4 h-4" />, description: 'AI随机生成卦象，快速便捷' },
    { value: 'coins', label: '硬币占卜', icon: <Coins className="w-4 h-4" />, description: '传统三枚硬币法，心诚则灵' },
    { value: 'yarrow', label: '蓍草古法', icon: <Leaf className="w-4 h-4" />, description: '最古老的占卜方法，仪式感强' }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-medium">
          <Circle className="w-5 h-5 mr-2" />
          周易占卜
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          古老智慧，AI解读
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          基于《周易》64卦经典，结合DeepSeek AI，为你提供专业的卦象解读与人生指引
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <Book className="inline w-5 h-5 mr-2 text-amber-600" />
                  提出你的问题
                </label>
                <textarea
                  name="question"
                  value={divinationData.question}
                  onChange={handleChange}
                  placeholder="清晰、具体地描述你想咨询的问题。例如：'我是否应该接受这份新工作？' 或 '近期感情发展如何？'"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                  required
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  问题越具体，解读越精准。保持心态平和，心诚则灵。
                </p>
              </div>

              {/* Method Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <Target className="inline w-5 h-5 mr-2 text-amber-600" />
                  占卜方法
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {methods.map(method => (
                    <label
                      key={method.value}
                      className="cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="method"
                        value={method.value}
                        checked={divinationData.method === method.value}
                        onChange={handleRadioChange}
                        className="sr-only"
                      />
                      <div className={`h-full p-4 rounded-xl border transition-all ${
                        divinationData.method === method.value
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                          : 'border-gray-300 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700'
                      }`}>
                        <div className="flex items-center mb-2">
                          <div className={`p-2 rounded-lg ${
                            divinationData.method === method.value
                              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                          }`}>
                            {method.icon}
                          </div>
                          <span className="ml-2 font-medium">{method.label}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {method.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  高级选项
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      关注领域（可选）
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {focusOptions.map(option => (
                        <label
                          key={option.value}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={divinationData.focusAreas.includes(option.value)}
                            onChange={() => toggleFocusArea(option.value)}
                            className="mr-2 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      选择关注领域可以帮助AI提供更针对性的解读
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !divinationData.question.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    正在摇卦解读...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    开始周易占卜
                  </div>
                )}
              </button>

              {/* Philosophy Note */}
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-300 text-center">
                  《周易》是变化之学，不是宿命之书。卦象提供启示，选择在于自己。
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* IChing Principles */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-amber-600" />
              占卜原则
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  不疑不占：有具体问题再占卜
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  不戏不占：保持严肃认真的态度
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  不二不占：同一问题不重复占卜
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  卦象是地图，你才是司机
                </span>
              </li>
            </ul>
          </div>

          {/* Common Questions */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-900/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💡 常见问题类型
            </h3>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-gray-900 dark:text-white">事业决策</div>
                <div className="text-gray-600 dark:text-gray-400">是否换工作、项目选择等</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900 dark:text-white">感情关系</div>
                <div className="text-gray-600 dark:text-gray-400">婚姻感情、人际关系等</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900 dark:text-white">人生方向</div>
                <div className="text-gray-600 dark:text-gray-400">重大选择、发展方向等</div>
              </div>
            </div>
          </div>

          {/* Timing */}
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-amber-600" />
              最佳时机
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 心境平和时进行占卜</li>
              <li>• 避免情绪激动时占卜</li>
              <li>• 同一问题间隔一段时间</li>
              <li>• 重大决策前可作参考</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            周易占卜原理
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white">
                <Book className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">64卦系统</h3>
              <p className="text-gray-600 dark:text-gray-400">
                基于《周易》64卦经典，涵盖人生各种情境
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white">
                <Circle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">阴阳爻变</h3>
              <p className="text-gray-600 dark:text-gray-400">
                六爻变化生成卦象，老阴老阳产生变卦
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">AI解读</h3>
              <p className="text-gray-600 dark:text-gray-400">
                DeepSeek AI结合经典提供个性化解读
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center text-white">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">实用指引</h3>
              <p className="text-gray-600 dark:text-gray-400">
                提供具体建议，强调人的主观能动性
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          《周易》智慧：变易·简易·不易
        </h3>
        <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
          世界在变化（变易），规律可把握（简易），有些原则永恒（不易）。
          占卜不是为了预测命运，而是为了理解变化、把握时机、做出明智选择。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-full bg-white text-amber-600 font-semibold hover:bg-amber-50 transition-colors">
            了解更多周易知识
          </button>
          <button className="px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors">
            开始你的第一次占卜
          </button>
        </div>
      </div>
    </div>
  )
}