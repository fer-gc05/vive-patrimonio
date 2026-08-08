<script setup lang="ts">
import type { Drink } from '~/composables/useDrinks'

interface Props {
  drink: Drink
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

        <div class="modal-image" :class="{ 'no-image': !drink.image_url }">
          <img
            v-if="drink.image_url"
            :src="drink.image_url"
            :alt="drink.name"
          />
        </div>

        <div class="modal-body">
          <span class="modal-category">{{ drink.category_label }}</span>
          <h2>{{ drink.name }}</h2>
          <span v-if="formatPrice(drink.price)" class="modal-price">{{ formatPrice(drink.price) }}</span>
          <p v-if="drink.description" class="modal-description">{{ drink.description }}</p>
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

.modal-category {
  font-size: 10px;
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
}

.modal-description {
  color: var(--gray);
  font-size: 15px;
  line-height: 1.7;
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
