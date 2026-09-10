<script setup lang="ts">
import type { Sweater } from '~/types'

const { fetchSweaters, categories } = useSweaters()
const { fetchSettings } = useSettings()
const sweaters = ref<Sweater[]>([])
const active = ref('todos')
const selected = ref<Sweater | null>(null)
const whatsappNumber = ref('')

const filtered = computed(() => {
  if (active.value === 'todos') return sweaters.value
  return sweaters.value.filter(s => s.type.toLowerCase() === active.value)
})

const open = (s: Sweater) => selected.value = s
const close = () => selected.value = null

const whatsappLink = computed(() => {
  if (!selected.value) return ''
  const msg = `Hola Vive Patrimonio, me interesa el suéter "${selected.value.name}" (${selected.value.type}) en talla/colores disponibles. ¿Me das más info?`
  return `https://wa.me/${whatsappNumber.value}?text=${encodeURIComponent(msg)}`
})

onMounted(async () => {
  const [data, settings] = await Promise.all([fetchSweaters(), fetchSettings()])
  sweaters.value = data
  if (settings?.whatsapp_number) whatsappNumber.value = settings.whatsapp_number
})
</script>

<template>
  <section class="sweaters" id="sueteres">
    <div class="menu-header">
      <UiSectionLabel>Tienda local</UiSectionLabel>
      <h2>Suéteres <span>con historia</span></h2>
      <p>Diseños inspirados en el Sinú. Elige tipo, talla y color — hechos para brillar junto al río.</p>
    </div>

    <UiCategoryFilter :categories="categories" :active="active" @select="active = $event" />

    <p v-if="sweaters.length === 0" class="empty-state">Pronto tendremos suéteres disponibles.</p>
    <p v-else-if="filtered.length === 0" class="empty-state">No hay suéteres en esta categoría.</p>
    <div v-else class="grid">
      <UiSweaterCard v-for="s in filtered" :key="s.id" :sweater="s" @click="open" />
    </div>

    <UiSweaterModal v-if="selected" :sweater="selected" :whatsapp-link="whatsappLink" @close="close" />
  </section>
</template>

<style scoped lang="scss">
.sweaters { background: var(--cream); padding: 100px 6%; }
.menu-header { text-align: center; max-width: 700px; margin: auto; }
.menu-header h2 { font-family: "Cormorant Garamond", serif; font-size: clamp(45px, 6vw, 75px); line-height: 0.95; font-weight: 500; margin: 20px 0; span { color: var(--gold); font-style: italic; } }
.menu-header p { color: var(--gray); line-height: 1.7; }
.grid { max-width: 1200px; margin: 46px auto 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
.empty-state { max-width: 600px; margin: 40px auto 0; text-align: center; color: var(--gray); font-size: 14px; line-height: 1.7; }

@include respond(desktop) { .grid { grid-template-columns: repeat(2, 1fr); } }
@include respond(tablet) {
  .sweaters { padding: 60px 16px 75px; }
  .grid { grid-template-columns: 1fr; gap: 18px; }
}
</style>
