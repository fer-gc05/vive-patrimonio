<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const supabase = useSupabase()
const stats = ref({
  drinks: 0,
  dishes: 0,
  tours: 0,
  gallery: 0
})

onMounted(async () => {
  const { count: drinksCount } = await supabase.from('drinks').select('*', { count: 'exact', head: true })
  const { count: dishesCount } = await supabase.from('dishes').select('*', { count: 'exact', head: true })
  const { count: toursCount } = await supabase.from('tours').select('*', { count: 'exact', head: true })
  const { count: galleryCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true })

  stats.value = {
    drinks: drinksCount || 0,
    dishes: dishesCount || 0,
    tours: toursCount || 0,
    gallery: galleryCount || 0
  }
})
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p class="subtitle">Panel de administración de Vive Patrimonio</p>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">🍹</div>
        <div class="stat-content">
          <h3>{{ stats.drinks }}</h3>
          <p>Bebidas</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🍽️</div>
        <div class="stat-content">
          <h3>{{ stats.dishes }}</h3>
          <p>Platos</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🚤</div>
        <div class="stat-content">
          <h3>{{ stats.tours }}</h3>
          <p>Tours</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📷</div>
        <div class="stat-content">
          <h3>{{ stats.gallery }}</h3>
          <p>Fotos</p>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <h2>Acciones rápidas</h2>
      <div class="actions-grid">
        <NuxtLink to="/admin/drinks" class="action-card">
          <span class="action-icon">➕</span>
          <span>Agregar bebida</span>
        </NuxtLink>
        <NuxtLink to="/admin/dishes" class="action-card">
          <span class="action-icon">➕</span>
          <span>Agregar plato</span>
        </NuxtLink>
        <NuxtLink to="/admin/tours" class="action-card">
          <span class="action-icon">➕</span>
          <span>Agregar tour</span>
        </NuxtLink>
        <NuxtLink to="/admin/gallery" class="action-card">
          <span class="action-icon">📤</span>
          <span>Subir foto</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  max-width: 1200px;
}

h1 {
  font-size: 32px;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.subtitle {
  color: #666;
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
}

.stat-card {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.stat-icon {
  font-size: 40px;
}

.stat-content h3 {
  font-size: 32px;
  color: #123b32;
  margin-bottom: 4px;
}

.stat-content p {
  color: #666;
  font-size: 14px;
}

.quick-actions h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.action-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;
  color: #333;
  font-weight: 500;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-icon {
  font-size: 20px;
}

@media (max-width: 480px) {
  h1 {
    font-size: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
    gap: 12px;
  }

  .stat-icon {
    font-size: 28px;
  }

  .stat-content h3 {
    font-size: 24px;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
