import type { SiteConfig } from '~/types/content'
import config from '~/content/config.json'
export const useSiteConfig = (): SiteConfig => config as SiteConfig
