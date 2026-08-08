<script setup lang="ts">
const { fetchDrinks, categories } = useDrinks()
const drinks = ref([])
const activeCategory = ref('todos')

const filteredDrinks = computed(() => {
  if (activeCategory.value === 'todos') return drinks.value
  return drinks.value.filter((drink) => drink.category === activeCategory.value)
})

const selectCategory = (key: string) => {
  activeCategory.value = key
}

onMounted(async () => {
  drinks.value = await fetchDrinks()
})
</script>

<template>
  <section class="menu" id="carta">
    <div class="menu-header">
      <UiSectionLabel>Carta de bebidas</UiSectionLabel>
      <h2>Elige tu bebida</h2>
      <p>Explora nuestras categorías y descubre cada preparación.</p>
    </div>

    <UiCategoryFilter
      :categories="categories"
      :active="activeCategory"
      @select="selectCategory"
    />

    <div class="drinks-grid">
      <UiDrinkCard
        v-for="drink in filteredDrinks"
        :key="drink.id"
        :drink="drink"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.menu {
  background: #fff;
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

.drinks-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

@include respond(desktop) {
  .drinks-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@include respond(tablet) {
  .menu {
    padding: 60px 16px 75px;
  }

  .menu-header {
    padding: 0 10px;
  }

  .menu-header h2 {
    font-size: 48px;
    margin: 14px 0;
  }

  .menu-header p {
    font-size: 12px;
    line-height: 1.65;
  }

  .drinks-grid {
    grid-template-columns: 1fr;
    gap: 18px;
    width: 100%;
  }
}

@include respond(mobile-sm) {
  .menu {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
