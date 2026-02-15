export interface IChingHexagram {
  number: number // 1-64
  name: string // 卦名
  chineseName: string // 中文卦名
  pinyin: string // 拼音
  symbol: string // 卦象，如 "䷀"
  binary: string // 二进制表示，如 "111111"
  lines: HexagramLine[] // 六爻
  judgment: string // 卦辞
  image: string // 象传
  meaning: {
    overall: string // 整体含义
    situation: string // 情境描述
    advice: string // 建议
    warning: string // 警示
  }
  changingTo?: number // 变卦编号
}

export interface HexagramLine {
  position: number // 1-6（从下往上）
  value: 6 | 7 | 8 | 9 // 6: 老阴, 7: 少阳, 8: 少阴, 9: 老阳
  isChanging: boolean // 是否为变爻
  meaning: string // 爻辞
  interpretation: string // 解读
}

export interface IChingReading {
  question: string
  method: 'coins' | 'yarrow' | 'digital'
  primaryHexagram: IChingHexagram
  changingHexagram?: IChingHexagram
  changingLines: number[] // 变爻位置
  reading: {
    overview: string // 总体解读
    currentSituation: string // 当前状况
    advice: string[] // 具体建议
    warning: string[] // 需要注意的事项
    timing: string // 时机建议
  }
  sessionId: string
  createdAt: string
}

export interface IChingRequest {
  question: string
  method?: 'coins' | 'yarrow' | 'digital'
  focusAreas?: string[] // 关注领域：career, love, health, etc.
}

export interface IChingResponse {
  reading: IChingReading
  relatedHexagrams?: IChingHexagram[] // 相关卦象
  nextSteps: string[] // 下一步建议
}

// 64卦基础数据
export const HEXAGRAMS: Omit<IChingHexagram, 'lines' | 'changingTo'>[] = [
  {
    number: 1,
    name: 'Qian',
    chineseName: '乾',
    pinyin: 'qián',
    symbol: '䷀',
    binary: '111111',
    judgment: '元亨利贞。',
    image: '天行健，君子以自强不息。',
    meaning: {
      overall: '创造、刚健、领导',
      situation: '强盛时期，适合开拓创新',
      advice: '保持积极进取，但需注意刚愎自用',
      warning: '避免过度自信和独断专行'
    }
  },
  {
    number: 2,
    name: 'Kun',
    chineseName: '坤',
    pinyin: 'kūn',
    symbol: '䷁',
    binary: '000000',
    judgment: '元亨，利牝马之贞。',
    image: '地势坤，君子以厚德载物。',
    meaning: {
      overall: '接纳、柔顺、承载',
      situation: '需要耐心和包容的时期',
      advice: '以柔克刚，顺势而为',
      warning: '避免消极被动和缺乏主见'
    }
  },
  // 简化的64卦数据，实际项目需要完整数据
  {
    number: 11,
    name: 'Tai',
    chineseName: '泰',
    pinyin: 'tài',
    symbol: '䷊',
    binary: '000111',
    judgment: '小往大来，吉亨。',
    image: '天地交，泰。后以财成天地之道，辅相天地之宜，以左右民。',
    meaning: {
      overall: '通达、和谐、顺利',
      situation: '阴阳调和，万事亨通',
      advice: '把握时机，积极行动',
      warning: '居安思危，防微杜渐'
    }
  },
  {
    number: 12,
    name: 'Pi',
    chineseName: '否',
    pinyin: 'pǐ',
    symbol: '䷋',
    binary: '111000',
    judgment: '否之匪人，不利君子贞，大往小来。',
    image: '天地不交，否。君子以俭德辟难，不可荣以禄。',
    meaning: {
      overall: '阻塞、困难、停滞',
      situation: '沟通不畅，进展受阻',
      advice: '保存实力，等待时机',
      warning: '避免强行突破和冒险'
    }
  },
  {
    number: 64,
    name: 'Wei Ji',
    chineseName: '未济',
    pinyin: 'wèi jì',
    symbol: '䷿',
    binary: '010101',
    judgment: '亨。小狐汔济，濡其尾，无攸利。',
    image: '火在水上，未济。君子以慎辨物居方。',
    meaning: {
      overall: '未完成、过渡、期待',
      situation: '事情尚未完成，处于过渡阶段',
      advice: '谨慎行事，做好充分准备',
      warning: '避免急于求成和盲目行动'
    }
  }
]