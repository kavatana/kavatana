import type { LearningCategory } from '~/types/content'
import learning from '~/content/learning.json'
export const useLearning = (): LearningCategory[] => learning as LearningCategory[]
