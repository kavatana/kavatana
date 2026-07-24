import type { ConciergeTopic } from '~/lib/concierge-core.mjs'


export interface ConciergeStarter {
  label: string
  query: string
}

export interface ConciergeContent {
  version: string
  name: string
  greeting: string
  boundary: string
  fallback: string
  starters: ConciergeStarter[]
  topics: ConciergeTopic[]
}

export interface ConciergeMessage {
  id: string
  role: 'user' | 'concierge'
  text: string
  links?: Array<{
    label: string
    href: string
  }>
  followUps?: string[]
}
