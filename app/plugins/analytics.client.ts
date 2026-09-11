export default defineNuxtPlugin(() => {
  const route = useRoute()
  const { trackPageView } = useAnalytics()

  const track = () => trackPageView(route.fullPath)

  // inicial
  onMounted(() => {
    track()
  })

  // en cada navegación
  watch(() => route.fullPath, () => {
    track()
  })
})
