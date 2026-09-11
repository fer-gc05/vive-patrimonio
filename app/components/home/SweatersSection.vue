<script setup lang="ts">
import type { Sweater } from '~/types'

const { fetchSweaters, categories } = useSweaters()
const { fetchSettings } = useSettings()
const sweaters = ref<Sweater[]>([])
const active = ref('todos')
const selected = ref<Sweater | null>(null)
const whatsappNumber = ref('')
const carouselRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

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

const getScrollAmount = () => {
  const el = carouselRef.value
  if (!el) return 300
  const firstCard = el.firstElementChild as HTMLElement | null
  const gap = parseInt(getComputedStyle(el).columnGap || getComputedStyle(el).gap || '16', 10) || 16
  if (firstCard) return firstCard.offsetWidth + gap
  return el.clientWidth * 0.82
}

const scrollPrev = () => {
  carouselRef.value?.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' })
}

const scrollNext = () => {
  carouselRef.value?.scrollBy({ left: getScrollAmount(), behavior: 'smooth' })
}

const scrollToIndex = (index: number) => {
  const el = carouselRef.value
  if (!el) return
  const gap = parseInt(getComputedStyle(el).columnGap || getComputedStyle(el).gap || '16', 10) || 16
  const firstCard = el.firstElementChild as HTMLElement | null
  const cardWidth = firstCard ? firstCard.offsetWidth + gap : el.clientWidth * 0.82
  el.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
}

const onCarouselScroll = () => {
  const el = carouselRef.value
  if (!el) return
  const cardWidth = getScrollAmount()
  if (cardWidth === 0) return
  const idx = Math.round(el.scrollLeft / cardWidth)
  activeIndex.value = Math.max(0, Math.min(idx, filtered.value.length - 1))
}

const scrollToNextSection = () => {
  document.querySelector('#carta')?.scrollIntoView({ behavior: 'smooth' })
}

watch(filtered, () => {
  activeIndex.value = 0
  if (carouselRef.value) carouselRef.value.scrollLeft = 0
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
    <div v-else class="carousel-wrapper">
      <div ref="carouselRef" class="grid" @scroll="onCarouselScroll">
        <UiSweaterCard v-for="s in filtered" :key="s.id" :sweater="s" @click="open" />
      </div>

      <button
        v-if="filtered.length > 1"
        class="carousel-arrow prev"
        aria-label="Suéter anterior"
        @click="scrollPrev"
      >
        ‹
      </button>
      <button
        v-if="filtered.length > 1"
        class="carousel-arrow next"
        aria-label="Siguiente suéter"
        @click="scrollNext"
      >
        ›
      </button>

      <div v-if="filtered.length > 1" class="carousel-dots">
        <button
          v-for="(_s, idx) in filtered"
          :key="idx"
          class="dot"
          :class="{ active: idx === activeIndex }"
          :aria-label="`Ir a suéter ${idx + 1}`"
          @click="scrollToIndex(idx)"
        />
      </div>
      <p v-if="filtered.length > 1" class="carousel-hint">Desliza para ver más →</p>

      <button class="jump-next" @click="scrollToNextSection">Ver bebidas ↓</button>
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
.carousel-wrapper { max-width: 1200px; margin: 46px auto 0; position: relative; }
.carousel-arrow, .carousel-dots, .carousel-hint, .jump-next { display: none; }
.empty-state { max-width: 600px; margin: 40px auto 0; text-align: center; color: var(--gray); font-size: 14px; line-height: 1.7; }

@include respond(desktop) { .grid { grid-template-columns: repeat(2, 1fr); } }
@include respond(tablet) {
  .sweaters { padding: 60px 0 75px; }
  .menu-header { padding: 0 16px; }
  .carousel-wrapper { max-width: 100%; margin-top: 0; }
  .grid {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    gap: 16px;
    width: 100%;
    max-width: 100%;
    padding: 0 16px 12px;
    margin-top: 18px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
    :deep(.sweater) {
      flex: 0 0 82vw;
      max-width: 340px;
      scroll-snap-align: center;
      scroll-snap-stop: always;
    }
  }
  .carousel-arrow {
    display: flex;
    position: absolute;
    top: 42%;
    transform: translateY(-50%);
    width: 38px; height: 38px;
    border-radius: 50%;
    background: var(--green);
    color: #fff;
    border: none;
    font-size: 22px;
    line-height: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    box-shadow: 0 4px 16px rgba(0,0,0,0.22);
    transition: opacity 0.2s, transform 0.2s;
    &:active { transform: translateY(-50%) scale(0.95); }
    &.prev { left: 8px; }
    &.next { right: 8px; }
  }
  .carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin-top: 18px;
    padding: 0 16px;
  }
  .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #d9d9d9;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
    &.active { background: var(--green); width: 22px; border-radius: 10px; }
  }
  .carousel-hint {
    display: block;
    text-align: center;
    margin-top: 10px;
    font-size: 11px;
    letter-spacing: 0.8px;
    color: var(--gray);
    opacity: 0.8;
  }
  .jump-next {
    display: block;
    margin: 22px auto 0;
    background: transparent;
    border: 1px solid var(--green);
    color: var(--green);
    padding: 12px 22px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    cursor: pointer;
    transition: 0.3s;
    &:hover { background: var(--green); color: #fff; }
  }
}
@include respond(mobile-sm) {
  .grid {
    padding-left: 12px;
    padding-right: 12px;
    gap: 12px;
    :deep(.sweater) { flex-basis: 84vw; }
  }
  .carousel-arrow { width: 34px; height: 34px; font-size: 20px; }
}
</style>
