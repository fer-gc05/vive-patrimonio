<script setup lang="ts">
import type { Drink } from '~/composables/useDrinks'

interface Props {
  drink: Drink
}

defineProps<Props>()
const emit = defineEmits<{ (e: 'click', drink: Drink): void }>()

const hasError = ref(false)

const formatPrice = (price: number | null) => {
  if (!price) return null
  return '$' + price.toLocaleString('es-CO')
}
</script>

<template>
  <article class="drink" data-reveal @click="emit('click', drink)">
    <div class="drink-photo" :class="{ 'no-photo': !drink.image_url || hasError }">
      <img
        v-if="drink.image_url"
        :key="drink.image_url"
        :src="drink.image_url"
        :alt="drink.name"
        loading="lazy"
        @error="hasError = true"
        @load="hasError = false"
      />
      <span>{{ drink.category_label }}</span>
    </div>
    <div class="drink-content">
      <h3>{{ drink.name }}</h3>
      <span v-if="formatPrice(drink.price)" class="drink-price">{{ formatPrice(drink.price) }}</span>
      <p>{{ drink.description }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
.drink {
  background: var(--cream);
  overflow: hidden;
  transition: 0.35s;
  cursor: pointer;
}

.drink:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
}

.drink-photo {
  height: 330px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(155deg, var(--green), var(--green-dark));
}

.drink-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}

.drink:hover .drink-photo img {
  transform: scale(1.06);
}

.drink-photo span {
  position: absolute;
  top: 15px;
  left: 15px;
  background: var(--green);
  color: #fff;
  padding: 8px 11px;
  font-size: 8px;
  letter-spacing: 2px;
  z-index: 2;
}

.drink-content {
  padding: 24px;
}

.drink-content h3 {
  font-family: "Cormorant Garamond", serif;
  font-size: 28px;
  color: var(--green);
  margin-bottom: 10px;
}

.drink-price {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 8px;
}

.drink-content p {
  color: var(--gray);
  font-size: 13px;
  line-height: 1.7;
}

@include respond(tablet) {
  .drink {
    width: 100%;
    border-radius: 0;
    background: var(--cream);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  }

  .drink:hover {
    transform: none;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  }

  .drink-photo {
    height: auto;
    aspect-ratio: 4/5;
    background: #ddd;
  }

  .drink-photo img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .drink-photo span {
    top: 13px;
    left: 13px;
    font-size: 7px;
    padding: 7px 9px;
  }

  .drink-content {
    padding: 20px 19px 23px;
  }

  .drink-content h3 {
    font-size: 31px;
    line-height: 1;
    margin-bottom: 9px;
  }

  .drink-content p {
    font-size: 12px;
    line-height: 1.65;
  }
}

@include respond(mobile-sm) {
  .drink-photo {
    aspect-ratio: 4/5;
  }

  .drink-content h3 {
    font-size: 28px;
  }
}
</style>
