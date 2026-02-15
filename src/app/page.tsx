import { BirthDateForm } from '@/components/forms/BirthDateForm'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { Sparkles, Moon, Heart, Brain, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 animate-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              灵犀AI
            </span>
            <br />
            <span className="text-3xl md:text-5xl font-normal text-gray-700 dark:text-gray-300">
              你的AI星座伙伴
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            全球首个深度融合AI大模型、传统玄学与科学心理学的下一代情感陪伴与自我探索平台
          </p>
        </div>

        {/* Birth Date Form */}
        <div className="max-w-2xl mx-auto">
          <BirthDateForm />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-800/50">
            <div className="text-3xl font-bold text-purple-600">99%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">解读准确率</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-800/50">
            <div className="text-3xl font-bold text-pink-600">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">全天候陪伴</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-800/50">
            <div className="text-3xl font-bold text-blue-600">50万+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">用户信任</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-800/50">
            <div className="text-3xl font-bold text-indigo-600">AI原生</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">技术驱动</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            核心功能
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            超越传统星座APP的静态报告模式，提供可解释、可互动、可成长的个性化体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="AI星盘解读"
            description="基于出生日期生成个性化星盘分析，结合DeepSeek AI提供深度解读"
            gradient="from-purple-500 to-pink-500"
            href="/astrology"
          />
          <FeatureCard
            icon={<Moon className="w-8 h-8" />}
            title="梦境解析"
            description="融合心理学与玄学，解读梦境背后的潜意识信息"
            gradient="from-blue-500 to-cyan-500"
            href="/dream"
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="周易占卜"
            description="AI周易大师，基于《易经》提供智慧指引"
            gradient="from-green-500 to-emerald-500"
            href="/iching"
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8" />}
            title="情感陪护"
            description="24小时在线AI伙伴，倾听、理解、陪伴"
            gradient="from-red-500 to-orange-500"
            href="/companion"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="每日运势"
            description="个性化运势推送，结合实时星象变化"
            gradient="from-yellow-500 to-amber-500"
            href="/fortune"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="隐私保护"
            description="端到端加密，你的数据只属于你"
            gradient="from-gray-500 to-slate-500"
            href="/privacy"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            如何使用
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">输入信息</h3>
              <p className="text-gray-600 dark:text-gray-400">
                提供你的出生日期、时间和地点，生成专属星盘
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">AI分析</h3>
              <p className="text-gray-600 dark:text-gray-400">
                DeepSeek AI结合专业玄学知识，生成个性化解读
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">深度互动</h3>
              <p className="text-gray-600 dark:text-gray-400">
                与AI进行多轮对话，探索更多细节和个性化建议
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            准备好开始你的探索之旅了吗？
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            加入50万+用户，体验AI驱动的个性化玄学服务
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
            免费开始体验
          </button>
          <button className="px-8 py-3 rounded-full border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            了解更多功能
          </button>
        </div>
      </section>
    </div>
  )
}