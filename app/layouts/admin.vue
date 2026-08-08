<script setup lang="ts">
const supabase = useSupabase()
const router = useRouter()
const user = ref<any>(null)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.push('/admin/login')
  } else {
    user.value = user
  }
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/admin/login')
}
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Admin Panel</h2>
        <p v-if="user">{{ user.email }}</p>
      </div>
      <nav class="sidebar-nav">
        <NuxtLink to="/admin">Dashboard</NuxtLink>
        <NuxtLink to="/admin/drinks">Bebidas</NuxtLink>
        <NuxtLink to="/admin/dishes">Comida</NuxtLink>
        <NuxtLink to="/admin/tours">Tours</NuxtLink>
        <NuxtLink to="/admin/gallery">Galería</NuxtLink>
        <NuxtLink to="/admin/settings">Configuración</NuxtLink>
      </nav>
      <div class="sidebar-footer">
        <NuxtLink to="/">Ver sitio</NuxtLink>
        <button @click="logout" class="logout-btn">Cerrar sesión</button>
      </div>
    </aside>
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: #f5f5f5;
}

.sidebar {
  background: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.sidebar-header {
  margin-bottom: 40px;
}

.sidebar-header h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

.sidebar-header p {
  font-size: 12px;
  color: #888;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.sidebar-nav a {
  padding: 12px 16px;
  border-radius: 6px;
  color: #ccc;
  transition: all 0.2s;
  font-size: 14px;
}

.sidebar-nav a:hover,
.sidebar-nav a.router-link-active {
  background: #2a2a2a;
  color: #fff;
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #333;
}

.sidebar-footer a {
  color: #888;
  font-size: 13px;
}

.logout-btn {
  background: #dc2626;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #b91c1c;
}

.admin-main {
  padding: 40px;
  overflow-y: auto;
}
</style>
