import type { Tour } from '~/types'

export const useTours = () => {
  const supabase = useSupabase()

  const fetchTours = async () => {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('available', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching tours:', error)
      return []
    }

    return data as Tour[]
  }

  const getWhatsappLink = (message: string, number: string = '573001234567') => {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  }

  return {
    fetchTours,
    getWhatsappLink
  }
}
