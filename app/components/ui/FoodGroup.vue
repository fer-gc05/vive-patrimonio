<script setup lang="ts">
import type { FoodGroup as FoodGroupType } from '~/composables/useFood'

interface Props {
  group: FoodGroupType
}

defineProps<Props>()
</script>

<template>
  <div class="food-group" data-reveal>
    <h3 class="food-group-title">{{ group.group }}</h3>
    <ul class="food-list">
      <UiFoodItem
        v-for="(item, index) in group.items"
        :key="`${item.name}-${index}`"
        :item="item"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
.food-group-title {
  font-family: "Cormorant Garamond", serif;
  font-size: 26px;
  font-style: italic;
  color: var(--gold);
  border-bottom: 1px solid var(--border);
  padding-bottom: 14px;
  margin-bottom: 22px;
}

.food-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 22px;
}

@include respond(tablet) {
  .food-group-title {
    font-size: 22px;
  }
}
</style>
