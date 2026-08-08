<script setup lang="ts">
const visible = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    visible.value = window.scrollY > 400
  })
})
</script>

<template>
  <Transition name="fade">
    <button v-if="visible" class="back-to-top" @click="scrollToTop" aria-label="Volver arriba">
      ↑
    </button>
  </Transition>
</template>

<style scoped lang="scss">
.back-to-top {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--green);
  color: #fff;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background 0.2s, transform 0.2s;
  z-index: 50;
}

.back-to-top:hover {
  background: var(--green-dark);
  transform: translateY(-50%) scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@include respond(mobile) {
  .back-to-top {
    right: 16px;
    width: 42px;
    height: 42px;
    font-size: 18px;
  }
}
</style>
