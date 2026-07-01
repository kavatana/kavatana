import type { BackendTrack } from '~/types/content'
import backendTrack from '~/content/backend-track.json'

export const useBackendTrack = (): BackendTrack => backendTrack as BackendTrack
