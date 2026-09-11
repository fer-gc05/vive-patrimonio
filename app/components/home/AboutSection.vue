<script setup lang="ts">
const { fetchSettings } = useSettings()
const title = ref('Quiénes somos')
const text = ref('En Vive Patrimonio celebramos el río Sinú. Somos un bar y restaurante frente al agua donde la cultura, la gastronomía y los atardeceres se viven con calma y alegría. Nacimos para conectar a locales y visitantes con el patrimonio natural de Montería.')
const imageUrl = ref('/img/atardecer.jpg')
const videoUrl = ref('/video/vive-patrimonio.mp4')

onMounted(async () => {
  const s = await fetchSettings()
  if (s?.about_title) title.value = s.about_title
  if (s?.about_text) text.value = s.about_text
  if (s?.about_image_url) imageUrl.value = s.about_image_url
  else if (s?.experience_image_url) imageUrl.value = s.experience_image_url
  if ((s as any)?.about_video_url) videoUrl.value = (s as any).about_video_url
})
</script>

<template>
  <section class="about" id="nosotros">
    <div class="about-inner">
      <div class="about-text" data-reveal>
        <UiSectionLabel>Sobre nosotros</UiSectionLabel>
        <h2>{{ title }}</h2>
        <p>{{ text }}</p>
        <ul class="about-points">
          <li><strong>Frente al Sinú</strong> — terraza, brisa y atardeceres todos los días</li>
          <li><strong>Cultura local</strong> — sabores del Caribe y talento de la región</li>
          <li><strong>Turismo responsable</strong> — paseos que cuidan el río</li>
        </ul>
        <div class="about-actions">
          <UiMainButton href="#mision">Nuestra misión y visión</UiMainButton>
          <UiGhostButton href="#oferta">Ver lo que ofrecemos</UiGhostButton>
        </div>
      </div>
      <div class="about-media" data-reveal>
        <video
          v-if="videoUrl"
          :src="videoUrl"
          :poster="imageUrl"
          controls
          preload="metadata"
          playsinline
          controlsList="nodownload"
          class="about-video"
        >
          Tu navegador no soporta video.
        </video>
        <img v-else :src="imageUrl" alt="Vive Patrimonio - quiénes somos" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  background: var(--cream);
  padding: 90px 6%;
}
.about-inner {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}
.about-text h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(38px, 5vw, 62px);
  line-height: 0.95;
  font-weight: 500;
  margin: 16px 0 18px;
}
.about-text p {
  color: var(--gray);
  line-height: 1.8;
  font-size: 15px;
}
.about-points {
  list-style: none;
  margin: 22px 0 0;
  display: grid;
  gap: 10px;
  li {
    font-size: 13px;
    line-height: 1.6;
    color: #2b2b2b;
    padding-left: 18px;
    position: relative;
    &::before {
      content: "—";
      position: absolute;
      left: 0;
      color: var(--gold);
      font-weight: 700;
    }
    strong { color: var(--green); }
  }
}
.about-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 26px;
}
.about-media {
  height: 520px;
  overflow: hidden;
  border-radius: 4px;
  background: #000;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .about-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: #000;
    border-radius: 4px;
  }
}

@include respond(tablet) {
  .about { padding: 60px 16px; }
  .about-inner { grid-template-columns: 1fr; gap: 28px; }
  .about-media {
    height: auto;
    aspect-ratio: 16 / 9;
    min-height: 220px;
    max-height: 420px;
    .about-video {
      object-fit: contain;
      aspect-ratio: 16 / 9;
      height: auto;
      max-height: 420px;
    }
  }
}
</style>
