<script setup lang="ts">
const { fetchGallery } = useGallery()
const images = ref<any[]>([])
const carouselRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

const getScrollAmount = () => {
  const el = carouselRef.value
  if (!el) return 320
  const first = el.firstElementChild as HTMLElement | null
  const gap = parseInt(getComputedStyle(el).gap || '12', 10) || 12
    if (first) return first.offsetWidth + gap
    return el.clientWidth - 40
}
const scrollPrev = () => carouselRef.value?.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' })
const scrollNext = () => carouselRef.value?.scrollBy({ left: getScrollAmount(), behavior: 'smooth' })
const scrollToIndex = (i: number) => {
  const el = carouselRef.value
  if (!el) return
  const gap = parseInt(getComputedStyle(el).gap || '12', 10) || 12
  const first = el.firstElementChild as HTMLElement | null
    const w = first ? first.offsetWidth + gap : el.clientWidth - 40
  el.scrollTo({ left: w * i, behavior: 'smooth' })
}
const onScroll = () => {
  const el = carouselRef.value
  if (!el) return
  const w = getScrollAmount()
  if (!w) return
  activeIndex.value = Math.max(0, Math.min(Math.round(el.scrollLeft / w), images.value.length - 1))
}

onMounted(async () => {
  images.value = await fetchGallery()
})
</script>

<template>
  <section class="gallery" id="galeria">
    <div class="gallery-title">
      <UiSectionLabel>Galería</UiSectionLabel>
      <h2>Vive el momento.</h2>
      <p class="gallery-subtitle">Fotos verticales u horizontales — todas encajan como un tetris visual.</p>
    </div>
    <p v-if="images.length === 0" class="empty-state">
      No hay fotos disponibles por el momento.
    </p>

    <!-- Desktop: masonry -->
    <div v-if="images.length" class="masonry">
      <figure v-for="image in images" :key="image.id" class="masonry-item">
        <img :src="image.image_url" :alt="image.alt || 'Foto Vive Patrimonio'" loading="lazy" />
      </figure>
    </div>

    <!-- Mobile: carousel -->
    <div v-if="images.length" class="gallery-carousel-wrap">
      <div ref="carouselRef" class="gallery-carousel" @scroll="onScroll">
        <figure v-for="image in images" :key="`m-${image.id}`" class="carousel-item">
          <img :src="image.image_url" :alt="image.alt || 'Foto Vive Patrimonio'" loading="lazy" />
        </figure>
      </div>
      <button v-if="images.length > 1" class="carousel-arrow prev" aria-label="Anterior" @click="scrollPrev">‹</button>
      <button v-if="images.length > 1" class="carousel-arrow next" aria-label="Siguiente" @click="scrollNext">›</button>
      <div v-if="images.length > 1" class="carousel-dots">
        <button v-for="(_, idx) in images" :key="idx" class="dot" :class="{ active: idx === activeIndex }" :aria-label="`Ir a foto ${idx+1}`" @click="scrollToIndex(idx)" />
      </div>
      <p v-if="images.length > 1" class="carousel-hint">Desliza para ver más →</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  padding: 100px 6%;
  background: #fff;
}

.gallery-title {
  text-align: center;
  margin-bottom: 44px;
}

.gallery-title h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(38px, 6vw, 75px);
  line-height: 0.95;
  font-weight: 500;
  margin: 16px 0 10px;
}

.gallery-subtitle {
  color: var(--gray);
  font-size: 13px;
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto;
}

.masonry {
  max-width: 1280px;
  margin: auto;
  column-count: 3;
  column-gap: 14px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 14px;
  overflow: hidden;
  background: var(--cream);
  border-radius: 4px;
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.45s ease;
  }
  &:hover img { transform: scale(1.03); }
}

.gallery-carousel-wrap { display: none; }

.empty-state {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  color: var(--gray);
  font-size: 14px;
  line-height: 1.7;
}

@media (max-width: 1000px) {
  .masonry { column-count: 2; }
}

@include respond(tablet) {
  .gallery {
    padding: 64px 0 48px;
  }
  .gallery-title {
    margin-bottom: 24px;
    padding: 0 16px;
  }
  .gallery-title h2 { font-size: 40px; }

  // Ocultar masonry en móvil, mostrar carrusel
  .masonry { display: none; }

  .gallery-carousel-wrap {
    display: block;
    position: relative;
    max-width: 100%;
  }

  .gallery-carousel {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    gap: 12px;
    padding: 0 16px 12px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }

  .carousel-item {
    flex: 0 0 calc(100% - 40px);
    max-width: 360px;
    scroll-snap-align: center;
    scroll-snap-stop: always;
    border-radius: 6px;
    overflow: hidden;
    background: var(--cream);
    display: grid;
    place-items: center;
    min-height: 260px;
    max-height: 68vh;
    img {
      width: 100%;
      height: auto;
      max-height: 68vh;
      object-fit: contain;
      display: block;
    }
  }

  .carousel-arrow {
    display: flex;
    position: absolute;
    top: 42%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--green);
    color: #fff;
    border: none;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    box-shadow: 0 4px 16px rgba(0,0,0,0.22);
    &:active { transform: translateY(-50%) scale(0.95); }
    &.prev { left: 8px; }
    &.next { right: 8px; }
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 14px;
  }
  .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #d9d9d9;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s;
    &.active { background: var(--green); width: 22px; border-radius: 10px; }
  }
  .carousel-hint {
    text-align: center;
    margin-top: 8px;
    font-size: 11px;
    letter-spacing: 0.6px;
    color: var(--gray);
    opacity: 0.8;
  }
}
</style>
