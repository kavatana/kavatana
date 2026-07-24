/* eslint-disable no-unused-vars */

export interface ConciergeLink {
  label: string
  href: string
}

export interface ConciergeProjectDetails {
  statusLabel: string
  role: string
  stack?: string[]
  deploymentLine?: string
  proofPoints?: string[]
  myRole?: string
  whatThisProves?: string
  whatILearned?: string[]
  nextSteps?: string[]
}

export interface ConciergeTopic {
  id: string
  title: string
  answer: string
  priority?: number
  keywords: string[]
  entities?: string[]
  phrases?: string[]
  links: ConciergeLink[]
  followUps?: string[]
  path?: string
  project?: ConciergeProjectDetails
}

export interface ConciergeAnswer {
  topicId: string | null
  confidence: 'high' | 'medium' | 'fallback'
  answer: string
  links: ConciergeLink[]
  followUps: string[]
}

export function normalizeText(value?: string): string
export function tokenize(value?: string): string[]
export function answerQuestion(input: {
  query: string
  topics: ConciergeTopic[]
  fallback: string
  previousTopicId?: string | null
  currentPath?: string
}): ConciergeAnswer
