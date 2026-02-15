import { BirthInfo, AstrologyChart, PlanetPosition, HousePosition, Aspect } from '@/types/astrology'

// 星座数据
const ZODIAC_SIGNS = [
  { sign: 'Aries', chinese: '白羊座', element: 'fire', modality: 'cardinal', dates: '3.21-4.19' },
  { sign: 'Taurus', chinese: '金牛座', element: 'earth', modality: 'fixed', dates: '4.20-5.20' },
  { sign: 'Gemini', chinese: '双子座', element: 'air', modality: 'mutable', dates: '5.21-6.21' },
  { sign: 'Cancer', chinese: '巨蟹座', element: 'water', modality: 'cardinal', dates: '6.22-7.22' },
  { sign: 'Leo', chinese: '狮子座', element: 'fire', modality: 'fixed', dates: '7.23-8.22' },
  { sign: 'Virgo', chinese: '处女座', element: 'earth', modality: 'mutable', dates: '8.23-9.22' },
  { sign: 'Libra', chinese: '天秤座', element: 'air', modality: 'cardinal', dates: '9.23-10.23' },
  { sign: 'Scorpio', chinese: '天蝎座', element: 'water', modality: 'fixed', dates: '10.24-11.22' },
  { sign: 'Sagittarius', chinese: '射手座', element: 'fire', modality: 'mutable', dates: '11.23-12.21' },
  { sign: 'Capricorn', chinese: '摩羯座', element: 'earth', modality: 'cardinal', dates: '12.22-1.19' },
  { sign: 'Aquarius', chinese: '水瓶座', element: 'air', modality: 'fixed', dates: '1.20-2.18' },
  { sign: 'Pisces', chinese: '双鱼座', element: 'water', modality: 'mutable', dates: '2.19-3.20' }
]

// 行星数据
const PLANETS = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
]

// 根据出生日期计算太阳星座
export function calculateSunSign(birthDate: Date): string {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return 'Gemini'
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return 'Libra'
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return 'Scorpio'
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  return 'Pisces'
}

// 简化版星盘计算（实际项目需要集成专业库如swisseph）
export function calculateAstrologyChart(birthInfo: BirthInfo): AstrologyChart {
  const birthDate = new Date(birthInfo.birthDate)
  const sunSign = calculateSunSign(birthDate)
  
  // 简化计算：随机生成行星位置（实际需要天文计算）
  const planets: PlanetPosition[] = PLANETS.map(planet => {
    const signIndex = Math.floor(Math.random() * 12)
    const sign = ZODIAC_SIGNS[signIndex]
    return {
      planet,
      sign: sign.sign,
      signChinese: sign.chinese,
      degree: Math.random() * 30,
      house: Math.floor(Math.random() * 12) + 1,
      aspect: Math.random() > 0.5 ? 'conjunction' : 'trine'
    }
  })

  // 简化计算：随机生成宫位
  const houses: HousePosition[] = Array.from({ length: 12 }, (_, i) => {
    const signIndex = (i + Math.floor(Math.random() * 3)) % 12
    const sign = ZODIAC_SIGNS[signIndex]
    return {
      house: i + 1,
      sign: sign.sign,
      signChinese: sign.chinese,
      ruler: PLANETS[Math.floor(Math.random() * PLANETS.length)]
    }
  })

  // 简化计算：随机生成相位
  const aspects: Aspect[] = []
  for (let i = 0; i < 5; i++) {
    const planet1 = PLANETS[Math.floor(Math.random() * PLANETS.length)]
    let planet2 = PLANETS[Math.floor(Math.random() * PLANETS.length)]
    while (planet2 === planet1) {
      planet2 = PLANETS[Math.floor(Math.random() * PLANETS.length)]
    }
    
    const aspectTypes = ['conjunction', 'sextile', 'square', 'trine', 'opposition']
    const aspect = aspectTypes[Math.floor(Math.random() * aspectTypes.length)]
    
    aspects.push({
      planet1,
      planet2,
      aspect,
      orb: Math.random() * 5,
      influence: aspect === 'square' || aspect === 'opposition' ? 'negative' : 'positive'
    })
  }

  // 计算主导元素和模式
  const elementCount = { fire: 0, earth: 0, air: 0, water: 0 }
  const modalityCount = { cardinal: 0, fixed: 0, mutable: 0 }
  
  planets.forEach(planet => {
    const sign = ZODIAC_SIGNS.find(s => s.sign === planet.sign)
    if (sign) {
      elementCount[sign.element]++
      modalityCount[sign.modality]++
    }
  })

  const dominantElement = Object.entries(elementCount)
    .sort(([, a], [, b]) => b - a)[0][0]
  const dominantModality = Object.entries(modalityCount)
    .sort(([, a], [, b]) => b - a)[0][0]

  return {
    sunSign,
    moonSign: ZODIAC_SIGNS[Math.floor(Math.random() * 12)].sign,
    risingSign: ZODIAC_SIGNS[Math.floor(Math.random() * 12)].sign,
    planets,
    houses,
    aspects,
    dominantElement,
    dominantModality
  }
}

// 获取星座中文名
export function getChineseSign(sign: string): string {
  return ZODIAC_SIGNS.find(s => s.sign === sign)?.chinese || sign
}

// 获取元素中文名
export function getChineseElement(element: string): string {
  const map: Record<string, string> = {
    fire: '火',
    earth: '土',
    air: '风',
    water: '水'
  }
  return map[element] || element
}

// 获取模式中文名
export function getChineseModality(modality: string): string {
  const map: Record<string, string> = {
    cardinal: '基本',
    fixed: '固定',
    mutable: '变动'
  }
  return map[modality] || modality
}