import type { Dish } from '~/types'

export const useDishes = () => {
  const supabase = useSupabase()

  const fetchDishes = async () => {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching dishes:', error)
      return []
    }

    const grouped: Record<string, Dish[]> = {}
    data.forEach((dish) => {
      if (!grouped[dish.category]) {
        grouped[dish.category] = []
      }
      grouped[dish.category].push(dish)
    })

    return Object.entries(grouped).map(([group, items]) => ({
      group,
      items
    }))
  }

  return {
    fetchDishes
  }
}
