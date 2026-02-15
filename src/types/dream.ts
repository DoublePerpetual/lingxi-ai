export interface DreamRecord {
  id: string
  userId?: string
  content: string
  emotion: 'happy' | 'anxious' | 'confused' | 'peaceful' | 'fearful' | 'excited'
  recurring: boolean
  symbols: string[]
  interpretation: DreamInterpretation
  createdAt: string
  updatedAt: string
  userRating?: number // 1-5分，用户对解读的评分
}

export interface DreamInterpretation {
  psychological: {
    freudian: string[] // 弗洛伊德视角
    jungian: string[]  // 荣格视角
    modern: string[]   // 现代心理学视角
  }
  esoteric: {
    western: string[]  // 西方解梦传统
    eastern: string[]  // 东方解梦传统（周公解梦）
    universal: string[] // 通用符号解读
  }
  personalized: {
    basedOnChart: string[] // 基于用户星盘
    basedOnHistory: string[] // 基于历史记录
    actionableAdvice: string[] // 可操作建议
  }
  summary: string // 综合解读摘要
  confidence: number // 解读置信度 0-1
}

export interface DreamSymbol {
  symbol: string
  meanings: {
    psychological: string[]
    esoteric: string[]
    cultural: string[] // 文化特定含义
  }
  frequency: number // 在数据库中出现的频率
  emotionAssociation: string[] // 关联的情绪
}

export interface DreamAnalysisRequest {
  dream: string
  emotion: DreamRecord['emotion']
  recurring: boolean
  context?: {
    recentEvents?: string[]
    currentConcerns?: string[]
    sleepQuality?: 'good' | 'average' | 'poor'
  }
}

export interface DreamAnalysisResponse {
  interpretation: DreamInterpretation
  symbols: DreamSymbol[]
  relatedDreams?: string[] // 相关的历史梦境
  nextSteps: string[] // 下一步建议
  sessionId: string
}