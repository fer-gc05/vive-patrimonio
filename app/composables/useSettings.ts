import type { Settings } from '~/types'

export const useSettings = () => {
  const supabase = useSupabase()

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      console.error('Error fetching settings:', error)
      return null
    }

    return data as Settings
  }

  return {
    fetchSettings
  }
}
