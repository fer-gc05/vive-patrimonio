<script setup lang="ts">
import type { Tour } from '~/types'

interface Props {
  tour: Tour
  whatsappNumber: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void }>()

const activeImageIndex = ref(0)
const tourDate = ref('')
const numAdults = ref(1)
const numChildren = ref(0)

const allImages = computed(() => {
  if (props.tour.images?.length) return props.tour.images
  if (props.tour.image_url) return [props.tour.image_url]
  return []
})

const formatPrice = (price: number | null) => {
  if (!price) return null
  return '$' + price.toLocaleString('es-CO')
}

const prevImage = () => {
  const total = allImages.value.length
  if (total === 0) return
  activeImageIndex.value = (activeImageIndex.value - 1 + total) % total
}

const nextImage = () => {
  const total = allImages.value.length
  if (total === 0) return
  activeImageIndex.value = (activeImageIndex.value + 1) % total
}

const buildWhatsAppMessage = () => {
  const totalPeople = numAdults.value + numChildren.value
  let msg = `Hola, me interesa el tour "${props.tour.name}".\n`
  msg += `Duración: ${props.tour.duration} min\n`
  if (tourDate.value) msg += `📅 Fecha: ${tourDate.value}\n`
  msg += `👥 Personas: ${totalPeople} (${numAdults.value} adultos`
  if (numChildren.value > 0) msg += `, ${numChildren.value} niños`
  msg += `)\n`
  if (props.tour.price) msg += `💰 Precio: $${props.tour.price.toLocaleString('es-CO')}\n`
  if (props.tour.type) msg += `Tipo: ${props.tour.type}\n`
  msg += `\nQuisiera reservar. ¡Gracias!`
  return msg
}

const whatsappHref = computed(() => {
  const msg = buildWhatsAppMessage()
  return `https://wa.me/${props.whatsappNumber}?text=${encodeURIComponent(msg)}`
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
          <div class="carousel-images" :class="{ 'no-image': !allImages.length }">
            <template v-if="allImages.length">
              <img
                v-for="(img, i) in allImages"
                :key="img"
                :src="img"
                :alt="`${tour.name} ${i + 1}`"
                :class="{ active: i === activeImageIndex }"
              />
            </template>
          </div>
          <template v-if="allImages.length > 1">
            <button class="carousel-btn carousel-prev" @click="prevImage">‹</button>
            <button class="carousel-btn carousel-next" @click="nextImage">›</button>
            <div class="carousel-dots">
              <span
                v-for="(_, i) in allImages"
                :key="i"
                class="dot"
                :class="{ active: i === activeImageIndex }"
                @click="activeImageIndex = i"
              />
            </div>
          </template>
        </div>

        <div class="modal-body">
          <span class="modal-meta">{{ tour.duration }} MIN</span>
          <h2>{{ tour.name }}</h2>
          <span v-if="formatPrice(tour.price)" class="modal-price">
            {{ formatPrice(tour.price) }} <small v-if="tour.type">· {{ tour.type }}</small>
          </span>
          <p v-if="tour.description" class="modal-description">{{ tour.description }}</p>

          <div class="booking-section">
            <h4>Reservar este tour</h4>
            <div class="booking-fields">
              <div class="field">
                <label>Fecha del tour</label>
                <input v-model="tourDate" type="date" />
              </div>
              <div class="field">
                <label>Adultos</label>
                <div class="counter">
                  <button @click="numAdults = Math.max(1, numAdults - 1)">−</button>
                  <span>{{ numAdults }}</span>
                  <button @click="numAdults++">+</button>
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
  max-width: 500px;
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

.modal-meta {
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 700;
  color: var(--gold);
  text-transform: uppercase;
}

.modal-body h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: 36px;
  color: var(--green);
  margin: 10px 0;
}

.modal-price {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 16px;

  small {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray);
  }
}

.modal-description {
  color: var(--gray);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 24px;
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
  grid-template-columns: 1fr 1fr 1fr;
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
