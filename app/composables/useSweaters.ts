import type { Sweater } from '~/types'

export const useSweaters = () => {
  const supabase = useSupabase()

  const fetchSweaters = async () => {
    const { data, error } = await supabase
      .from('sweaters')
      .select('*')
      .eq('available', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching sweaters:', error)
      return []
    }
    return data as Sweater[]
  }

  const categories = [
    { key: 'todos', label: 'Todos' },
    { key: 'clasico', label: 'Clásico' },
    { key: 'urbano', label: 'Urbano' },
    { key: 'artesanal', label: 'Artesanal' },
    { key: 'edicion', label: 'Edición especial' }
  ]

  return { fetchSweaters, categories }
}
