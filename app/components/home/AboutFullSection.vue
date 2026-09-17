<script setup lang="ts">
const { fetchSettings } = useSettings()

const title = ref('Quiénes somos')
const text = ref('En Vive Patrimonio celebramos el río Sinú. Somos un bar y restaurante frente al agua donde la cultura, la gastronomía y los atardeceres se viven con calma y alegría. Nacimos para conectar a locales y visitantes con el patrimonio natural de Montería.')
const imageUrl = ref('/img/atardecer.jpg')
const videoUrl = ref('/video/vive-patrimonio.mp4')
const missionTitle = ref('Misión')
const missionText = ref('Brindar una experiencia auténtica frente al río Sinú, con sabores típicos, atención cercana y recorridos que conectan a visitantes y locales con nuestro patrimonio natural y cultural.')
const visionTitle = ref('Visión')
const visionText = ref('Ser el punto de encuentro más querido del río Sinú, referente de turismo sostenible, tradición y hospitalidad en Montería.')

onMounted(async () => {
  const s = await fetchSettings()
  if (s?.about_title) title.value = s.about_title
  if (s?.about_text) text.value = s.about_text
  if (s?.about_image_url) imageUrl.value = s.about_image_url
  else if (s?.experience_image_url) imageUrl.value = s.experience_image_url
  if ((s as any)?.about_video_url) videoUrl.value = (s as any).about_video_url
  if (s?.mission_title) missionTitle.value = s.mission_title
  if (s?.mission_text) missionText.value = s.mission_text
  if (s?.vision_title) visionTitle.value = s.vision_title
  if (s?.vision_text) visionText.value = s.vision_text
})
</script>

<template>
  <section class="about-full" id="nosotros">
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

    <div class="mv-section">
      <div class="mv-head" data-reveal>
        <UiSectionLabel>Nuestra razón de ser</UiSectionLabel>
        <h2>Misión <span>&</span> Visión</h2>
        <p>Lo que nos mueve cada día frente al río.</p>
      </div>
      <div class="mv-grid">
        <article class="mv-card mv-card--mission" data-reveal>
          <div class="mv-icon">◈</div>
          <h3>{{ missionTitle }}</h3>
          <p>{{ missionText }}</p>
        </article>
        <article class="mv-card mv-card--vision" data-reveal>
          <div class="mv-icon">◎</div>
          <h3>{{ visionTitle }}</h3>
          <p>{{ visionText }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-full {
  background: var(--cream);
  padding: 90px 6% 60px;
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

    strong {
      color: var(--green);
    }
  }
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

.mv-section {
  max-width: 1100px;
  margin: 80px auto 0;
}

.mv-head {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 44px;

  h2 {
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(38px, 5vw, 62px);
    line-height: 0.95;
    font-weight: 500;
    margin: 14px 0 10px;

    span {
      color: var(--gold);
      font-style: italic;
    }
  }

  p {
    color: var(--gray);
    line-height: 1.7;
  }
}

.mv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.mv-card {
  background: #fff;
  padding: 36px 30px;
  border-left: 3px solid var(--gold);

  h3 {
    font-family: "Cormorant Garamond", serif;
    font-size: 28px;
    color: var(--green);
    margin: 10px 0 12px;
  }

  p {
    color: var(--gray);
    line-height: 1.8;
    font-size: 14px;
  }
}

.mv-card--vision {
  background: var(--green);
  border-left-color: var(--gold);

  h3 {
    color: #fff;
  }

  p {
    color: rgba(255, 255, 255, 0.82);
  }

  .mv-icon {
    color: var(--gold);
  }
}

.mv-icon {
  font-size: 18px;
  letter-spacing: 2px;
  color: var(--gold);
}

@include respond(tablet) {
  .about-full {
    padding: 60px 16px 40px;
  }

  .about-inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }

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

  .mv-section {
    margin-top: 50px;
  }

  .mv-grid {
    grid-template-columns: 1fr;
  }
}
</style>
