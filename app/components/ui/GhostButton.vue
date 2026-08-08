<script setup lang="ts">
interface Props {
  href: string
}

const props = defineProps<Props>()

const scrollToSection = (event: Event) => {
  if (props.href.startsWith('#')) {
    event.preventDefault()
    const element = document.querySelector(props.href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <a class="ghost-button" :href="href" @click="scrollToSection">
    <slot />
  </a>
</template>

<style scoped lang="scss">
.ghost-button {
  display: inline-flex;
  align-items: center;
  padding: 16px 30px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  color: #fff;
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 700;
  transition: 0.3s;
}

.ghost-button:hover {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

@include respond(tablet) {
  .ghost-button {
    padding: 14px 22px;
    font-size: 10px;
  }
}
</style>
