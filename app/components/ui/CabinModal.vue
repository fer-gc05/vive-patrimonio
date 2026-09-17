<script setup lang="ts">
import type { Cabin } from '~/types'

interface Props {
  cabin: Cabin
  whatsappLink: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void }>()

const activeImageIndex = ref(0)
const checkInDate = ref('')
const checkOutDate = ref('')
const numAdults = ref(1)
const numChildren = ref(0)

const formatPrice = (price: number | null) => {
  if (!price) return null
  return '$' + price.toLocaleString('es-CO')
}

const prevImage = () => {
  const total = props.cabin.images?.length || 0
  if (total === 0) return
  activeImageIndex.value = (activeImageIndex.value - 1 + total) % total
}

const nextImage = () => {
  const total = props.cabin.images?.length || 0
  if (total === 0) return
  activeImageIndex.value = (activeImageIndex.value + 1) % total
}

const buildWhatsAppMessage = () => {
  const totalPeople = numAdults.value + numChildren.value
  let msg = `Hola, me interesa reservar la cabaña "${props.cabin.name}".\n`
  msg += `📍 Ubicación: ${props.cabin.location || 'No especificada'}\n`
  if (checkInDate.value) msg += `📅 Entrada: ${checkInDate.value}\n`
  if (checkOutDate.value) msg += `📅 Salida: ${checkOutDate.value}\n`
  msg += `👥 Personas: ${totalPeople} (${numAdults.value} adultos`
  if (numChildren.value > 0) msg += `, ${numChildren.value} niños`
  msg += `)\n`
  if (props.cabin.price) msg += `💰 Precio: $${props.cabin.price.toLocaleString('es-CO')}\n`
  msg += `\nQuisiera confirmar disponibilidad. ¡Gracias!`
  return msg
}

const whatsappHref = computed(() => {
  const msg = buildWhatsAppMessage()
  return `${props.whatsappLink}&text=${encodeURIComponent(msg)}`
})

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="handleBackdropClick">
      <div class="modal">
        <button class="modal-close" @click="emit('close')">✕</button>

        <div class="carousel">
          <div class="carousel-images" :class="{ 'no-image': !cabin.images?.length }">
            <template v-if="cabin.images?.length">
              <img
                v-for="(img, i) in cabin.images"
                :key="img"
                :src="img"
                :alt="`${cabin.name} ${i + 1}`"
                :class="{ active: i === activeImageIndex }"
              />
            </template>
          </div>
          <template v-if="(cabin.images?.length || 0) > 1">
            <button class="carousel-btn carousel-prev" @click="prevImage">‹</button>
            <button class="carousel-btn carousel-next" @click="nextImage">›</button>
            <div class="carousel-dots">
              <span
                v-for="(_, i) in cabin.images"
                :key="i"
                class="dot"
                :class="{ active: i === activeImageIndex }"
                @click="activeImageIndex = i"
              />
            </div>
          </template>
        </div>

        <div class="modal-body">
          <h2>{{ cabin.name }}</h2>

          <div class="cabin-stats">
            <span v-if="cabin.rooms">🛏 {{ cabin.rooms }} hab.</span>
            <span v-if="cabin.bathrooms">🚿 {{ cabin.bathrooms }} baños</span>
            <span v-if="cabin.beds">🛌 {{ cabin.beds }} camas</span>
            <span>👥 {{ cabin.capacity }} personas</span>
          </div>

          <p v-if="cabin.description" class="modal-description">{{ cabin.description }}</p>

          <div v-if="cabin.services?.length" class="services-section">
            <h4>Servicios incluidos</h4>
            <div class="services-list">
              <span v-for="service in cabin.services" :key="service" class="service-tag">{{ service }}</span>
            </div>
          </div>

          <div v-if="cabin.location" class="location-section">
            <h4>Ubicación</h4>
            <p>📍 {{ cabin.location }}</p>
          </div>

          <div v-if="cabin.price" class="price-section">
            <span class="price-label">Precio por noche</span>
            <span class="price-value">{{ formatPrice(cabin.price) }}</span>
          </div>

          <div class="booking-section">
            <h4>Reservar</h4>
            <div class="booking-fields">
              <div class="field">
                <label>Fecha de entrada</label>
                <input v-model="checkInDate" type="date" />
              </div>
              <div class="field">
                <label>Fecha de salida</label>
                <input v-model="checkOutDate" type="date" />
              </div>
              <div class="field">
                <label>Adultos</label>
                <div class="counter">
                  <button @click="numAdults = Math.max(1, numAdults - 1)">−</button>
                  <span>{{ numAdults }}</span>
                  <button @click="numAdults = Math.min(cabin.capacity, numAdults + 1)">+</button>
                </div>
              </div>
              <div class="field">
                <label>Niños</label>
                <div class="counter">
                  <button @click="numChildren = Math.max(0, numChildren - 1)">−</button>
                  <span>{{ numChildren }}</span>
                  <button @click="numChildren++">+</button>
                </div>
              </div>
            </div>
          </div>

          <a
            :href="whatsappHref"
            class="modal-whatsapp"
            target="_blank"
            rel="noopener"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: #fff;
  border-radius: 12px;
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background 0.2s;

  &:hover {
    background: #fff;
  }
}

.carousel {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(155deg, var(--green), var(--green-dark));
}

.carousel-images {
  position: relative;
  width: 100%;
  height: 100%;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.4s ease;

    &.active {
      opacity: 1;
    }
  }
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background 0.2s;

  &:hover {
    background: #fff;
  }
}

.carousel-prev {
  left: 12px;
}

.carousel-next {
  right: 12px;
}

.carousel-dots {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.2s;

  &.active {
    background: var(--gold);
  }
}

.modal-body {
  padding: 28px;
}

.modal-body h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: 36px;
  color: var(--green);
  margin: 0 0 14px;
}

.cabin-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 18px;

  span {
    font-size: 13px;
    font-weight: 600;
    color: var(--green);
    background: var(--cream);
    padding: 6px 12px;
    border-radius: 20px;
  }
}

.modal-description {
  color: var(--gray);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 20px;
}

.services-section,
.location-section {
  margin-bottom: 20px;

  h4 {
    font-family: "Cormorant Garamond", serif;
    font-size: 20px;
    color: var(--green);
    margin-bottom: 10px;
  }
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service-tag {
  background: var(--cream);
  border: 1px solid var(--border);
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 20px;
  color: #2b2b2b;
}

.location-section p {
  color: var(--gray);
  font-size: 14px;
}

.price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--cream);
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.price-label {
  font-size: 14px;
  color: var(--gray);
}

.price-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--gold);
}

.booking-section {
  margin-bottom: 24px;

  h4 {
    font-family: "Cormorant Garamond", serif;
    font-size: 20px;
    color: var(--green);
    margin-bottom: 14px;
  }
}

.booking-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #2b2b2b;
  }

  input {
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: var(--green);
    }
  }
}

.counter {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;

  button {
    width: 40px;
    height: 40px;
    background: var(--cream);
    border: none;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #e5ddd0;
    }
  }

  span {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: var(--green);
  }
}

.modal-whatsapp {
  display: block;
  text-align: center;
  background: #25d366;
  color: #fff;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #1da851;
  }
}

@include respond(mobile) {
  .modal-overlay {
    padding: 16px;
    align-items: flex-end;
  }

  .modal {
    border-radius: 12px 12px 0 0;
    max-height: 85vh;
  }

  .carousel {
    height: 250px;
    border-radius: 12px 12px 0 0;
  }

  .modal-body {
    padding: 24px;
  }

  .modal-body h2 {
    font-size: 28px;
  }

  .booking-fields {
    grid-template-columns: 1fr;
  }
}
</style>
