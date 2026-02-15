import { IChingRequest, IChingHexagram, HexagramLine, HEXAGRAMS } from '@/types/iching'

// 生成随机爻线（模拟摇卦）
export function generateHexagramLines(method: 'coins' | 'yarrow' | 'digital' = 'digital'): HexagramLine[] {
  const lines: HexagramLine[] = []
  
  for (let i = 1; i <= 6; i++) {
    // 随机生成爻值：6(老阴), 7(少阳), 8(少阴), 9(老阳)
    const randomValue = Math.random()
    let value: 6 | 7 | 8 | 9
    
    if (randomValue < 0.1) {
      value = 6 // 老阴 (10%)
    } else if (randomValue < 0.4) {
      value = 7 // 少阳 (30%)
    } else if (randomValue < 0.7) {
      value = 8 // 少阴 (30%)
    } else {
      value = 9 // 老阳 (30%)
    }
    
    lines.push({
      position: i,
      value,
      isChanging: value === 6 || value === 9, // 老阴老阳为变爻
      meaning: getLineMeaning(i, value),
      interpretation: getLineInterpretation(i, value)
    })
  }
  
  return lines
}

// 根据爻线生成卦象
export function generateHexagram(lines: HexagramLine[]): IChingHexagram {
  // 将爻线转换为二进制（阳爻为1，阴爻为0）
  const binary = lines.map(line => 
    line.value === 7 || line.value === 9 ? '1' : '0'
  ).reverse().join('') // 从下往上，但二进制表示从上往下
  
  // 简化的卦象匹配，实际需要完整64卦数据库
  let hexagramNumber = 1
  
  if (binary === '111111') {
    hexagramNumber = 1 // 乾
  } else if (binary === '000000') {
    hexagramNumber = 2 // 坤
  } else if (binary === '000111') {
    hexagramNumber = 11 // 泰
  } else if (binary === '111000') {
    hexagramNumber = 12 // 否
  } else {
    // 随机选择一个卦
    hexagramNumber = Math.floor(Math.random() * 64) + 1
  }
  
  const baseHexagram = HEXAGRAMS.find(h => h.number === hexagramNumber) || HEXAGRAMS[0]
  
  return {
    ...baseHexagram,
    lines,
    changingTo: getChangingHexagram(lines)
  }
}

// 获取变卦
function getChangingHexagram(lines: HexagramLine[]): number | undefined {
  const changingLines = lines.filter(line => line.isChanging)
  
  if (changingLines.length === 0) {
    return undefined
  }
  
  // 简化的变卦逻辑：如果有变爻，变到对应的卦
  // 实际易经中，变卦规则更复杂
  const changingBinary = lines.map(line => {
    if (line.isChanging) {
      // 老阴变阳，老阳变阴
      return line.value === 6 ? '1' : '0'
    }
    return line.value === 7 || line.value === 9 ? '1' : '0'
  }).reverse().join('')
  
  // 简化的变卦匹配
  if (changingBinary === '111111') return 1
  if (changingBinary === '000000') return 2
  if (changingBinary === '000111') return 11
  if (changingBinary === '111000') return 12
  
  return Math.floor(Math.random() * 64) + 1
}

// 获取爻辞（简化版）
function getLineMeaning(position: number, value: 6 | 7 | 8 | 9): string {
  const meanings: Record<number, Record<6 | 7 | 8 | 9, string>> = {
    1: {
      6: '初六：履霜，坚冰至。',
      7: '初九：潜龙勿用。',
      8: '初六：履霜，坚冰至。',
      9: '初九：潜龙勿用。'
    },
    2: {
      6: '六二：直方大，不习无不利。',
      7: '九二：见龙在田，利见大人。',
      8: '六二：直方大，不习无不利。',
      9: '九二：见龙在田，利见大人。'
    },
    3: {
      6: '六三：含章可贞，或从王事，无成有终。',
      7: '九三：君子终日乾乾，夕惕若厉，无咎。',
      8: '六三：含章可贞，或从王事，无成有终。',
      9: '九三：君子终日乾乾，夕惕若厉，无咎。'
    },
    4: {
      6: '六四：括囊，无咎无誉。',
      7: '九四：或跃在渊，无咎。',
      8: '六四：括囊，无咎无誉。',
      9: '九四：或跃在渊，无咎。'
    },
    5: {
      6: '六五：黄裳，元吉。',
      7: '九五：飞龙在天，利见大人。',
      8: '六五：黄裳，元吉。',
      9: '九五：飞龙在天，利见大人。'
    },
    6: {
      6: '上六：龙战于野，其血玄黄。',
      7: '上九：亢龙有悔。',
      8: '上六：龙战于野，其血玄黄。',
      9: '上九：亢龙有悔。'
    }
  }
  
  return meanings[position]?.[value] || '爻辞待解读'
}

// 获取爻的解读
function getLineInterpretation(position: number, value: 6 | 7 | 8 | 9): string {
  const interpretations: Record<number, Record<6 | 7 | 8 | 9, string>> = {
    1: {
      6: '初始阶段，阴气渐盛，需防微杜渐',
      7: '潜藏时期，积蓄力量，等待时机',
      8: '阴柔开始，谨慎行事',
      9: '阳气初现，积极准备'
    },
    2: {
      6: '柔顺中正，自然发展',
      7: '才能显现，得到认可',
      8: '保持本色，无需刻意',
      9: '展现能力，获得支持'
    },
    3: {
      6: '内含美德，可守正道',
      7: '勤奋谨慎，避免过失',
      8: '才华内敛，顺其自然',
      9: '日夜努力，警惕危险'
    },
    4: {
      6: '谨慎收敛，明哲保身',
      7: '或进或退，把握时机',
      8: '低调行事，避免是非',
      9: '审时度势，灵活应对'
    },
    5: {
      6: '居中守正，大吉大利',
      7: '达到巅峰，大有作为',
      8: '温和谦逊，获得吉祥',
      9: '位极之时，需防过亢'
    },
    6: {
      6: '至极而变，冲突难免',
      7: '过高则危，知进知退',
      8: '极端情况，需要转变',
      9: '盛极必衰，及时调整'
    }
  }
  
  return interpretations[position]?.[value] || '需要结合整体卦象解读'
}

// 构建AI提示词
export function buildIChingPrompt(
  request: IChingRequest,
  hexagram: IChingHexagram,
  changingHexagram?: IChingHexagram
): string {
  return `你是一位精通《周易》的专家，请根据以下卦象为用户的问题提供专业解读。

用户问题："${request.question}"
${request.focusAreas ? `关注领域：${request.focusAreas.join('、')}` : ''}

主卦：${hexagram.chineseName}卦（${hexagram.name}）
卦象：${hexagram.symbol}
卦辞：${hexagram.judgment}
象传：${hexagram.image}

${changingHexagram ? `
变卦：${changingHexagram.chineseName}卦（${changingHexagram.name}）
变卦卦辞：${changingHexagram.judgment}
` : ''}

爻线情况（从下往上）：
${hexagram.lines.map(line => 
  `第${line.position}爻：${line.value}（${line.value === 6 ? '老阴' : line.value === 7 ? '少阳' : line.value === 8 ? '少阴' : '老阳'}）${line.isChanging ? '(变爻)' : ''}`
).join('\n')}

${hexagram.lines.filter(line => line.isChanging).length > 0 ? `
变爻爻辞：
${hexagram.lines.filter(line => line.isChanging).map(line => 
  `第${line.position}爻：${line.meaning}`
).join('\n')}
` : ''}

请按照以下结构提供专业解读：

1. 总体卦象解读
   - 结合用户问题分析主卦含义
   - 解释卦象的象征意义
   - 指出整体吉凶趋势

2. 爻线详细分析
   - 重点分析变爻（如有）
   - 解释各爻的位置意义
   - 结合用户情境的具体建议

3. 变卦启示（如有变卦）
   - 变卦对主卦的补充
   - 发展趋势的变化
   - 需要注意的转折点

4. 实用建议
   - 针对用户问题的具体行动建议
   - 最佳时机选择
   - 需要避免的风险

5. 综合结论
   - 用一段话总结核心启示
   - 指出最关键的要点
   - 提供心态调整建议

要求：
1. 解读要专业、深入，引用经典但不晦涩
2. 结合用户问题和关注领域提供个性化建议
3. 保持客观中立，避免绝对化的预言
4. 用中文回复，语言优美但易懂
5. 强调人的主观能动性和道德修养

请开始你的专业解读：`
}

// 解析AI返回的周易解读
export function parseIChingAnalysis(aiResponse: string, hexagram: IChingHexagram) {
  const lines = aiResponse.split('\n').filter(line => line.trim())
  
  return {
    overview: extractSection(lines, '总体卦象解读', 1)[0] || '卦象反映了当前的情境和趋势',
    currentSituation: extractSection(lines, '结合用户', 1)[0] || '需要结合具体问题分析',
    advice: extractSection(lines, '具体行动建议', 3),
    warning: extractSection(lines, '需要避免', 2),
    timing: extractSection(lines, '最佳时机', 1)[0] || '需要审时度势'
  }
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
  
  return items.length > 0 ? items : [`${keyword}需要结合具体卦象分析`]
}

// 生成模拟解读（用于开发和测试）
export function generateMockIChingReading(request: IChingRequest) {
  const lines = generateHexagramLines(request.method)
  const hexagram = generateHexagram(lines)
  const changingLines = lines.filter(line => line.isChanging)
  
  return {
    overview: `${hexagram.chineseName}卦反映了${hexagram.meaning.overall}的态势`,
    currentSituation: hexagram.meaning.situation,
    advice: [
      hexagram.meaning.advice,
      '保持心态平和，顺势而为',
      '注重道德修养和人际关系'
    ],
    warning: [
      hexagram.meaning.warning,
      '避免极端和冲动的决定'
    ],
    timing: '近期是观察和准备的时期，重大行动宜缓'
  }
}