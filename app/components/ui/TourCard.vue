<script setup lang="ts">
import type { Tour } from '~/composables/useTours'

interface Props {
  tour: Tour
}

defineProps<Props>()
const emit = defineEmits<{ (e: 'click', tour: Tour): void }>()

const hasError = ref(false)

const formatPrice = (price: number | null) => {
  if (!price) return null
  return '$' + price.toLocaleString('es-CO')
}
</script>

<template>
  <article class="tour" data-reveal @click="emit('click', tour)">
    <div class="tour-photo" :class="{ 'no-photo': !tour.image_url || hasError }">
      <img
        v-if="tour.image_url"
        :key="tour.image_url"
        :src="tour.image_url"
        :alt="tour.name"
        loading="lazy"
        @error="hasError = true"
        @load="hasError = false"
      />
    </div>
    <div class="tour-content">
      <h3>{{ tour.name }}</h3>
      <span class="tour-duration">{{ tour.duration }} MIN</span>
      <p>{{ tour.description }}</p>
      <div class="tour-footer">
        <span v-if="formatPrice(tour.price)" class="tour-price">{{ formatPrice(tour.price) }} <small v-if="tour.type">· {{ tour.type }}</small></span>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.tour {
  background: var(--cream);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: 0.35s;
  cursor: pointer;
}

.tour:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
}

.tour-photo {
  height: 230px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(155deg, var(--green), var(--green-dark));
}

.tour-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}

.tour:hover .tour-photo img {
  transform: scale(1.06);
}

.tour-content {
  padding: 26px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.tour-content h3 {
  font-family: "Cormorant Garamond", serif;
  font-size: 27px;
  color: var(--green);
  margin-bottom: 6px;
}

.tour-duration {
  font-size: 10px;
  letter-spacing: 2px;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 10px;
}

.tour-content p {
  color: var(--gray);
  font-size: 13px;
  line-height: 1.7;
  flex: 1;
}

.tour-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}

.tour-price {
  font-size: 13px;
  font-weight: 700;
  color: var(--green);

  small {
    font-size: 11px;
    font-weight: 400;
    color: var(--gray);
  }
}

@include respond(tablet) {
  .tour-photo {
    height: 200px;
  }
}
</style>
