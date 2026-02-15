import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '灵犀AI - 你的AI星座伙伴',
  description: '融合AI大模型与传统玄学的下一代情感陪伴与自我探索平台',
  keywords: ['星座', 'AI', '占卜', '周易', '情感陪护', '灵犀AI'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-mystic-50 to-primary-50 dark:from-gray-900 dark:to-gray-950`}>
        <div className="relative min-h-screen">
          {/* 星空背景效果 */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-6xl">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}