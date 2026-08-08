export const useScrollReveal = () => {
  const observe = (selector: string = '[data-reveal]') => {
    if (import.meta.server) return

    const targets = document.querySelectorAll(selector)

    if (!('IntersectionObserver' in window) || !targets.length) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    targets.forEach((el) => io.observe(el))
  }

  return {
    observe
  }
}
