<script setup lang="ts">
interface Category {
  key: string
  label: string
}

interface Props {
  categories: Category[]
  active: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

const selectCategory = (key: string) => {
  emit('select', key)
}
</script>

<template>
  <div class="categories">
    <button
      v-for="category in categories"
      :key="category.key"
      class="category"
      :class="{ active: active === category.key }"
      @click="selectCategory(category.key)"
    >
      {{ category.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.categories {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 55px auto;
  max-width: 1000px;
}

.category {
  border: 1px solid var(--border);
  background: transparent;
  padding: 13px 21px;
  border-radius: 50px;
  cursor: pointer;
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  color: var(--green);
  transition: 0.3s;
  white-space: nowrap;
}

.category:hover,
.category.active {
  background: var(--green);
  color: #fff;
  border-color: var(--green);
}

@include respond(tablet) {
  .categories {
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 32px auto 38px;
    width: 100%;
    max-width: 390px;
    padding: 0 2px;
  }

  .category {
    padding: 11px 14px;
    font-size: 9px;
    flex: 0 0 auto;
  }
}

@include respond(mobile-sm) {
  .categories {
    gap: 6px;
    max-width: 350px;
  }

  .category {
    padding: 10px 11px;
    font-size: 8px;
  }
}
</style>
