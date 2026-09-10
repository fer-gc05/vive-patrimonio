<script setup lang="ts">
const { fetchSettings } = useSettings()
const title = ref('Todo lo que te espera')
const subtitle = ref('Bebidas, sabores, tours por el río y nuestros suéteres con identidad local.')

onMounted(async () => {
  const s = await fetchSettings()
  if (s?.offerings_title) title.value = s.offerings_title
  if (s?.offerings_subtitle) subtitle.value = s.offerings_subtitle
})
</script>

<template>
  <section class="offerings" id="oferta">
    <div class="offerings-inner" data-reveal>
      <UiSectionLabel>Nuestra oferta</UiSectionLabel>
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
      <div class="offerings-nav">
        <a href="#carta">Bebidas</a>
        <a href="#comida">Comida</a>
        <a href="#tours">Tours</a>
        <a href="#sueteres">Suéteres</a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.offerings {
  background: var(--green-dark);
  color: #fff;
  padding: 56px 6%;
  text-align: center;
}
.offerings-inner { max-width: 900px; margin: auto; }
.offerings h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(32px, 4.5vw, 52px);
  margin: 12px 0 10px;
  font-weight: 500;
}
.offerings p { color: rgba(255,255,255,0.78); line-height: 1.7; }
.offerings-nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 22px;
  a {
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff;
    padding: 10px 16px;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: 0.25s;
    &:hover { background: var(--gold); border-color: var(--gold); }
  }
}
</style>
