export const useScrollReveal = () => {
  const observe = (selector: string = '[data-reveal]') => {
    if (import.meta.server) return

    let io: IntersectionObserver | null = null

    const getObserver = () => {
      if (io) return io
      if (!('IntersectionObserver' in window)) return null
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              io?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12 }
      )
      return io
    }

    const reveal = (el: Element) => {
      if (el.classList.contains('is-visible')) return
      const observer = getObserver()
      if (observer) observer.observe(el)
      else el.classList.add('is-visible')
    }

    const scan = () => {
      document.querySelectorAll(selector).forEach(reveal)
    }

    scan()

    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
  }

  return {
    observe
  }
}
