<script setup lang="ts">
import type { Dish } from '~/types'

const { fetchDishes, categories, categoryOrder } = useDishes()
const dishes = ref<Dish[]>([])
const activeCategory = ref('todos')

const filteredDishes = computed(() => {
  let result = dishes.value
  if (activeCategory.value !== 'todos') {
    result = result.filter((dish) => dish.category === activeCategory.value)
  }
  return [...result].sort((a, b) => {
    const orderA = categoryOrder.indexOf(a.category)
    const orderB = categoryOrder.indexOf(b.category)
    if (orderA !== orderB) return orderA - orderB
    return a.sort_order - b.sort_order
  })
})

const foodGroups = computed(() => {
  const grouped: Record<string, Dish[]> = {}
  filteredDishes.value.forEach((dish) => {
    if (!grouped[dish.category]) {
      grouped[dish.category] = []
    }
    grouped[dish.category].push(dish)
  })
  return Object.entries(grouped).map(([group, items]) => ({ group, items }))
})

const selectCategory = (key: string) => {
  activeCategory.value = key
}

onMounted(async () => {
  dishes.value = await fetchDishes()
})
</script>

<template>
  <section class="food" id="comida">
    <div class="menu-header">
      <UiSectionLabel>Para comer</UiSectionLabel>
      <h2>Sabores del <span>río</span></h2>
      <p>
        Cocina típica de la región, pensada para compartir en la mesa mientras cae la tarde.
        Menú sujeto a disponibilidad de pesca del día.
      </p>
    </div>

    <UiCategoryFilter
      :categories="categories"
      :active="activeCategory"
      @select="selectCategory"
    />

    <p v-if="dishes.length === 0" class="empty-state">
      No hay platos disponibles por el momento.
    </p>
    <p v-else-if="foodGroups.length === 0" class="empty-state">
      No hay platos disponibles en esta categoría.
    </p>
    <div v-else class="food-groups">
      <UiFoodGroup
        v-for="(group, index) in foodGroups"
        :key="`${group.group}-${index}`"
        :group="group"
      />
    </div>

    <p class="food-note">
      * Precios y platos de referencia — reemplázalos por tu carta gastronómica definitiva.
    </p>
  </section>
</template>

<style scoped lang="scss">
.food {
  background: var(--cream);
  padding: 100px 6%;
}

.menu-header {
  text-align: center;
  max-width: 700px;
  margin: auto;
}

.menu-header h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(45px, 6vw, 75px);
  line-height: 0.95;
  font-weight: 500;
  margin: 20px 0;
}

.menu-header h2 span {
  color: var(--gold);
  font-style: italic;
}

.menu-header p {
  color: var(--gray);
  line-height: 1.7;
}

.food-groups {
  max-width: 1000px;
  margin: 55px auto 0;
  display: grid;
  gap: 50px;
}

.food-note {
  max-width: 1000px;
  margin: 45px auto 0;
  text-align: center;
  color: var(--gray);
  font-size: 11px;
  letter-spacing: 0.5px;
  font-style: italic;
}

.empty-state {
  max-width: 600px;
  margin: 40px auto 0;
  text-align: center;
  color: var(--gray);
  font-size: 14px;
  line-height: 1.7;
}

@include respond(tablet) {
  .food {
    padding: 60px 16px 75px;
  }

  .food-groups {
    gap: 38px;
    margin-top: 32px;
  }

  .food-note {
    font-size: 10px;
    padding: 0 10px;
  }
}
</style>
