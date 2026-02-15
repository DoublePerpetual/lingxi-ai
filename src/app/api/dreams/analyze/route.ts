import { NextRequest, NextResponse } from 'next/server'
import { DreamAnalysisRequest, DreamAnalysisResponse } from '@/types/dream'
import { 
  extractDreamSymbols, 
  buildDreamAnalysisPrompt,
  parseDreamAnalysis,
  getSymbolDetails,
  generateMockDreamAnalysis 
} from '@/lib/ai/dreamAnalyzer'

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 验证请求数据
    const analysisRequest: DreamAnalysisRequest = {
      dream: body.dream?.trim() || '',
      emotion: body.emotion || 'confused',
      recurring: body.recurring || false,
      context: body.context
    }

    if (!analysisRequest.dream) {
      return NextResponse.json(
        { error: '请提供梦境描述' },
        { status: 400 }
      )
    }

    // 生成唯一会话ID
    const sessionId = `dream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // 提取梦境符号
    const symbols = extractDreamSymbols(analysisRequest.dream)
    
    // 获取符号详情
    const symbolDetails = getSymbolDetails(symbols)

    // 调用DeepSeek API进行梦境分析
    const apiKey = process.env.DEEPSEEK_API_KEY
    let interpretation
    
    if (apiKey) {
      try {
        const prompt = buildDreamAnalysisPrompt(analysisRequest, symbols)
        
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
                content: '你是一位专业的梦境分析师，精通心理学和东西方解梦传统。请提供深入、专业、实用的梦境分析。'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 1500
          })
        })

        if (response.ok) {
          const data = await response.json()
          const analysisText = data.choices[0]?.message?.content
          interpretation = parseDreamAnalysis(analysisText)
        } else {
          console.warn('DeepSeek API调用失败，使用模拟分析')
          interpretation = generateMockDreamAnalysis(analysisRequest)
        }
      } catch (error) {
        console.error('DeepSeek API错误:', error)
        interpretation = generateMockDreamAnalysis(analysisRequest)
      }
    } else {
      // 无API密钥时使用模拟分析
      interpretation = generateMockDreamAnalysis(analysisRequest)
    }

    // 构建响应
    const response: DreamAnalysisResponse = {
      interpretation,
      symbols: symbolDetails,
      nextSteps: [
        '记录梦境日记，观察模式',
        '反思近期生活事件和情绪',
        '考虑与心理咨询师讨论重复出现的梦境'
      ],
      sessionId
    }

    // 记录分析日志
    console.log(`[Dream Analysis] Session: ${sessionId}, Symbols: ${symbols.join(', ')}`)

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error in dream analysis:', error)
    
    return NextResponse.json(
      { 
        error: '梦境分析失败',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}

// GET方法用于测试
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const test = searchParams.get('test')
  
  if (test === 'demo') {
    // 返回演示数据
    const demoResponse: DreamAnalysisResponse = {
      interpretation: {
        psychological: {
          freudian: ['反映了对自由的渴望和被压抑的自我表达'],
          jungian: ['飞翔是超越原型的体现，代表精神提升'],
          modern: ['可能与近期工作压力和对自主权的需求相关']
        },
        esoteric: {
          western: ['传统解梦中，飞翔代表成功和超越'],
          eastern: ['周公解梦中，飞翔预示事业上升和好运'],
          universal: ['跨文化中，飞翔都象征自由和成就']
        },
        personalized: {
          basedOnChart: ['结合你的星座特质，这个梦反映了创造力的释放'],
          basedOnHistory: ['与你近期对工作的思考相关'],
          actionableAdvice: ['尝试在工作中寻找更多自主权', '培养创造性爱好']
        },
        summary: '这个飞翔的梦境反映了你对自由和成就的渴望，建议在现实生活中寻找更多表达自我的机会。',
        confidence: 0.88
      },
      symbols: [
        {
          symbol: 'flying',
          meanings: {
            psychological: ['渴望自由、逃避现实、成就感'],
            esoteric: ['灵魂出窍、精神提升、超越限制'],
            cultural: ['好运、事业上升']
          },
          frequency: 85,
          emotionAssociation: ['excited', 'free', 'achievement']
        }
      ],
      nextSteps: [
        '记录梦境中的细节和感受',
        '反思近期对自由和成就的需求',
        '考虑如何将梦境启示融入日常生活'
      ],
      sessionId: 'dream_demo_123'
    }
    
    return NextResponse.json(demoResponse)
  }
  
  return NextResponse.json(
    { 
      message: '灵犀AI梦境分析API',
      status: 'active',
      endpoints: {
        POST: '/api/dreams/analyze',
        GET: '/api/dreams/analyze?test=demo'
      }
    },
    { status: 200 }
  )
}