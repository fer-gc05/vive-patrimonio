<script setup lang="ts">
import type { Tour } from '~/composables/useTours'

interface Props {
  tour: Tour
  whatsappLink: string
}

defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void }>()

const formatPrice = (price: number | null) => {
  if (!price) return null
  return '$' + price.toLocaleString('es-CO')
}

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

        <div class="modal-image" :class="{ 'no-image': !tour.image_url }">
          <img
            v-if="tour.image_url"
            :src="tour.image_url"
            :alt="tour.name"
          />
        </div>

        <div class="modal-body">
          <span class="modal-meta">{{ tour.duration }} MIN</span>
          <h2>{{ tour.name }}</h2>
          <span v-if="formatPrice(tour.price)" class="modal-price">
            {{ formatPrice(tour.price) }} <small v-if="tour.type">· {{ tour.type }}</small>
          </span>
          <p v-if="tour.description" class="modal-description">{{ tour.description }}</p>
          <a
            v-if="tour.whatsapp_message && whatsappLink"
            :href="whatsappLink"
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
}

.modal-close:hover {
  background: #fff;
}

.modal-image {
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(155deg, var(--green), var(--green-dark));
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin-bottom: 20px;
}

.modal-whatsapp {
  display: inline-block;
  background: #25d366;
  color: #fff;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
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

  .modal-image {
    height: 250px;
    border-radius: 12px 12px 0 0;
  }

  .modal-body {
    padding: 24px;
  }

  .modal-body h2 {
    font-size: 28px;
  }
}
</style>
