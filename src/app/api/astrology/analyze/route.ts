import { NextRequest, NextResponse } from 'next/server'
import { BirthInfo, AstrologyResponse } from '@/types/astrology'
import { calculateAstrologyChart } from '@/lib/utils/astrologyCalculator'
import { analyzeAstrologyChart } from '@/lib/ai/deepseek'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 验证请求数据
    const birthInfo: BirthInfo = {
      name: body.name?.trim() || '匿名用户',
      birthDate: body.birthDate,
      birthTime: body.birthTime,
      birthPlace: body.birthPlace?.trim(),
      gender: body.gender || 'unknown'
    }

    if (!birthInfo.birthDate || !birthInfo.birthPlace) {
      return NextResponse.json(
        { error: '缺少必要信息：出生日期和出生地点' },
        { status: 400 }
      )
    }

    // 生成唯一会话ID
    const sessionId = `astrology_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // 计算星盘
    const chart = calculateAstrologyChart(birthInfo)
    
    // AI分析
    const analysis = await analyzeAstrologyChart(chart, birthInfo.name)

    // 构建响应
    const response: AstrologyResponse = {
      chart,
      analysis,
      timestamp: new Date().toISOString(),
      sessionId
    }

    // 记录分析日志（实际项目中应保存到数据库）
    console.log(`[Astrology Analysis] Session: ${sessionId}, User: ${birthInfo.name}`)

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error in astrology analysis:', error)
    
    return NextResponse.json(
      { 
        error: '星盘分析失败',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}

// 添加GET方法用于测试
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const test = searchParams.get('test')
  
  if (test === 'demo') {
    // 返回演示数据
    const demoResponse: AstrologyResponse = {
      chart: {
        sunSign: 'Leo',
        moonSign: 'Cancer',
        risingSign: 'Libra',
        planets: [
          { planet: 'Sun', sign: 'Leo', signChinese: '狮子座', degree: 15.5, house: 5, aspect: 'conjunction' },
          { planet: 'Moon', sign: 'Cancer', signChinese: '巨蟹座', degree: 22.3, house: 4, aspect: 'trine' }
        ],
        houses: [
          { house: 1, sign: 'Libra', signChinese: '天秤座', ruler: 'Venus' },
          { house: 2, sign: 'Scorpio', signChinese: '天蝎座', ruler: 'Pluto' }
        ],
        aspects: [
          { planet1: 'Sun', planet2: 'Moon', aspect: 'trine', orb: 2.1, influence: 'positive' }
        ],
        dominantElement: 'fire',
        dominantModality: 'fixed'
      },
      analysis: {
        personality: {
          strengths: ['领导力强', '富有创造力', '热情开朗'],
          challenges: ['容易固执', '需要被认可', '情绪敏感'],
          coreMotivation: '表达自我，获得认可和爱'
        },
        relationships: {
          compatibility: '与火象和风象星座有良好互动',
          communicationStyle: '直接而温暖，重视情感连接',
          emotionalNeeds: '需要安全感和被欣赏的感觉'
        },
        career: {
          suitableFields: ['创意产业', '教育行业', '管理岗位'],
          workStyle: '注重结果，善于激励团队',
          potentialChallenges: '需要学会倾听不同意见'
        },
        lifePath: {
          currentPhase: '自我表达和创造力发展期',
          keyThemes: ['个人品牌建立', '情感关系深化', '职业成就追求'],
          growthOpportunities: ['发展耐心', '学习妥协', '培养同理心']
        },
        advice: {
          immediate: ['记录创意想法', '主动表达情感', '尝试新社交圈'],
          longTerm: ['建立个人作品集', '培养领导技能', '学习情绪管理'],
          warning: ['避免过度自我中心', '注意财务规划', '谨慎重大承诺']
        }
      },
      timestamp: new Date().toISOString(),
      sessionId: 'demo_session_123'
    }
    
    return NextResponse.json(demoResponse)
  }
  
  return NextResponse.json(
    { message: '灵犀AI星盘分析API', status: 'active' },
    { status: 200 }
  )
}