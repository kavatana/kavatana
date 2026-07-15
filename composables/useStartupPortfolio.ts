import type { StartupTrack } from '~/types/content'
import startupPortfolio from '~/content/startup-portfolio.json'

export const useStartupPortfolio = (): StartupTrack[] => startupPortfolio as StartupTrack[]
