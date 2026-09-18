<script setup lang="ts">
const { fetchSettings } = useSettings()
const whatsappNumber = ref('573001234567')
const instagramUrl = ref('https://www.instagram.com/vivepatrimoni0/')

const whatsappLink = computed(() => `https://wa.me/${whatsappNumber.value}`)

onMounted(async () => {
  const settings = await fetchSettings()
  if (settings?.whatsapp_number) {
    whatsappNumber.value = settings.whatsapp_number
  }
  if (settings?.instagram_url) {
    instagramUrl.value = settings.instagram_url
  }
})
</script>

<template>
  <section class="contact" id="contacto">
    <div class="contact-inner">
      <UiSectionLabel>Visítanos</UiSectionLabel>
      <h2>Nos vemos frente <span>al río.</span></h2>
      <p>Vive una experiencia diferente en Vive Patrimonio.</p>
      <div class="contact-buttons">
        <a :href="whatsappLink" class="contact-button contact-button--wa" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.7 14.2c-.2.6-1.4 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.8 2 .9 2.1.1.2.1.4 0 .6-.1.2-.1.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.6.8 1.9 1 .3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>
          WhatsApp
        </a>
        <a :href="instagramUrl" class="contact-button contact-button--ig" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          Instagram
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact {
  background: var(--green-dark);
  color: #fff;
  padding: 110px 6%;
  text-align: center;
}

.contact-inner {
  max-width: 800px;
  margin: auto;
}

.contact h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(45px, 6vw, 75px);
  line-height: 0.95;
  font-weight: 500;
  margin: 20px 0;
  color: #fff;
}

.contact h2 span {
  color: var(--gold);
  font-style: italic;
}

.contact p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
}

.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 35px;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 15px 28px;
  font-size: 11px;
  letter-spacing: 2px;
  transition: 0.3s;
  svg { width: 18px; height: 18px; flex-shrink: 0; }
}

.contact-button:hover {
  background: var(--gold);
  color: #fff;
}

.contact-button--wa:hover {
  background: #25d366;
  border-color: #25d366;
  color: #fff;
}

.contact-button--ig:hover {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  border-color: transparent;
  color: #fff;
}

@include respond(tablet) {
  .contact {
    padding: 70px 22px;
  }

  .contact h2 {
    font-size: 50px;
  }

  .contact-buttons {
    flex-direction: column;
  }

  .contact-button {
    display: block;
  }
}
</style>
