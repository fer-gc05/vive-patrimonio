<script setup lang="ts">
const { fetchGallery } = useGallery()
const images = ref<any[]>([])

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
    <div v-else class="masonry">
      <figure
        v-for="image in images"
        :key="image.id"
        class="masonry-item"
      >
        <img
          :src="image.image_url"
          :alt="image.alt || 'Foto Vive Patrimonio'"
          loading="lazy"
        />
      </figure>
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
  font-size: clamp(45px, 6vw, 75px);
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
    padding: 64px 12px;
  }
  .gallery-title {
    margin-bottom: 28px;
  }
  .masonry {
    column-count: 2;
    column-gap: 8px;
  }
  .masonry-item { margin-bottom: 8px; }
}

@media (max-width: 520px) {
  .masonry { column-count: 1; }
}
</style>
