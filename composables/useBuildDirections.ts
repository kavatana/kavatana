import type { BuildDirection } from '~/types/content'
import buildDirections from '~/content/build-directions.json'
export const useBuildDirections = (): BuildDirection[] => buildDirections as BuildDirection[]
