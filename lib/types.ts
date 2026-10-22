export interface CaseStudyItem {
  title: string
  detail: string
  metric: string
  metricLabel: string
}

export interface TeardownDirection {
  angle: string
  observedChallenge: string
  proposedStrategy: string
  rightToWinProof: string
}

export interface StrategicBlueprint {
  matchScore: number
  candidateName: string
  targetRole: string
  targetCompany: string
  positioningHook: string
  directions: TeardownDirection[]
  caseStudies: CaseStudyItem[]
  motionNarrative: {
    headline: string
    detail: string
  }
  fitStats: {
    roleFit: string
    evidenceCoverage: string
    designFoundation: string
  }
}

export interface ParseCvResponse {
  success: boolean
  text?: string
  charCount?: number
  filename?: string
  error?: string
}

export interface BlueprintResponse {
  success: boolean
  blueprint?: StrategicBlueprint
  error?: string
}

export interface GenerateResponse {
  success: boolean
  chatId?: string
  previewUrl?: string
  error?: string
}
