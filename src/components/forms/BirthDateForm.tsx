'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BirthDateForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    gender: 'unknown' as 'male' | 'female' | 'unknown'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // 这里会调用API生成星盘
      const response = await fetch('/api/astrology/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const data = await response.json()
        // 使用sessionStorage存储数据，避免URL过长
        const sessionId = `astrology_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem(sessionId, JSON.stringify(data))
        // 跳转到结果页面，只传递sessionId
        router.push(`/astrology/result?sessionId=${sessionId}`)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mystic-gradient mb-2">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            输入你的出生信息
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            生成专属AI星盘解读，探索你的性格、运势与人生课题
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              你的昵称
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="请输入你的昵称"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Birth Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                出生日期
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="inline w-4 h-4 mr-2" />
                出生时间
              </label>
              <input
                type="time"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                如不清楚具体时间，可留空
              </p>
            </div>
          </div>

          {/* Birth Place */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              出生地点
            </label>
            <input
              type="text"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              placeholder="例如：北京、上海、广州"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              性别（可选）
            </label>
            <div className="flex space-x-4">
              {[
                { value: 'male', label: '男' },
                { value: 'female', label: '女' },
                { value: 'unknown', label: '保密' }
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={value}
                    checked={formData.gender === value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`px-4 py-3 rounded-xl text-center border transition-all ${
                    formData.gender === value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                      : 'border-gray-300 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}>
                    {label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                正在生成你的专属星盘...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2" />
                开始AI星盘解读
              </div>
            )}
          </button>

          {/* Privacy Note */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            你的信息将受到严格保护，仅用于生成个性化解读
          </p>
        </form>
      </div>
    </div>
  )
}