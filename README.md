# 灵犀AI - AI星座、占卜、周易与情感陪护平台

![灵犀AI](https://img.shields.io/badge/灵犀AI-AI星座平台-purple)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![DeepSeek](https://img.shields.io/badge/DeepSeek-AI集成-green)

## 🎯 项目概述

**灵犀AI**是全球首个深度融合AI大模型、传统玄学（星座、周易）与科学心理学的下一代情感陪伴与自我探索平台。本项目以AI原生思维进行彻底重构，旨在解决现代人在快节奏、高压社会下的深层情感需求。

### 核心价值
- **超个性化叙事**：超越静态报告，基于用户实时对话与行为数据生成动态人生叙事
- **可信的深度互动**：构建兼具玄学专业深度与情感共情能力的AI伙伴
- **跨文化智慧融合**：首创性将东西方命理体系在AI逻辑层面进行桥接

## 🚀 1.0版本功能

### 核心功能
- ✅ **AI星盘解读**：输入出生信息 → 生成个性化星盘 → DeepSeek AI深度分析
- ✅ **响应式界面**：现代化设计，支持深色/浅色模式
- ✅ **实时交互**：与AI进行多轮对话，探索更多细节
- ✅ **数据安全**：端到端加密，用户隐私保护

### 技术栈
- **前端**: Next.js 15 + TypeScript + Tailwind CSS
- **AI集成**: DeepSeek API + 自定义提示词工程
- **部署**: Vercel (自动部署)
- **开发工具**: AI辅助编程 (Cursor/GitHub Copilot)

## 📁 项目结构

```
lingxi-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API路由
│   │   │   └── astrology/     # 星盘分析API
│   │   ├── astrology/         # 星盘页面
│   │   └── page.tsx           # 首页
│   ├── components/            # React组件
│   │   ├── forms/            # 表单组件
│   │   ├── layout/           # 布局组件
│   │   └── ui/               # UI组件
│   ├── lib/                  # 工具函数
│   │   ├── ai/               # AI集成
│   │   └── utils/            # 工具函数
│   └── types/                # TypeScript类型定义
├── public/                   # 静态资源
└── package.json             # 依赖配置
```

## 🛠️ 快速开始

### 1. 环境准备
```bash
# 克隆项目
git clone <your-repo-url>
cd lingxi-ai

# 安装依赖
npm install
```

### 2. 配置环境变量
```bash
# 复制环境变量示例
cp .env.example .env.local

# 编辑 .env.local，添加你的DeepSeek API密钥
DEEPSEEK_API_KEY=sk-your-actual-api-key
```

### 3. 获取DeepSeek API密钥
1. 访问 [DeepSeek官网](https://platform.deepseek.com/)
2. 注册账号并登录
3. 在API Keys页面创建新密钥
4. 复制密钥到 `.env.local` 文件

### 4. 启动开发服务器
```bash
npm run dev
```
访问 http://localhost:3000

## 🔧 开发指南

### API使用
```typescript
// 星盘分析API
POST /api/astrology/analyze

// 请求体
{
  "name": "用户昵称",
  "birthDate": "1990-01-01",
  "birthTime": "12:00",
  "birthPlace": "北京",
  "gender": "male"
}

// 响应
{
  "chart": { /* 星盘数据 */ },
  "analysis": { /* AI分析结果 */ },
  "timestamp": "2026-02-15T03:00:00Z",
  "sessionId": "astrology_123456789"
}
```

### 添加新功能
1. 在 `src/types/` 中添加类型定义
2. 在 `src/lib/` 中添加业务逻辑
3. 在 `src/components/` 中添加UI组件
4. 在 `src/app/` 中添加页面路由

## 🌐 部署到Vercel

### 1. 推送到GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/lingxi-ai.git
git push -u origin main
```

### 2. Vercel部署
1. 访问 [Vercel](https://vercel.com)
2. 导入GitHub仓库
3. 配置环境变量：
   - `DEEPSEEK_API_KEY`: 你的DeepSeek API密钥
   - `NEXT_PUBLIC_SITE_URL`: 你的Vercel部署URL
4. 点击部署

### 3. 自定义域名（可选）
1. 在Vercel项目设置中添加自定义域名
2. 配置DNS记录指向Vercel
3. 等待SSL证书自动签发

## 📈 后续版本规划

### Version 1.5 (3个月内)
- [ ] 梦境解析功能
- [ ] 用户系统（登录/注册）
- [ ] 对话历史记录
- [ ] 移动端优化

### Version 2.0 (6个月内)
- [ ] 周易占卜功能
- [ ] 情感陪护AI
- [ ] 付费订阅系统
- [ ] 社区功能

### Version 3.0 (12个月内)
- [ ] 多语言支持
- [ ] 移动应用
- [ ] 企业API服务
- [ ] 数据洞察报告

## 🤝 贡献指南

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- **项目主页**: https://lingxi-ai.vercel.app
- **问题反馈**: [GitHub Issues](https://github.com/yourusername/lingxi-ai/issues)
- **商务合作**: contact@lingxi.ai

## ⚠️ 免责声明

本平台所有内容仅供娱乐与自我探索参考，不构成专业建议。用户应理性对待分析结果，结合实际情况做出决策。对于因使用本平台而产生的任何直接或间接损失，开发者不承担任何责任。

---

**星辰大海，AI相伴** ✨