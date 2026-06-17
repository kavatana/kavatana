export interface Project {
  id: string
  title: string
  tagline: string
  status: 'live' | 'archived' | 'in-progress' | 'local-only' | 'concept'
  statusLabel?: string
  featured: boolean
  featuredOrder?: number
  year: number
  endYear?: number
  role: string
  stack?: string[]
  coverImage?: string
  coverImageAlt?: string
  screenshots?: Screenshot[]
  liveUrl?: string
  githubUrl?: string
  repoNote?: string
  problem: string
  context?: string
  constraints?: string[]
  myRole?: string
  solution?: string
  callout?: string
  tradeoffs?: string[]
  whatIBuilt?: string[]
  whatILearned?: string[]
  results?: string[]
  nextSteps?: string[]
}

export interface Screenshot {
  src: string
  alt: string
  caption?: string
}

export interface CapabilityGroup {
  id: string
  title: string
  description: string
  items: string[]
  learningNote?: string
}

export interface BuildDirection {
  id: string
  label: string
}

export interface TimelineEntry {
  id: string
  type: 'education' | 'environment' | 'role' | 'project' | 'milestone'
  title: string
  organization?: string
  startYear: number
  endYear?: number
  description: string
}

export interface LearningCategory {
  id: string
  category: string
  items: string[]
}

export interface SiteConfig {
  name: string
  fullName?: string
  tagline: string
  subtitle?: string
  description: string
  role?: string
  availability?: string
  url: string
  email: string
  social: {
    github?: string
    linkedin?: string
  }
  ogImage: string
  analyticsId?: string
  availabilityStatus: string
}

export interface AboutContent {
  bio: string[]
  role: string
  aiNote?: string
  currentFocus?: string[]
}
