import { NextRequest, NextResponse } from 'next/server'
import { IChingRequest, IChingResponse, IChingReading } from '@/types/iching'
import { 
  generateHexagramLines, 
  generateHexagram,
  buildIChingPrompt,
  parseIChingAnalysis,
  generateMockIChingReading
} from '@/lib/ai/ichingAnalyzer'

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 验证请求数据
    const divinationRequest: IChingRequest = {
      question: body.question?.trim() || '',
      method: body.method || 'digital',
      focusAreas: body.focusAreas || []
    }

    if (!divinationRequest.question) {
      return NextResponse.json(
        { error: '请提出你的问题' },
        { status: 400 }
      )
    }

    // 生成唯一会话ID
    const sessionId = `iching_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // 生成卦象
    const lines = generateHexagramLines(divinationRequest.method)
    const primaryHexagram = generateHexagram(lines)
    const changingLines = lines.filter(line => line.isChanging).map(line => line.position)
    
    // 获取变卦（如果有变爻）
    let changingHexagram
    if (changingLines.length > 0 && primaryHexagram.changingTo) {
      changingHexagram = generateHexagram(
        lines.map(line => ({
          ...line,
          value: line.isChanging ? (line.value === 6 ? 9 : 6) as 6 | 7 | 8 | 9 : line.value
        }))
      )
    }

    // 调用DeepSeek API进行解读
    const apiKey = process.env.DEEPSEEK_API_KEY
    let reading
    
    if (apiKey) {
      try {
        const prompt = buildIChingPrompt(divinationRequest, primaryHexagram, changingHexagram)
        
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
                content: '你是一位精通《周易》的专家，请提供专业、深入、实用的卦象解读。强调人的主观能动性和道德修养。'
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

        if (response.ok) {
          const data = await response.json()
          const analysisText = data.choices[0]?.message?.content
          reading = parseIChingAnalysis(analysisText, primaryHexagram)
        } else {
          console.warn('DeepSeek API调用失败，使用模拟解读')
          reading = generateMockIChingReading(divinationRequest)
        }
      } catch (error) {
        console.error('DeepSeek API错误:', error)
        reading = generateMockIChingReading(divinationRequest)
      }
    } else {
      // 无API密钥时使用模拟解读
      reading = generateMockIChingReading(divinationRequest)
    }

    // 构建完整的占卜记录
    const divinationReading: IChingReading = {
      question: divinationRequest.question,
      method: divinationRequest.method || 'digital', // 添加默认值
      primaryHexagram,
      changingHexagram,
      changingLines,
      reading,
      sessionId,
      createdAt: new Date().toISOString()
    }

    // 构建响应
    const response: IChingResponse = {
      reading: divinationReading,
      nextSteps: [
        '静心反思卦象启示',
        '记录本次占卜结果',
        '结合现实情况制定行动计划'
      ]
    }

    // 记录占卜日志
    console.log(`[IChing Divination] Session: ${sessionId}, Hexagram: ${primaryHexagram.chineseName}`)

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error in IChing divination:', error)
    
    return NextResponse.json(
      { 
        error: '周易占卜失败',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}

// GET方法用于测试
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      message: '灵犀AI周易占卜API',
      status: 'active',
      description: '基于《周易》的AI占卜服务',
      endpoints: {
        POST: '/api/iching/divine'
      }
    },
    { status: 200 }
  )
}