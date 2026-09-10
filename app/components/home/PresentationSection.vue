<template>
  <section class="presentation">
    <UiSectionLabel>Vive Patrimonio</UiSectionLabel>
    <h2>Más que un bar, <span>una experiencia frente al río</span></h2>
    <p>Bebidas, cocina típica, tours en lancha y suéteres con sello local. Todo en un mismo lugar, con la brisa del Sinú de fondo.</p>
  </section>
</template>

<style scoped lang="scss">
.presentation {
  padding: 110px 20px 90px;
  text-align: center;
}

.presentation h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(45px, 6vw, 75px);
  line-height: 0.95;
  font-weight: 500;
  margin: 20px 0;
}

.presentation h2 span {
  color: var(--gold);
  font-style: italic;
}

.presentation p {
  max-width: 600px;
  margin: auto;
  line-height: 1.8;
  color: var(--gray);
}

@include respond(tablet) {
  .presentation {
    padding: 72px 22px 58px;
  }

  .presentation h2 {
    font-size: 49px;
    margin: 16px 0;
  }

  .presentation p {
    font-size: 13px;
    line-height: 1.7;
  }
}
</style>
