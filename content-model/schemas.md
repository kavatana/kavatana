# Content Schemas

```typescript
interface Project {
  id: string
  title: string
  tagline: string
  status: 'live' | 'archived' | 'in-progress'
  featured: boolean
  featuredOrder?: number
  year: number
  endYear?: number
  role: string
  stack: string[]
  coverImage: string
  coverImageAlt: string
  screenshots?: Screenshot[]
  liveUrl?: string
  repoUrl?: string
  problem: string
  constraints: string[]
  myRole: string
  solution: string
  callout?: string
  tradeoffs: string[]
  results: string[]
  nextSteps?: string[]
}

interface Screenshot {
  src: string
  alt: string
  caption?: string
}

interface CapabilityGroup {
  id: string
  title: string
  description: string
  items: string[]
}

interface BuildDirection {
  id: string
  label: string
}

interface TimelineEntry {
  id: string
  type: 'role' | 'project' | 'milestone'
  title: string
  organization?: string
  startYear: number
  endYear?: number
  description: string
}

interface SiteConfig {
  name: string
  tagline: string
  description: string
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
```
