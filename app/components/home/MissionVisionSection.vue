<script setup lang="ts">
const { fetchSettings } = useSettings()
const missionTitle = ref('Misión')
const missionText = ref('Brindar una experiencia auténtica frente al río Sinú, con sabores típicos, atención cercana y recorridos que conectan a visitantes y locales con nuestro patrimonio natural y cultural.')
const visionTitle = ref('Visión')
const visionText = ref('Ser el punto de encuentro más querido del río Sinú, referente de turismo sostenible, tradición y hospitalidad en Montería.')

onMounted(async () => {
  const s = await fetchSettings()
  if (s?.mission_title) missionTitle.value = s.mission_title
  if (s?.mission_text) missionText.value = s.mission_text
  if (s?.vision_title) visionTitle.value = s.vision_title
  if (s?.vision_text) visionText.value = s.vision_text
})
</script>

<template>
  <section class="mv" id="mision">
    <div class="mv-inner">
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
.mv {
  background: #fff;
  padding: 90px 6%;
}
.mv-inner { max-width: 1100px; margin: auto; }
.mv-head { text-align: center; max-width: 700px; margin: 0 auto 44px; }
.mv-head h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(38px, 5vw, 62px);
  line-height: 0.95;
  font-weight: 500;
  margin: 14px 0 10px;
  span { color: var(--gold); font-style: italic; }
}
.mv-head p { color: var(--gray); line-height: 1.7; }
.mv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.mv-card {
  background: var(--cream);
  padding: 36px 30px;
  border-left: 3px solid var(--gold);
  h3 {
    font-family: "Cormorant Garamond", serif;
    font-size: 28px;
    color: var(--green);
    margin: 10px 0 12px;
  }
  p { color: var(--gray); line-height: 1.8; font-size: 14px; }
}
.mv-card--vision { background: var(--green); border-left-color: var(--gold);
  h3 { color: #fff; }
  p { color: rgba(255,255,255,0.82); }
  .mv-icon { color: var(--gold); }
}
.mv-icon { font-size: 18px; letter-spacing: 2px; color: var(--gold); }

@include respond(tablet) {
  .mv { padding: 60px 16px; }
  .mv-grid { grid-template-columns: 1fr; }
}
</style>
