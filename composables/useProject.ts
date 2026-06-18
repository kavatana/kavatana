import type { Project } from '~/types/content'
import bayonhub from '~/content/projects/bayonhub.json'
import kavatanaPortfolio from '~/content/projects/kavatana-portfolio.json'
import cyberArena from '~/content/projects/cyber-arena-team-os.json'
import phsaros from '~/content/projects/phsaros.json'

const projectsMap: Record<string, any> = {
  bayonhub,
  phsaros,
  'kavatana-portfolio': kavatanaPortfolio,
  'cyber-arena-team-os': cyberArena
}

export const useProject = (slug: string): Project | null =>
  (projectsMap[slug] as Project) || null
