<script setup lang="ts">
const supabase = useSupabase()
const router = useRouter()
const user = ref<any>(null)
const loading = ref(true)
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.push('/admin/login')
  } else {
    user.value = user
  }
  loading.value = false
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/admin/login')
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <div v-if="loading" class="loading-screen">
    <div class="spinner"></div>
  </div>
  <div v-else class="admin-layout">
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>
    <aside class="sidebar" :class="{ open: sidebarOpen, collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="sidebar-header-top">
          <h2>Admin Panel</h2>
          <button class="close-sidebar" @click="closeSidebar">✕</button>
        </div>
        <p v-if="user">{{ user.email }}</p>
      </div>
      <nav class="sidebar-nav">
        <NuxtLink to="/admin" @click="closeSidebar">Dashboard</NuxtLink>
        <NuxtLink to="/admin/drinks" @click="closeSidebar">Bebidas</NuxtLink>
        <NuxtLink to="/admin/dishes" @click="closeSidebar">Comida</NuxtLink>
        <NuxtLink to="/admin/tours" @click="closeSidebar">Tours</NuxtLink>
        <NuxtLink to="/admin/gallery" @click="closeSidebar">Galería</NuxtLink>
        <NuxtLink to="/admin/settings" @click="closeSidebar">Configuración</NuxtLink>
      </nav>
      <div class="sidebar-footer">
        <NuxtLink to="/" @click="closeSidebar">Ver sitio</NuxtLink>
        <button @click="logout" class="logout-btn">Cerrar sesión</button>
      </div>
    </aside>
    <main class="admin-main" :class="{ expanded: sidebarCollapsed }">
      <div class="topbar">
        <button class="hamburger" @click="sidebarOpen = true" aria-label="Abrir menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button class="toggle-sidebar" @click="toggleSidebar" :aria-label="sidebarCollapsed ? 'Mostrar menú' : 'Ocultar menú'">
          ☰
        </button>
        <span class="topbar-title">Admin</span>
      </div>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.loading-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e5e5;
  border-top-color: #123b32;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.admin-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: #f5f5f5;
}

.sidebar-overlay {
  display: none;
}

.sidebar {
  background: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  z-index: 100;
  transition: transform 0.3s ease;
}

.sidebar.collapsed {
  transform: translateX(-260px);
}

.sidebar-header {
  margin-bottom: 40px;
}

.sidebar-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

.sidebar-header p {
  font-size: 12px;
  color: #888;
}

.close-sidebar {
  display: none;
  background: none;
  border: none;
  color: #888;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
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
  margin-left: 260px;
  transition: margin-left 0.3s ease;
}

.admin-main.expanded {
  margin-left: 0;
}

.topbar {
  display: none;
}

.hamburger {
  display: none;
}

.toggle-sidebar {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #1a1a1a;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

.toggle-sidebar:hover {
  background: #e5e5e5;
}

@media (max-width: 768px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }

  .sidebar {
    left: -280px;
    width: 260px;
    z-index: 100;
    transition: left 0.3s ease;
    padding-top: 24px;
    transform: none;
  }

  .sidebar.open {
    left: 0;
  }

  .sidebar.collapsed {
    transform: none;
    left: -280px;
  }

  .close-sidebar {
    display: block;
  }

  .toggle-sidebar {
    display: none;
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
  }

  .hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: #1a1a1a;
    border-radius: 2px;
  }

  .topbar-title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .admin-main {
    padding: 20px;
    margin-left: 0;
  }

  .admin-main.expanded {
    margin-left: 0;
  }
}
</style>
