<script setup lang="ts">
const { fetchSettings } = useSettings()
const heroTitle = ref('Vive el río.<br><em>Vive Patrimonio.</em>')
const heroSubtitle = ref(
  'Una experiencia frente al río Sinú, acompañada de bebidas, sabores, tours en lancha y atardeceres inolvidables.'
)

onMounted(async () => {
  const settings = await fetchSettings()
  if (settings?.hero_title) {
    heroTitle.value = settings.hero_title
  }
  if (settings?.hero_subtitle) {
    heroSubtitle.value = settings.hero_subtitle
  }
})
</script>

<template>
  <section class="hero" id="inicio">
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
      poster="/img/hero.jpg"
      aria-hidden="true"
    >
      <source src="/video/vive-patrimonio.mp4" type="video/mp4" />
    </video>
    <img
      src="/img/hero.jpg"
      alt="Vive Patrimonio sobre el río Sinú"
      class="hero-image"
    />
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <span class="eyebrow">BAR · RESTAURANTE · TOURS · RÍO SINÚ</span>
      <h1 v-html="heroTitle"></h1>
      <p v-html="heroSubtitle"></p>
      <div class="hero-actions">
        <UiMainButton href="#carta">VER CARTA</UiMainButton>
        <UiGhostButton href="#tours">VER TOURS</UiGhostButton>
      </div>
    </div>
    <div class="scroll">DESLIZA ↓</div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  background: var(--green-dark);
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: none;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.18)),
    linear-gradient(0deg, rgba(0, 0, 0, 0.45), transparent 40%);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(1100px, 88%);
}

.hero h1 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(58px, 8vw, 105px);
  line-height: 0.85;
  font-weight: 500;
  margin: 25px 0;
}

.hero h1 em {
  color: #f4c875;
  font-style: italic;
}

.hero-content p {
  max-width: 520px;
  line-height: 1.8;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 35px;
}

.scroll {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.7);
  z-index: 2;
}

@media (min-width: 701px) {
  .hero-video {
    display: block;
  }

  .hero-video ~ .hero-image {
    opacity: 0;
  }
}

@include respond(tablet) {
  .hero {
    min-height: 100svh;
  }

  .hero-content {
    width: 88%;
    padding-top: 50px;
  }

  .hero h1 {
    font-size: 60px;
  }

  .hero-content p {
    font-size: 14px;
  }

  .hero-actions {
    gap: 10px;
  }
}
</style>
