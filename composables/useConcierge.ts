import conciergeContent from '~/content/concierge.json'
import startupPortfolio from '~/content/startup-portfolio.json'
import { answerQuestion } from '~/lib/concierge-core.mjs'
import type { ConciergeAnswer, ConciergeTopic } from '~/lib/concierge-core.mjs'
import type { Project, StartupTrack } from '~/types/content'
import type { ConciergeContent } from '~/types/concierge'


const TRACK_ALIASES: Record<string, string[]> = {
  bayonhub: ['bayon hub', 'student opportunities', 'internships', 'freelance'],
  'svaeng-yul': ['svaeng yul', 'khmer learning', 'tech education'],
  chomkar: ['chomkar', 'farmer', 'farmers', 'agriculture', 'market access'],
  'sat-digital': ['sat digital', 'cyber pet', 'telegram security', 'cybersecurity'],
  vantrex: ['vantrex', 'auriq fx', 'bitvora', 'trading bot', 'trading tools'],
  phsaros: ['phsaros', 'sme operations', 'restaurant', 'inventory', 'point of sale'],
  'chnai-lab': ['chnai lab', 'product studio', 'student team']
}

const projectTopic = (project: Project): ConciergeTopic => {
  const path = `/projects/${project.id}`
  const statusLabel = project.statusLabel || project.status
  const answer = `${project.title} is ${project.tagline}. ${project.problem} Current public status: ${statusLabel}. Ka's role: ${project.role}.`
  const links = [{ label: `${project.title} case study`, href: path }]

  if (project.liveUrl) {
    links.push({ label: 'Open the public product', href: project.liveUrl })
  }

  return {
    id: `project-${project.id}`,
    title: project.title,
    priority: project.featuredOrder === 0 ? 10 : 7,
    keywords: [
      project.id,
      project.title,
      project.tagline,
      ...(TRACK_ALIASES[project.id] || [])
    ],
    entities: [project.id, project.title],
    phrases: [
      `tell me about ${project.title}`,
      `what is ${project.title}`,
      `${project.title} project`
    ],
    answer,
    links,
    followUps: [
      `What is the proof behind ${project.title}?`,
      `What is the ${project.title} tech stack?`
    ],
    path,
    project: {
      statusLabel,
      role: project.role,
      stack: project.stack,
      deploymentLine: project.deploymentLine,
      proofPoints: project.proofPoints || project.results,
      myRole: project.myRole,
      whatThisProves: project.whatThisProves,
      whatILearned: project.whatILearned,
      nextSteps: project.nextSteps
    }
  }
}

const trackTopic = (track: StartupTrack): ConciergeTopic => ({
  id: `track-${track.id}`,
  title: track.name,
  priority: 6,
  keywords: [
    track.id,
    track.name,
    track.category,
    ...(TRACK_ALIASES[track.id] || [])
  ],
  entities: [track.id, track.name],
  phrases: [
    `tell me about ${track.name}`,
    `what is ${track.name}`
  ],
  answer: `${track.name} is Ka's ${track.category.toLocaleLowerCase('en')} track. ${track.summary} Current public status: ${track.statusLabel}.`,
  links: [
    {
      label: track.href ? `${track.name} case study` : 'Open the product map',
      href: track.href || '/projects'
    }
  ],
  followUps: [
    'What products is Ka building?',
    'Why are the startup repositories private?'
  ]
})

export const useConcierge = () => {
  const content = conciergeContent as ConciergeContent
  const projects = useProjects()
  const projectIds = new Set(projects.map((project) => project.id))
  const tracks = startupPortfolio as StartupTrack[]

  const topics: ConciergeTopic[] = [
    ...content.topics,
    ...projects.map(projectTopic),
    ...tracks.filter((track) => !projectIds.has(track.id)).map(trackTopic)
  ]

  const ask = (
    query: string,
    context: {
      previousTopicId?: string | null
      currentPath?: string
    } = {}
  ): ConciergeAnswer =>
    answerQuestion({
      query,
      topics,
      fallback: content.fallback,
      previousTopicId: context.previousTopicId,
      currentPath: context.currentPath
    })

  const currentProject = (path: string) =>
    projects.find((project) => path === `/projects/${project.id}`)

  const contextualGreeting = (path: string) => {
    const project = currentProject(path)
    if (!project) return content.greeting
    return `You are viewing ${project.title}. I can surface its current status, technical stack, evidence, tradeoffs, or Ka's role.`
  }

  const contextualStarters = (path: string) => {
    const project = currentProject(path)
    if (!project) return content.starters
    return [
      {
        label: 'Current status',
        query: `What is the current status of ${project.title}?`
      },
      {
        label: 'Technical stack',
        query: `What is the ${project.title} tech stack?`
      },
      {
        label: 'Strongest evidence',
        query: `What is the proof behind ${project.title}?`
      },
      {
        label: "Ka's role",
        query: `What was Ka's role in ${project.title}?`
      }
    ]
  }

  return {
    content,
    topics,
    ask,
    contextualGreeting,
    contextualStarters
  }
}
