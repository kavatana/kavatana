import type { TimelineEntry } from '~/types/content'
import timeline from '~/content/timeline.json'
export const useTimeline = (): TimelineEntry[] => timeline as TimelineEntry[]
