import { createClient } from '@supabase/supabase-js'

let _supabase: ReturnType<typeof createClient> | null = null

export const useSupabase = () => {
  if (_supabase) return _supabase

  const config = useRuntimeConfig()
  _supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
  return _supabase
}
