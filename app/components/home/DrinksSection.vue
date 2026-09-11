<script setup lang="ts">
import type { Drink } from '~/composables/useDrinks'

const { fetchDrinks, categories } = useDrinks()
const drinks = ref<Drink[]>([])
const activeCategory = ref('todos')
const selectedDrink = ref<Drink | null>(null)
const carouselRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

const categoryOrder = ['margaritas', 'daiquiris', 'clasicos', 'sodas', 'cervezas', 'otras']

const filteredDrinks = computed(() => {
  if (activeCategory.value === 'todos') {
    return [...drinks.value].sort((a, b) => {
      const orderA = categoryOrder.indexOf(a.category)
      const orderB = categoryOrder.indexOf(b.category)
      if (orderA !== orderB) return orderA - orderB
      return a.sort_order - b.sort_order
    })
  }
  return drinks.value
    .filter((drink) => drink.category === activeCategory.value)
    .sort((a, b) => a.sort_order - b.sort_order)
})

const selectCategory = (key: string) => {
  activeCategory.value = key
}

const openModal = (drink: Drink) => {
  selectedDrink.value = drink
}

const closeModal = () => {
  selectedDrink.value = null
}

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
  activeIndex.value = Math.max(0, Math.min(idx, filteredDrinks.value.length - 1))
}

const scrollToNextSection = () => {
  document.querySelector('#comida')?.scrollIntoView({ behavior: 'smooth' })
}

watch(filteredDrinks, () => {
  activeIndex.value = 0
  if (carouselRef.value) carouselRef.value.scrollLeft = 0
})

onMounted(async () => {
  drinks.value = await fetchDrinks()
})
</script>

<template>
  <section class="menu" id="carta">
    <div class="menu-header">
      <UiSectionLabel>Carta de bebidas</UiSectionLabel>
      <h2>Elige tu bebida</h2>
      <p>Explora nuestras categorías y descubre cada preparación.</p>
    </div>

    <UiCategoryFilter
      :categories="categories"
      :active="activeCategory"
      @select="selectCategory"
    />

    <p v-if="drinks.length === 0" class="empty-state">
      No hay bebidas disponibles por el momento.
    </p>
    <p v-else-if="filteredDrinks.length === 0" class="empty-state">
      No hay bebidas disponibles en esta categoría.
    </p>
    <div v-else class="carousel-wrapper">
      <div ref="carouselRef" class="drinks-grid" @scroll="onCarouselScroll">
        <UiDrinkCard
          v-for="drink in filteredDrinks"
          :key="drink.id"
          :drink="drink"
          @click="openModal"
        />
      </div>

      <!-- Flechas solo móvil/tablet -->
      <button
        v-if="filteredDrinks.length > 1"
        class="carousel-arrow prev"
        aria-label="Bebida anterior"
        @click="scrollPrev"
      >
        ‹
      </button>
      <button
        v-if="filteredDrinks.length > 1"
        class="carousel-arrow next"
        aria-label="Siguiente bebida"
        @click="scrollNext"
      >
        ›
      </button>

      <!-- Dots + hint -->
      <div v-if="filteredDrinks.length > 1" class="carousel-dots">
        <button
          v-for="(_drink, idx) in filteredDrinks"
          :key="idx"
          class="dot"
          :class="{ active: idx === activeIndex }"
          :aria-label="`Ir a bebida ${idx + 1}`"
          @click="scrollToIndex(idx)"
        />
      </div>
      <p v-if="filteredDrinks.length > 1" class="carousel-hint">Desliza para ver más →</p>

      <!-- Atajo a siguiente sección -->
      <button class="jump-next" @click="scrollToNextSection">Ver comida ↓</button>
    </div>

    <UiDrinkModal v-if="selectedDrink" :drink="selectedDrink" @close="closeModal" />
  </section>
</template>

<style scoped lang="scss">
.menu {
  background: #fff;
  padding: 100px 6%;
}

.menu-header {
  text-align: center;
  max-width: 700px;
  margin: auto;
}

.menu-header h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(45px, 6vw, 75px);
  line-height: 0.95;
  font-weight: 500;
  margin: 20px 0;
}

.menu-header h2 span {
  color: var(--gold);
  font-style: italic;
}

.menu-header p {
  color: var(--gray);
  line-height: 1.7;
}

.drinks-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.carousel-wrapper {
  max-width: 1200px;
  margin: auto;
  position: relative;
}

.carousel-arrow,
.carousel-dots,
.carousel-hint,
.jump-next {
  display: none;
}

.empty-state {
  max-width: 600px;
  margin: 40px auto 0;
  text-align: center;
  color: var(--gray);
  font-size: 14px;
  line-height: 1.7;
}

@include respond(desktop) {
  .drinks-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@include respond(tablet) {
  .menu {
    padding: 60px 0 75px;
  }

  .menu-header {
    padding: 0 16px;
  }

  .menu-header h2 {
    font-size: 48px;
    margin: 14px 0;
  }

  .menu-header p {
    font-size: 12px;
    line-height: 1.65;
  }

  .carousel-wrapper {
    position: relative;
    max-width: 100%;
  }

  .drinks-grid {
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
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    // Cada tarjeta se vuelve slide
    :deep(.drink) {
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
    width: 38px;
    height: 38px;
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
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
    transition: opacity 0.2s, transform 0.2s;

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    &.prev {
      left: 8px;
    }

    &.next {
      right: 8px;
    }
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
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #d9d9d9;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: var(--green);
      width: 22px;
      border-radius: 10px;
    }
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

    &:hover {
      background: var(--green);
      color: #fff;
    }
  }
}

@include respond(mobile-sm) {
  .menu {
    padding-left: 0;
    padding-right: 0;
  }

  .drinks-grid {
    padding-left: 12px;
    padding-right: 12px;
    gap: 12px;

    :deep(.drink) {
      flex-basis: 84vw;
    }
  }

  .carousel-arrow {
    width: 34px;
    height: 34px;
    font-size: 20px;
  }
}
</style>
