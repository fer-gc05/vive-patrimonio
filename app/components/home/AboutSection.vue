<script setup lang="ts">
const { fetchSettings } = useSettings()
const title = ref('Quiénes somos')
const text = ref('En Vive Patrimonio celebramos el río Sinú. Somos un bar y restaurante frente al agua donde la cultura, la gastronomía y los atardeceres se viven con calma y alegría. Nacimos para conectar a locales y visitantes con el patrimonio natural de Montería.')
const imageUrl = ref('')
const loaded = ref(false)

onMounted(async () => {
  const s = await fetchSettings()
  if (s?.about_title) title.value = s.about_title
  if (s?.about_text) text.value = s.about_text
  imageUrl.value = s?.about_image_url || s?.experience_image_url || '/img/atardecer.jpg'
  loaded.value = true
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
        <Transition name="img-fade">
          <img v-if="loaded" :src="imageUrl" alt="Vive Patrimonio - quiénes somos" loading="lazy" />
        </Transition>
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
  background: var(--green-dark);
  img { width: 100%; height: 100%; object-fit: cover; }
}
.img-fade-enter-active { transition: opacity 0.8s ease; }
.img-fade-enter-from { opacity: 0; }

@include respond(tablet) {
  .about { padding: 60px 16px; }
  .about-inner { grid-template-columns: 1fr; gap: 28px; }
  .about-media { height: 360px; }
}
</style>
