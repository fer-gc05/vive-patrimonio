<script setup lang="ts">
const { fetchTours, getWhatsappLink } = useTours()
const tours = ref([])

onMounted(async () => {
  tours.value = await fetchTours()
})
</script>

<template>
  <section class="tours" id="tours">
    <div class="menu-header">
      <UiSectionLabel>Vive el río</UiSectionLabel>
      <h2>Tours y <span>paseos</span></h2>
      <p>Recorridos guiados por el río Sinú, pensados para grupos, familias y parejas.</p>
    </div>

    <div class="tours-grid">
      <UiTourCard
        v-for="tour in tours"
        :key="tour.id"
        :tour="tour"
        :whatsapp-link="getWhatsappLink(tour.whatsapp_message)"
      />
    </div>

    <p class="food-note">
      * Duraciones y precios de referencia — ajústalos a tus recorridos reales.
    </p>
  </section>
</template>

<style scoped lang="scss">
.tours {
  background: #fff;
  padding: 100px 6%;
}

.menu-header {
  text-align: center;
  max-width: 700px;
  margin: auto;
}

.menu-header h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(45px, 6vw, 75px);
  line-height: 0.95;
  font-weight: 500;
  margin: 20px 0;
}

.menu-header h2 span {
  color: var(--gold);
  font-style: italic;
}

.menu-header p {
  color: var(--gray);
  line-height: 1.7;
}

.tours-grid {
  max-width: 1200px;
  margin: 55px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.food-note {
  max-width: 1200px;
  margin: 45px auto 0;
  text-align: center;
  color: var(--gray);
  font-size: 11px;
  letter-spacing: 0.5px;
  font-style: italic;
}

@include respond(desktop) {
  .tours-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include respond(tablet) {
  .tours {
    padding: 60px 16px 75px;
  }

  .tours-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 32px;
  }
}
</style>
