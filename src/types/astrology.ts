export interface BirthInfo {
  name: string
  birthDate: string // YYYY-MM-DD
  birthTime?: string // HH:mm
  birthPlace: string
  gender?: 'male' | 'female' | 'unknown'
}

export interface PlanetPosition {
  planet: string
  sign: string
  signChinese: string
  degree: number
  house: number
  aspect: string
}

export interface HousePosition {
  house: number
  sign: string
  signChinese: string
  ruler: string
}

export interface Aspect {
  planet1: string
  planet2: string
  aspect: string
  orb: number
  influence: 'positive' | 'negative' | 'neutral'
}

export interface ZodiacSign {
  sign: string
  chinese: string
  element: 'fire' | 'earth' | 'air' | 'water'
  modality: 'cardinal' | 'fixed' | 'mutable'
  ruler: string
  dates: string
  traits: string[]
}

export interface AstrologyChart {
  sunSign: string
  moonSign: string
  risingSign: string
  planets: PlanetPosition[]
  houses: HousePosition[]
  aspects: Aspect[]
  dominantElement: string
  dominantModality: string
}

export interface AIAnalysis {
  personality: {
    strengths: string[]
    challenges: string[]
    coreMotivation: string
  }
  relationships: {
    compatibility: string
    communicationStyle: string
    emotionalNeeds: string
  }
  career: {
    suitableFields: string[]
    workStyle: string
    potentialChallenges: string
  }
  lifePath: {
    currentPhase: string
    keyThemes: string[]
    growthOpportunities: string[]
  }
  advice: {
    immediate: string[]
    longTerm: string[]
    warning: string[]
  }
}

export interface AstrologyResponse {
  chart: AstrologyChart
  analysis: AIAnalysis
  timestamp: string
  sessionId: string
}