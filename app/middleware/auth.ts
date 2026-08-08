export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabase()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }
})
