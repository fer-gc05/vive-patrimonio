<script setup lang="ts">
useSeoMeta({
  title: 'Vive Patrimonio | Bar y Restaurante Río Sinú',
  description:
    'Vive Patrimonio - Bar y restaurante sobre el río Sinú. Carta de bebidas, comida típica de la región y tours en lancha por el río.',
  ogTitle: 'Vive Patrimonio | Bar y Restaurante Río Sinú',
  ogDescription:
    'Disfruta bebidas, sabores y tours frente al río Sinú. Una experiencia inolvidable en Vive Patrimonio.',
  ogImage: '/img/hero.jpg',
  twitterCard: 'summary_large_image'
})

const { observe } = useScrollReveal()

onMounted(() => {
  observe('[data-reveal]')
})
</script>

<template>
  <main>
    <HomeHeroSection />
    <HomeAboutSection />
    <HomeMissionVisionSection />
    <HomePresentationSection />
    <HomeOfferingsBar />
    <HomeSweatersSection />
    <HomeDrinksSection />
    <HomeFoodSection />
    <HomeToursSection />
    <HomeExperienceSection />
    <HomeGallerySection />
    <HomeContactSection />
  </main>
</template>
