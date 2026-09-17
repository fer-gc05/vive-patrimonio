import type { Cabin } from '~/types'

export const useCabins = () => {
  const supabase = useSupabase()

  const fetchCabins = async () => {
    const { data, error } = await supabase
      .from('cabins')
      .select('*')
      .eq('available', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching cabins:', error)
      return []
    }

    return data as Cabin[]
  }

  const getWhatsappLink = (message: string, number: string) => {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  }

  return {
    fetchCabins,
    getWhatsappLink
  }
}
