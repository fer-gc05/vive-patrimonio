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
  <a class="main-button" :href="href" @click="scrollToSection">
    <slot />
  </a>
</template>

<style scoped lang="scss">
.main-button {
  display: inline-block;
  padding: 16px 30px;
  background: var(--gold);
  color: #fff;
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 700;
  transition: 0.3s;
}

.main-button:hover {
  background: #fff;
  color: var(--green);
}

@include respond(tablet) {
  .main-button {
    padding: 14px 22px;
    font-size: 10px;
  }
}
</style>
