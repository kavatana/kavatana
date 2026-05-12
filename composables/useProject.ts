import type { Project } from '~/types/content'
import bayonhub from '~/content/projects/bayonhub.json'

export const useProject = (slug: string): Project | null => {
  const projects: Record<string, any> = { bayonhub }
  return (projects[slug] as Project) || null
}
