export default defineNuxtPlugin(() => {
  const trackEvent = (eventName: string, options?: any) => {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(eventName, options)
    }
  }

  if (typeof window !== 'undefined') {
    document.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('a')
      if (target && target.href && target.href.startsWith('http') && !target.href.includes(window.location.hostname)) {
        trackEvent('external_link', { props: { url: target.href } })
      }
    })
  }

  return {
    provide: {
      trackEvent
    }
  }
})
