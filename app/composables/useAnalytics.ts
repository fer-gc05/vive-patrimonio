export const useAnalytics = () => {
  const supabase = useSupabase()

  const trackPageView = async (path?: string) => {
    try {
      const p = path || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/')
      const referrer = typeof document !== 'undefined' ? document.referrer : null

      // Evita duplicado en HMR y bots
      if (typeof sessionStorage !== 'undefined') {
        const key = `viewed:${p}:${new Date().toISOString().slice(0, 10)}`
        // solo 1 vez por sesión+página+día para no inflar
        if (sessionStorage.getItem(key)) return
        sessionStorage.setItem(key, '1')
      }

      await supabase.from('page_views').insert({
        path: p.slice(0, 500),
        referrer: referrer?.slice(0, 500) || null,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 500) : null
      })
    } catch (e) {
      // silencioso
    }
  }

  const getStats = async () => {
    const { data, error } = await supabase
      .from('page_views')
      .select('created_at, path')
      .order('created_at', { ascending: false })
      .limit(5000)

    if (error || !data) return null

    const now = new Date()
    const todayStr = now.toISOString().slice(0, 10)
    const monthStr = todayStr.slice(0, 7)
    const yearStr = todayStr.slice(0, 4)

    const today = data.filter(d => d.created_at.slice(0, 10) === todayStr).length
    const thisMonth = data.filter(d => d.created_at.slice(0, 7) === monthStr).length
    const thisYear = data.filter(d => d.created_at.slice(0, 4) === yearStr).length

    // últimos 7 días
    const last7: { date: string; count: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const str = d.toISOString().slice(0, 10)
      last7.push({ date: str, count: data.filter(x => x.created_at.slice(0, 10) === str).length })
    }

    // últimos 12 meses
    const last12: { month: string; count: number }[] = []
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const str = d.toISOString().slice(0, 7)
      last12.push({ month: str, count: data.filter(x => x.created_at.slice(0, 7) === str).length })
    }

    // últimos 5 años
    const lastYears: { year: string; count: number }[] = []
    for (let i = 4; i >= 0; i--) {
      const y = String(now.getFullYear() - i)
      lastYears.push({ year: y, count: data.filter(x => x.created_at.slice(0, 4) === y).length })
    }

    // top paths
    const pathMap = new Map<string, number>()
    data.forEach(d => {
      const k = d.path || '/'
      pathMap.set(k, (pathMap.get(k) || 0) + 1)
    })
    const topPaths = Array.from(pathMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)

    return {
      total: data.length,
      today,
      thisMonth,
      thisYear,
      last7,
      last12,
      lastYears,
      topPaths
    }
  }

  return { trackPageView, getStats }
}
