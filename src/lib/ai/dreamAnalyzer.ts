import { DreamAnalysisRequest, DreamInterpretation, DreamSymbol } from '@/types/dream'

const DREAM_SYMBOLS_DB = {
  water: {
    psychological: ['情绪、潜意识、流动性情感'],
    esoteric: ['净化、重生、生命之源'],
    cultural: ['财运（东方）、情感波动（西方）']
  },
  flying: {
    psychological: ['渴望自由、逃避现实、成就感'],
    esoteric: ['灵魂出窍、精神提升、超越限制'],
    cultural: ['好运（通用）、事业上升（东方）']
  },
  falling: {
    psychological: ['失控感、焦虑、缺乏安全感'],
    esoteric: ['警告、需要接地、转变前夕'],
    cultural: ['失势（通用）、需要注意（东方）']
  },
  teeth: {
    psychological: ['焦虑、自我形象、沟通困难'],
    esoteric: ['生命力、健康预警、人际关系'],
    cultural: ['亲人健康（东方）、压力过大（西方）']
  },
  snake: {
    psychological: ['转变、恐惧、潜意识智慧'],
    esoteric: ['治愈、重生、神秘力量'],
    cultural: ['财运（东方）、智慧（西方）']
  },
  exam: {
    psychological: ['压力、自我评估、准备不足感'],
    esoteric: ['人生考验、成长机会、业力'],
    cultural: ['事业考核（通用）、需要学习（东方）']
  },
  death: {
    psychological: ['结束、转变、重生'],
    esoteric: ['重大转变、旧我死亡、新开始'],
    cultural: ['好运（东方）、转变（西方）']
  },
  money: {
    psychological: ['自我价值、安全感、资源'],
    esoteric: ['能量交换、丰盛、价值体现'],
    cultural: ['财运（东方）、成功（西方）']
  }
}

// 提取梦境中的符号
export function extractDreamSymbols(dreamText: string): string[] {
  const symbols: string[] = []
  const text = dreamText.toLowerCase()
  
  Object.keys(DREAM_SYMBOLS_DB).forEach(symbol => {
    if (text.includes(symbol)) {
      symbols.push(symbol)
    }
  })
  
  // 添加一些通用符号检测
  if (text.includes('飞') || text.includes('fly') || text.includes('flying')) {
    if (!symbols.includes('flying')) symbols.push('flying')
  }
  
  if (text.includes('水') || text.includes('water') || text.includes('sea') || text.includes('river')) {
    if (!symbols.includes('water')) symbols.push('water')
  }
  
  if (text.includes('考试') || text.includes('exam') || text.includes('test')) {
    if (!symbols.includes('exam')) symbols.push('exam')
  }
  
  if (text.includes('牙齿') || text.includes('tooth') || text.includes('teeth')) {
    if (!symbols.includes('teeth')) symbols.push('teeth')
  }
  
  return symbols.length > 0 ? symbols : ['universal'] // 如果没有识别到具体符号，使用通用
}

// 构建AI提示词
export function buildDreamAnalysisPrompt(
  request: DreamAnalysisRequest,
  symbols: string[]
): string {
  return `你是一位专业的梦境分析师，精通心理学（弗洛伊德、荣格）和东西方解梦传统（周公解梦、西方解梦）。

请分析以下梦境：

梦境内容："${request.dream}"
梦者情绪：${request.emotion}
重复出现：${request.recurring ? '是' : '否'}
识别到的符号：${symbols.join(', ')}

${request.context ? `相关背景：${JSON.stringify(request.context)}` : ''}

请按照以下结构提供分析：

1. 心理学视角
   - 弗洛伊德精神分析（欲望、压抑、象征）
   - 荣格分析心理学（原型、集体无意识、个体化）
   - 现代心理学解读（认知、情绪、行为）

2. 玄学视角
   - 西方解梦传统（经典符号解读）
   - 东方解梦传统（周公解梦智慧）
   - 跨文化通用符号

3. 个性化建议
   - 基于梦境符号的具体含义
   - 可操作的行动建议
   - 需要注意的预警

4. 综合摘要
   - 用一段话总结核心信息
   - 指出最可能的潜意识信息
   - 提供成长或疗愈方向

要求：
1. 分析要具体、有深度，避免泛泛而谈
2. 结合梦者情绪状态调整语气
3. 提供实用、可操作的建议
4. 用中文回复，专业但易懂
5. 避免恐吓或绝对化的语言

请开始你的分析：`
}

// 解析AI返回的梦境分析
export function parseDreamAnalysis(aiResponse: string): DreamInterpretation {
  const lines = aiResponse.split('\n').filter(line => line.trim())
  
  return {
    psychological: {
      freudian: extractSection(lines, '弗洛伊德', 3),
      jungian: extractSection(lines, '荣格', 3),
      modern: extractSection(lines, '现代心理学', 3)
    },
    esoteric: {
      western: extractSection(lines, '西方解梦', 3),
      eastern: extractSection(lines, '东方解梦', 3),
      universal: extractSection(lines, '通用符号', 3)
    },
    personalized: {
      basedOnChart: extractSection(lines, '基于', 2),
      basedOnHistory: extractSection(lines, '历史', 2),
      actionableAdvice: extractSection(lines, '行动建议', 3)
    },
    summary: extractSummary(lines),
    confidence: 0.85 // 模拟置信度
  }
}

// 获取符号详细信息
export function getSymbolDetails(symbols: string[]): DreamSymbol[] {
  return symbols.map(symbol => {
    const dbSymbol = DREAM_SYMBOLS_DB[symbol as keyof typeof DREAM_SYMBOLS_DB]
    
    return {
      symbol,
      meanings: dbSymbol || {
        psychological: ['需要进一步分析'],
        esoteric: ['需要进一步分析'],
        cultural: ['需要进一步分析']
      },
      frequency: Math.floor(Math.random() * 100) + 1,
      emotionAssociation: ['mixed']
    }
  })
}

// 辅助函数
function extractSection(lines: string[], keyword: string, maxItems: number): string[] {
  const items: string[] = []
  let found = false
  
  for (const line of lines) {
    if (line.includes(keyword)) {
      found = true
      continue
    }
    
    if (found && line.trim().startsWith('-')) {
      const item = line.trim().substring(1).trim()
      if (item) items.push(item)
      if (items.length >= maxItems) break
    } else if (found && line.trim() && !line.trim().startsWith('-')) {
      break
    }
  }
  
  return items.length > 0 ? items : [`${keyword}视角需要更多信息`]
}

function extractSummary(lines: string[]): string {
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('综合摘要') || lines[i].includes('总结') || lines[i].includes('核心信息')) {
      if (i + 1 < lines.length) {
        return lines[i + 1].trim()
      }
    }
  }
  
  return '梦境反映了潜意识的某些信息，建议结合近期生活状态进行反思。'
}

// 模拟AI分析（用于开发和测试）
export function generateMockDreamAnalysis(request: DreamAnalysisRequest): DreamInterpretation {
  const symbols = extractDreamSymbols(request.dream)
  
  return {
    psychological: {
      freudian: [
        '可能反映了被压抑的欲望或情感',
        '象征性的满足某种心理需求',
        '需要关注梦境中的象征元素'
      ],
      jungian: [
        '触及集体无意识中的原型',
        '个体化进程的反映',
        '自我整合的象征'
      ],
      modern: [
        '与近期压力或情绪状态相关',
        '认知处理日常信息的方式',
        '情绪调节机制的体现'
      ]
    },
    esoteric: {
      western: [
        '传统西方解梦符号的体现',
        '可能预示某些生活变化',
        '需要注意的象征意义'
      ],
      eastern: [
        '东方智慧对梦境的解读',
        '可能反映身体健康状态',
        '人际关系或财运的暗示'
      ],
      universal: [
        '跨文化共同的梦境象征',
        '人类共同的潜意识表达',
        '普遍的心理现象'
      ]
    },
    personalized: {
      basedOnChart: ['结合你的个人特质，这个梦可能反映了...'],
      basedOnHistory: ['与你近期的经历有相关性'],
      actionableAdvice: [
        '记录梦境细节',
        '反思近期情绪变化',
        '考虑与信任的人讨论'
      ]
    },
    summary: `这个${request.emotion}的梦境反映了你在${symbols.join('、')}相关领域的潜意识活动，建议关注近期在这些方面的感受和经历。`,
    confidence: 0.8
  }
}