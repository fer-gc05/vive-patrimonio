import type { Drink } from '~/types'

export const useDrinks = () => {
  const supabase = useSupabase()

  const fetchDrinks = async () => {
    const { data, error } = await supabase
      .from('drinks')
      .select('*')
      .eq('available', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching drinks:', error)
      return []
    }

    return data as Drink[]
  }

  const categories = [
    { key: 'todos', label: 'Todas' },
    { key: 'margaritas', label: 'Margaritas' },
    { key: 'daiquiris', label: 'Daiquiris' },
    { key: 'clasicos', label: 'Clásicos' },
    { key: 'sodas', label: 'Sodas' },
    { key: 'cervezas', label: 'Cervezas' }
  ]

  return {
    fetchDrinks,
    categories
  }
}
