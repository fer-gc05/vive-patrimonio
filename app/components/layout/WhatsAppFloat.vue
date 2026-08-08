<script setup lang="ts">
const { fetchSettings } = useSettings()
const whatsappNumber = ref('573001234567')

const whatsappLink = computed(() => `https://wa.me/${whatsappNumber.value}`)

onMounted(async () => {
  const settings = await fetchSettings()
  if (settings?.whatsapp_number) {
    whatsappNumber.value = settings.whatsapp_number
  }
})
</script>

<template>
  <a
    :href="whatsappLink"
    class="float-wa"
    aria-label="Escribir por WhatsApp"
    target="_blank"
    rel="noopener"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.7 14.2c-.2.6-1.4 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.8 2 .9 2.1.1.2.1.4 0 .6-.1.2-.1.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.6.8 1.9 1 .3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
    </svg>
  </a>
</template>

<style scoped lang="scss">
.float-wa {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  background: #25d366;
  color: #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s;
}

.float-wa:hover {
  transform: scale(1.08);
}

.float-wa svg {
  width: 28px;
  height: 28px;
}
</style>
