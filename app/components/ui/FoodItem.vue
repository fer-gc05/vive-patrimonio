<script setup lang="ts">
import type { FoodItem as FoodItemType } from '~/composables/useFood'

interface Props {
  item: FoodItemType
}

defineProps<Props>()
</script>

<template>
  <li>
    <div class="food-row">
      <span class="food-name">{{ item.name }}</span>
      <span class="food-dots"></span>
      <span class="food-price">{{ item.price }}</span>
    </div>
    <p v-if="item.description" class="food-desc">{{ item.description }}</p>
  </li>
</template>

<style scoped lang="scss">
.food-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.food-name {
  font-family: "Cormorant Garamond", serif;
  font-size: 21px;
  font-weight: 600;
  color: var(--green);
  white-space: nowrap;
}

.food-dots {
  flex: 1;
  border-bottom: 1px dotted var(--border);
  transform: translateY(-4px);
}

.food-price {
  font-size: 14px;
  font-weight: 700;
  color: var(--green);
  white-space: nowrap;
}

.food-desc {
  margin-top: 6px;
  color: var(--gray);
  font-size: 13px;
  line-height: 1.6;
  max-width: 60ch;
}

@include respond(tablet) {
  .food-name {
    font-size: 18px;
  }
}
</style>
