import type { GalleryImage } from '~/types'

export const useGallery = () => {
  const supabase = useSupabase()

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching gallery:', error)
      return []
    }

    return data as GalleryImage[]
  }

  return {
    fetchGallery
  }
}
