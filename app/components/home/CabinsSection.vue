<script setup lang="ts">
import type { Cabin } from '~/types'

const { fetchCabins, getWhatsappLink } = useCabins()
const { fetchSettings } = useSettings()
const cabins = ref<Cabin[]>([])
const whatsappNumber = ref('')
const selectedCabin = ref<Cabin | null>(null)

const openModal = (cabin: Cabin) => {
  selectedCabin.value = cabin
}

const closeModal = () => {
  selectedCabin.value = null
}

onMounted(async () => {
  const [cabinsData, settings] = await Promise.all([fetchCabins(), fetchSettings()])
  cabins.value = cabinsData
  if (settings?.whatsapp_number) {
    whatsappNumber.value = settings.whatsapp_number
  }
})
</script>

<template>
  <section class="cabins" id="cabanas">
    <div class="menu-header">
      <UiSectionLabel>Alojamiento</UiSectionLabel>
      <h2>Cabañas <span>& estadías</span></h2>
      <p>Disfruta de una experiencia única frente al río Sinú en nuestras cabañas.</p>
    </div>

    <p v-if="cabins.length === 0" class="empty-state">
      No hay cabañas disponibles por el momento.
    </p>
    <div v-else class="cabins-grid">
      <UiCabinCard
        v-for="cabin in cabins"
        :key="cabin.id"
        :cabin="cabin"
        @click="openModal"
      />
    </div>

    <UiCabinModal
      v-if="selectedCabin"
      :cabin="selectedCabin"
      :whatsapp-link="getWhatsappLink(selectedCabin.whatsapp_message || '', whatsappNumber)"
      @close="closeModal"
    />
  </section>
</template>

<style scoped lang="scss">
.cabins {
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

.cabins-grid {
  max-width: 1200px;
  margin: 55px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.empty-state {
  max-width: 600px;
  margin: 40px auto 0;
  text-align: center;
  color: var(--gray);
  font-size: 14px;
  line-height: 1.7;
}

@include respond(desktop) {
  .cabins-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include respond(tablet) {
  .cabins {
    padding: 60px 16px 75px;
  }

  .cabins-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 32px;
  }
}
</style>
