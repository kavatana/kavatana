import type { SiteConfig } from '~/types/content'
import config from '~/content/config.json'
export const usePortfolioConfig = (): SiteConfig => config as SiteConfig
