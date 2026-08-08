<script setup lang="ts">
const { fetchGallery } = useGallery()
const images = ref([])

onMounted(async () => {
  images.value = await fetchGallery()
})
</script>

<template>
  <section class="gallery" id="galeria">
    <div class="gallery-title">
      <UiSectionLabel>Galería</UiSectionLabel>
      <h2>Vive el momento.</h2>
    </div>
    <div class="gallery-grid">
      <img
        v-for="(image, index) in images"
        :key="image.id"
        :src="image.image_url"
        :alt="image.alt"
        loading="lazy"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  padding: 100px 6%;
}

.gallery-title {
  text-align: center;
  margin-bottom: 50px;
}

.gallery-title h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(45px, 6vw, 75px);
  line-height: 0.95;
  font-weight: 500;
  margin: 20px 0;
}

.gallery-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 300px 300px;
  gap: 15px;
}

.gallery-grid img {
  height: 100%;
  object-fit: cover;
}

.gallery-grid img:first-child {
  grid-row: span 2;
}

@include respond(tablet) {
  .gallery {
    padding: 70px 16px;
  }

  .gallery-title {
    margin-bottom: 35px;
  }

  .gallery-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 210px 170px 170px;
    gap: 9px;
  }

  .gallery-grid img:first-child {
    grid-column: span 2;
    grid-row: span 1;
  }
}
</style>
