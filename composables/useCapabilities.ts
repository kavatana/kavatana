import type { CapabilityGroup } from '~/types/content'
import capabilities from '~/content/capabilities.json'
export const useCapabilities = (): CapabilityGroup[] => capabilities as CapabilityGroup[]
