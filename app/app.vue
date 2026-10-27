<script setup lang="ts">
const { fetchSettings } = useSettings()
const siteUrl = 'https://vivepatrimonio.com.co'

const settings = await useAsyncData('settings', fetchSettings)

const whatsapp = computed(() => settings.data.value?.whatsapp_number || '')
const instagram = computed(() => settings.data.value?.instagram_url || 'https://www.instagram.com/vivepatrimoni0/')
const address = computed(() => settings.data.value?.address_text || '')

const restaurantSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Vive Patrimonio',
  image: `${siteUrl}/img/hero.jpg`,
  url: siteUrl,
  telephone: whatsapp.value ? `+${whatsapp.value}` : undefined,
  address: address.value
    ? {
        '@type': 'PostalAddress',
        addressCountry: 'CO',
        addressLocality: 'Magangué',
        addressRegion: 'Bolívar',
        streetAddress: address.value
      }
    : undefined,
  servesCuisine: 'Colombiana',
  priceRange: '$$',
  sameAs: instagram.value ? [instagram.value] : undefined
}))

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vive Patrimonio',
  url: siteUrl
}

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(restaurantSchema.value)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(websiteSchema)
    }
  ]
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
