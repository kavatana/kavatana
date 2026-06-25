import type { Project } from '~/types/content'
import bayonhub from '~/content/projects/bayonhub.json'
import kavatanaPortfolio from '~/content/projects/kavatana-portfolio.json'
import cyberArena from '~/content/projects/cyber-arena-team-os.json'
import phsaros from '~/content/projects/phsaros.json'
import svaengYul from '~/content/projects/svaeng-yul.json'
import studioOs from '~/content/projects/studio-os.json'

export const useProjects = (): Project[] => {
  const projects = [
    bayonhub as Project,
    phsaros as Project,
    svaengYul as Project,
    studioOs as Project,
    kavatanaPortfolio as Project,
    cyberArena as Project
  ]
  return projects.sort((a, b) => {
    if (a.featuredOrder !== undefined && b.featuredOrder !== undefined) {
      return a.featuredOrder - b.featuredOrder
    }
    if (a.featuredOrder !== undefined) return -1
    if (b.featuredOrder !== undefined) return 1
    return b.year - a.year
  })
}
