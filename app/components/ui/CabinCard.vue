<script setup lang="ts">
import type { Cabin } from '~/types'

interface Props {
  cabin: Cabin
}

defineProps<Props>()
const emit = defineEmits<{ (e: 'click', cabin: Cabin): void }>()

const hasError = ref(false)

const formatPrice = (price: number | null) => {
  if (!price) return null
  return '$' + price.toLocaleString('es-CO')
}
</script>

<template>
  <article class="cabin" data-reveal @click="emit('click', cabin)">
    <div class="cabin-photo" :class="{ 'no-photo': !cabin.images?.length || hasError }">
      <img
        v-if="cabin.images?.length"
        :key="cabin.images[0]"
        :src="cabin.images[0]"
        :alt="cabin.name"
        loading="lazy"
        @error="hasError = true"
        @load="hasError = false"
      />
      <span class="capacity-badge">{{ cabin.capacity }} personas</span>
    </div>
    <div class="cabin-content">
      <h3>{{ cabin.name }}</h3>
      <div class="cabin-meta">
        <span v-if="cabin.rooms">{{ cabin.rooms }} hab.</span>
        <span v-if="cabin.bathrooms">{{ cabin.bathrooms }} baños</span>
        <span v-if="cabin.beds">{{ cabin.beds }} camas</span>
      </div>
      <p v-if="cabin.description" class="cabin-desc">{{ cabin.description }}</p>
      <div class="cabin-footer">
        <span v-if="cabin.location" class="cabin-location">📍 {{ cabin.location }}</span>
        <span v-if="formatPrice(cabin.price)" class="cabin-price">{{ formatPrice(cabin.price) }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.cabin {
  background: var(--cream);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: 0.35s;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
  }
}

.cabin-photo {
  height: 230px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(155deg, var(--green), var(--green-dark));

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
  }
}

.cabin:hover .cabin-photo img {
  transform: scale(1.06);
}

.capacity-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: var(--green);
  color: #fff;
  padding: 7px 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
}

.cabin-content {
  padding: 26px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cabin-content h3 {
  font-family: "Cormorant Garamond", serif;
  font-size: 27px;
  color: var(--green);
  margin-bottom: 8px;
}

.cabin-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;

  span {
    font-size: 12px;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 0.5px;
  }
}

.cabin-desc {
  color: var(--gray);
  font-size: 13px;
  line-height: 1.7;
  flex: 1;
}

.cabin-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}

.cabin-location {
  font-size: 12px;
  color: var(--gray);
}

.cabin-price {
  font-size: 13px;
  font-weight: 700;
  color: var(--green);
}

@include respond(tablet) {
  .cabin-photo {
    height: 200px;
  }
}
</style>
