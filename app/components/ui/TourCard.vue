<script setup lang="ts">
import type { Tour } from '~/composables/useTours'

interface Props {
  tour: Tour
  whatsappLink: string
}

defineProps<Props>()

const hasError = ref(false)

const formatPrice = (price: number | null) => {
  if (!price) return null
  return '$' + price.toLocaleString('es-CO')
}
</script>

<template>
  <NuxtLink :to="'/tours/' + tour.id" class="tour-link" data-reveal>
    <article class="tour">
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
        <span class="tour-duration">{{ tour.duration }} · {{ tour.type }}</span>
        <h3>{{ tour.name }}</h3>
        <p>{{ tour.description }}</p>
        <div class="tour-footer">
          <span v-if="formatPrice(tour.price)" class="tour-price">{{ formatPrice(tour.price) }}</span>
          <a :href="whatsappLink" class="tour-button" target="_blank" rel="noopener" @click.stop>
            Reservar
          </a>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped lang="scss">
.tour-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.tour {
  background: var(--cream);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: 0.35s;
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

.tour-duration {
  font-size: 10px;
  letter-spacing: 2px;
  font-weight: 700;
  color: var(--gold);
}

.tour-content h3 {
  font-family: "Cormorant Garamond", serif;
  font-size: 27px;
  color: var(--green);
  margin: 10px 0;
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
}

.tour-button {
  border: 1px solid var(--green);
  color: var(--green);
  padding: 10px 16px;
  font-size: 10px;
  letter-spacing: 1.5px;
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.3s;
  white-space: nowrap;
}

.tour-button:hover {
  background: var(--green);
  color: #fff;
}

@include respond(tablet) {
  .tour-photo {
    height: 200px;
  }
}
</style>
