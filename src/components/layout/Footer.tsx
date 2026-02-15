import { Heart, Github, Twitter, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full mystic-gradient flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                灵犀AI
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              融合AI大模型与传统玄学的下一代情感陪伴与自我探索平台
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">产品功能</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">
                  AI星盘解读
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">
                  梦境解析
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">
                  周易占卜
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">
                  情感陪护
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">法律声明</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">
                  服务条款
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">
                  免责声明
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400 text-sm">
                商务合作: contact@lingxi.ai
              </li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">
                用户反馈: feedback@lingxi.ai
              </li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">
                工作时间: 周一至周五 9:00-18:00
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-800/50 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by 灵犀AI团队
            <span className="mx-2">•</span>
            © 2026 灵犀AI. All rights reserved.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
            本平台内容仅供娱乐与自我探索参考，不构成专业建议
          </p>
        </div>
      </div>
    </footer>
  )
}