import { AstrologyChart, AIAnalysis } from '@/types/astrology'

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

// 构建AI分析提示词
function buildAnalysisPrompt(chart: AstrologyChart, userName: string): string {
  return `你是一位专业的占星师和心理分析师。请根据以下星盘信息，为用户"${userName}"提供全面、深入、个性化的分析。

星盘信息：
- 太阳星座：${chart.sunSign}
- 月亮星座：${chart.moonSign}
- 上升星座：${chart.risingSign}
- 主导元素：${chart.dominantElement}
- 主导模式：${chart.dominantModality}

行星位置：
${chart.planets.map(p => `  - ${p.planet}: ${p.sign} (${p.signChinese}) 第${p.house}宫`).join('\n')}

重要相位：
${chart.aspects.map(a => `  - ${a.planet1}与${a.planet2}形成${a.aspect}相位，影响：${a.influence}`).join('\n')}

请按照以下结构提供分析：

1. 性格分析
   - 核心优势（基于太阳、月亮、上升星座）
   - 潜在挑战（基于困难相位和宫位）
   - 内在动机（基于行星配置）

2. 人际关系
   - 沟通风格（基于水星和金星）
   - 情感需求（基于月亮和金星）
   - 相处建议（基于第七宫和相位）

3. 事业发展
   - 适合领域（基于第十宫和土星）
   - 工作风格（基于火星和第六宫）
   - 成长机会（基于木星和幸运点）

4. 人生课题
   - 当前阶段重点（基于行运和年龄）
   - 关键成长领域（基于北交点）
   - 需要注意的周期（基于土星回归等）

5. 实用建议
   - 近期可采取的行动
   - 需要避免的模式
   - 自我提升的方向

要求：
1. 分析要具体、个性化，避免泛泛而谈
2. 结合心理学知识，提供可操作的见解
3. 语气温暖、专业、富有启发性
4. 避免宿命论，强调个人选择和成长
5. 用中文回复，适当使用占星术语但解释清楚

请开始你的分析：`
}

// 调用DeepSeek API进行分析
export async function analyzeAstrologyChart(
  chart: AstrologyChart,
  userName: string
): Promise<AIAnalysis> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  
  if (!apiKey) {
    console.warn('DeepSeek API key not found, using mock analysis')
    return generateMockAnalysis(chart)
  }

  try {
    const prompt = buildAnalysisPrompt(chart, userName)
    
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的占星师和心理分析师，擅长将占星知识与现代心理学结合，为用户提供深刻、实用、个性化的指导。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    const analysisText = data.choices[0]?.message?.content
    
    // 解析AI返回的文本为结构化数据
    return parseAIAnalysis(analysisText)
    
  } catch (error) {
    console.error('Error calling DeepSeek API:', error)
    return generateMockAnalysis(chart)
  }
}

// 解析AI返回的文本为结构化数据
function parseAIAnalysis(text: string): AIAnalysis {
  // 简化解析逻辑，实际需要更复杂的文本解析
  const lines = text.split('\n').filter(line => line.trim())
  
  return {
    personality: {
      strengths: extractSection(lines, '核心优势', 3),
      challenges: extractSection(lines, '潜在挑战', 3),
      coreMotivation: extractFirstLine(lines, '内在动机')
    },
    relationships: {
      compatibility: extractFirstLine(lines, '沟通风格'),
      communicationStyle: extractFirstLine(lines, '情感需求'),
      emotionalNeeds: extractFirstLine(lines, '相处建议')
    },
    career: {
      suitableFields: extractSection(lines, '适合领域', 3),
      workStyle: extractFirstLine(lines, '工作风格'),
      potentialChallenges: extractFirstLine(lines, '成长机会')
    },
    lifePath: {
      currentPhase: extractFirstLine(lines, '当前阶段重点'),
      keyThemes: extractSection(lines, '关键成长领域', 3),
      growthOpportunities: extractSection(lines, '需要注意的周期', 2)
    },
    advice: {
      immediate: extractSection(lines, '近期可采取的行动', 3),
      longTerm: extractSection(lines, '需要避免的模式', 2),
      warning: extractSection(lines, '自我提升的方向', 2)
    }
  }
}

// 辅助函数：提取特定部分
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
      // 遇到下一个章节，停止
      break
    }
  }
  
  return items.length > 0 ? items : [`${keyword}需要进一步探索`]
}

function extractFirstLine(lines: string[], keyword: string): string {
  for (const line of lines) {
    if (line.includes(keyword)) {
      const nextLine = lines[lines.indexOf(line) + 1]
      if (nextLine && nextLine.trim()) {
        return nextLine.trim()
      }
    }
  }
  return `${keyword}需要个性化分析`
}

// 生成模拟分析（用于开发和测试）
function generateMockAnalysis(chart: AstrologyChart): AIAnalysis {
  return {
    personality: {
      strengths: ['富有创造力', '直觉敏锐', '善于沟通'],
      challenges: ['容易情绪化', '决策犹豫', '完美主义倾向'],
      coreMotivation: '寻求深度连接和意义感'
    },
    relationships: {
      compatibility: '与风象星座（双子、天秤、水瓶）有良好互动',
      communicationStyle: '感性而直接，重视情感共鸣',
      emotionalNeeds: '需要安全感和被理解的感觉'
    },
    career: {
      suitableFields: ['心理咨询', '艺术创作', '教育行业'],
      workStyle: '注重细节，追求完美，善于团队合作',
      potentialChallenges: '需要学会平衡理想与现实'
    },
    lifePath: {
      currentPhase: '自我探索和身份建立期',
      keyThemes: ['个人成长', '关系深化', '职业定位'],
      growthOpportunities: ['发展专业技能', '建立健康边界', '培养耐心']
    },
    advice: {
      immediate: ['记录每日情绪变化', '尝试冥想练习', '与信任的人分享感受'],
      longTerm: ['建立规律的生活作息', '培养一项创造性爱好', '定期自我反思'],
      warning: ['避免过度自我批评', '注意情绪波动周期', '谨慎重大财务决策']
    }
  }
}