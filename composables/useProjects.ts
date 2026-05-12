import type { Project } from '~/types/content'
import bayonhub from '~/content/projects/bayonhub.json'

export const useProjects = (): Project[] => {
  const projects = [bayonhub as Project]
  return projects.sort((a, b) => {
    if (a.featuredOrder !== undefined && b.featuredOrder !== undefined) {
      return a.featuredOrder - b.featuredOrder
    }
    return b.year - a.year
  })
}
