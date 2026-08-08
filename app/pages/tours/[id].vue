<script setup lang="ts">
import type { Tour } from '~/composables/useTours'

const route = useRoute()
const supabase = useSupabase()

const tour = ref<Tour | null>(null)
const loading = ref(true)
const notFound = ref(false)

const formatPrice = (price: number | null) => {
  if (!price) return null
  return '$' + price.toLocaleString('es-CO')
}

const getWhatsappLink = (message: string) => {
  const number = '573001234567'
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

onMounted(async () => {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (error || !data) {
    notFound.value = true
  } else {
    tour.value = data as Tour
  }
  loading.value = false
})

useHead({
  title: () => tour.value ? `${tour.value.name} | Vive Patrimonio` : 'Tour | Vive Patrimonio'
})
</script>

<template>
  <div class="tour-detail-page">
    <NuxtLink to="/#tours" class="back-link">← Volver a tours</NuxtLink>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="notFound" class="not-found">
      <h2>Tour no encontrado</h2>
      <p>El tour que buscás no existe o no está disponible.</p>
      <NuxtLink to="/#tours" class="back-btn">Ver tours disponibles</NuxtLink>
    </div>

    <article v-else-if="tour" class="tour-detail">
      <div class="tour-hero" :class="{ 'no-image': !tour.image_url }">
        <img
          v-if="tour.image_url"
          :src="tour.image_url"
          :alt="tour.name"
        />
      </div>

      <div class="tour-info">
        <span class="tour-meta">{{ tour.duration }} · {{ tour.type }}</span>
        <h1>{{ tour.name }}</h1>
        <span v-if="formatPrice(tour.price)" class="tour-price">{{ formatPrice(tour.price) }}</span>
        <p class="tour-description">{{ tour.description }}</p>

        <div class="tour-actions">
          <a
            v-if="tour.whatsapp_message"
            :href="getWhatsappLink(tour.whatsapp_message)"
            class="btn-whatsapp"
            target="_blank"
            rel="noopener"
          >
            Reservar por WhatsApp
          </a>
          <NuxtLink to="/#tours" class="btn-back">Ver otros tours</NuxtLink>
        </div>

        <p class="tour-disclaimer">Duraciones y precios de referencia</p>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.tour-detail-page {
  min-height: 100vh;
  background: #fff;
}

.back-link {
  display: inline-block;
  padding: 20px 6%;
  color: var(--green);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 100px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e5e5;
  border-top-color: var(--green);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.not-found {
  text-align: center;
  padding: 80px 24px;

  h2 {
    font-family: "Cormorant Garamond", serif;
    font-size: 36px;
    color: var(--green);
    margin-bottom: 12px;
  }

  p {
    color: var(--gray);
    margin-bottom: 24px;
  }
}

.back-btn {
  display: inline-block;
  background: var(--green);
  color: #fff;
  padding: 12px 24px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s;
}

.back-btn:hover {
  background: var(--green-dark);
}

.tour-hero {
  width: 100%;
  height: 50vh;
  min-height: 350px;
  max-height: 500px;
  overflow: hidden;
  background: linear-gradient(155deg, var(--green), var(--green-dark));

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.tour-info {
  max-width: 700px;
  margin: 0 auto;
  padding: 48px 6% 80px;
}

.tour-meta {
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 700;
  color: var(--gold);
  text-transform: uppercase;
}

.tour-info h1 {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(36px, 5vw, 52px);
  color: var(--green);
  margin: 12px 0 16px;
  line-height: 1.1;
}

.tour-price {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 24px;
}

.tour-description {
  color: var(--gray);
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 36px;
}

.tour-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.btn-whatsapp {
  background: #25d366;
  color: #fff;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: #1da851;
  }
}

.btn-back {
  border: 1px solid var(--green);
  color: var(--green);
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: 0.2s;

  &:hover {
    background: var(--green);
    color: #fff;
  }
}

.tour-disclaimer {
  font-size: 12px;
  color: #999;
  font-style: italic;
}

@include respond(mobile) {
  .tour-hero {
    height: 40vh;
    min-height: 250px;
  }

  .tour-info {
    padding: 32px 16px 60px;
  }

  .tour-actions {
    flex-direction: column;
  }

  .btn-whatsapp,
  .btn-back {
    text-align: center;
  }
}
</style>
