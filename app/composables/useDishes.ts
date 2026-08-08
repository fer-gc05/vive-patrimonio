import type { Dish } from '~/types'

export const useDishes = () => {
  const supabase = useSupabase()

  const categoryOrder = ['entradas', 'hamburguesas', 'desgranados', 'picadas']

  const categories = [
    { key: 'todos', label: 'Todas' },
    { key: 'entradas', label: 'Entradas' },
    { key: 'hamburguesas', label: 'Hamburguesas' },
    { key: 'desgranados', label: 'Desgranados' },
    { key: 'picadas', label: 'Picadas' }
  ]

  const fetchDishes = async () => {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .eq('available', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching dishes:', error)
      return []
    }

    return data as Dish[]
  }

  return { fetchDishes, categories, categoryOrder }
}
