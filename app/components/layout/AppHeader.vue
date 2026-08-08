<script setup lang="ts">
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Bebidas', href: '#carta' },
  { label: 'Comida', href: '#comida' },
  { label: 'Tours', href: '#tours' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' }
]

const scrollToSection = (event: Event, href: string) => {
  event.preventDefault()
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  closeMenu()
}
</script>

<template>
  <header class="header">
    <a href="#inicio" class="logo" @click="scrollToSection($event, '#inicio')">
      <span class="logo-circle">
        <img src="/icon.jpeg" alt="VP" />
      </span>
      <span class="logo-text">
        <strong>VIVE</strong>
        <small>PATRIMONIO</small>
      </span>
    </a>

    <button
      class="menu-button"
      aria-label="Abrir menú"
      :aria-expanded="isOpen"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="nav" :class="{ open: isOpen }" id="nav">
      <a
        v-for="link in navLinks"
        :key="link.href"
        :href="link.href"
        @click="scrollToSection($event, link.href)"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 78px;
  padding: 0 6%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  background: rgba(9, 37, 31, 0.94);
  backdrop-filter: blur(12px);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-circle {
  width: 43px;
  height: 43px;
  border: 1px solid var(--gold);
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.logo-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-text strong {
  font-size: 15px;
  letter-spacing: 4px;
  color: #fff;
}

.logo-text small {
  font-size: 8px;
  letter-spacing: 3px;
  color: var(--gold);
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
  color: #fff;
  font-size: 13px;
}

.nav a {
  transition: 0.3s;
}

.nav a:hover {
  color: var(--gold);
}

.menu-button {
  display: none;
  background: none;
  border: 0;
  cursor: pointer;
}

.menu-button span {
  display: block;
  width: 26px;
  height: 2px;
  background: #fff;
  margin: 5px;
}

@include respond(tablet) {
  .header {
    height: 68px;
    padding: 0 18px;
  }

  .logo-circle {
    width: 38px;
    height: 38px;
  }

  .menu-button {
    display: block;
  }

  .nav {
    position: absolute;
    top: 68px;
    left: 0;
    width: 100%;
    padding: 25px;
    background: var(--green-dark);
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    transform: translateY(-150%);
    transition: 0.35s;
  }

  .nav.open {
    transform: translateY(0);
  }
}

@include respond(mobile-sm) {
  .logo-circle {
    width: 34px;
    height: 34px;
  }

  .logo-text strong {
    font-size: 13px;
    letter-spacing: 3px;
  }

  .logo-text small {
    font-size: 7px;
  }
}
</style>
