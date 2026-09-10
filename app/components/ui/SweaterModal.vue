<script setup lang="ts">
import type { Sweater } from '~/types'

interface Props { sweater: Sweater; whatsappLink?: string }
defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void }>()
const formatPrice = (p: number | null) => p ? '$' + p.toLocaleString('es-CO') : null
const hasError = ref(false)
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal">
      <button class="close" @click="emit('close')" aria-label="Cerrar">✕</button>
      <div class="photo" :class="{ 'no-photo': !sweater.image_url || hasError }">
        <img v-if="sweater.image_url" :src="sweater.image_url" :alt="sweater.name" @error="hasError = true" />
      </div>
      <div class="body">
        <span class="type">{{ sweater.type }}</span>
        <h3>{{ sweater.name }}</h3>
        <span v-if="formatPrice(sweater.price)" class="price">{{ formatPrice(sweater.price) }}</span>
        <p class="desc">{{ sweater.description }}</p>

        <div class="grid">
          <div v-if="sweater.sizes?.length" class="box">
            <strong>Tallas disponibles</strong>
            <div class="chips"><em v-for="s in sweater.sizes" :key="s">{{ s }}</em></div>
          </div>
          <div v-if="sweater.colors?.length" class="box">
            <strong>Colores</strong>
            <div class="chips"><em v-for="c in sweater.colors" :key="c">{{ c }}</em></div>
          </div>
        </div>

        <a v-if="whatsappLink" :href="whatsappLink" target="_blank" rel="noopener" class="cta">Consultar por WhatsApp</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: grid; place-items: center; z-index: 2000; padding: 16px; }
.modal { background: #fff; width: min(880px, 100%); max-height: 90vh; overflow: auto; position: relative; display: grid; grid-template-columns: 1fr 1fr; }
.close { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); color: #fff; border: 0; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; z-index: 2; }
.photo { background: #eee; min-height: 360px; img { width: 100%; height: 100%; object-fit: cover; } }
.body { padding: 28px; }
.type { font-size: 10px; letter-spacing: 2px; background: var(--green); color: #fff; padding: 6px 10px; }
.body h3 { font-family: "Cormorant Garamond", serif; font-size: 32px; color: var(--green); margin: 14px 0 6px; }
.price { color: var(--gold); font-weight: 700; }
.desc { color: var(--gray); line-height: 1.7; font-size: 14px; margin: 12px 0 18px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.box strong { display: block; font-size: 12px; color: var(--green); margin-bottom: 8px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chips em { background: var(--cream); border: 1px solid var(--border); padding: 5px 10px; border-radius: 20px; font-style: normal; font-size: 12px; }
.cta { display: inline-block; background: var(--green); color: #fff; padding: 12px 18px; font-size: 12px; letter-spacing: 1px; }

@include respond(tablet) {
  .modal { grid-template-columns: 1fr; }
  .photo { min-height: 300px; }
}
</style>
