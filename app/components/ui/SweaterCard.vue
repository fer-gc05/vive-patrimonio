<script setup lang="ts">
import type { Sweater } from '~/types'

interface Props { sweater: Sweater }
defineProps<Props>()
const emit = defineEmits<{ (e: 'click', sweater: Sweater): void }>()
const hasError = ref(false)
const formatPrice = (p: number | null) => p ? '$' + p.toLocaleString('es-CO') : null
</script>

<template>
  <article class="sweater" data-reveal @click="emit('click', sweater)">
    <div class="sweater-photo" :class="{ 'no-photo': !sweater.image_url || hasError }">
      <img
        v-if="sweater.image_url"
        :src="sweater.image_url"
        :alt="sweater.name"
        loading="lazy"
        @error="hasError = true"
        @load="hasError = false"
      />
      <span class="badge">{{ sweater.type }}</span>
    </div>
    <div class="sweater-content">
      <h3>{{ sweater.name }}</h3>
      <span v-if="formatPrice(sweater.price)" class="price">{{ formatPrice(sweater.price) }}</span>
      <p class="desc">{{ sweater.description }}</p>
      <div class="meta">
        <div v-if="sweater.sizes?.length" class="meta-row">
          <strong>Tallas:</strong>
          <span class="chips">
            <em v-for="s in sweater.sizes" :key="s">{{ s }}</em>
          </span>
        </div>
        <div v-if="sweater.colors?.length" class="meta-row">
          <strong>Colores:</strong>
          <span class="chips">
            <em v-for="c in sweater.colors" :key="c" class="color-chip">{{ c }}</em>
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.sweater {
  background: #fff;
  overflow: hidden;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: 0.3s;
  &:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
}
.sweater-photo {
  height: 300px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(155deg, #e8ddd0, #d8c8b3);
  img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
  &:hover img { transform: scale(1.05); }
}
.badge {
  position: absolute;
  top: 14px; left: 14px;
  background: var(--green);
  color: #fff;
  padding: 7px 10px;
  font-size: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.sweater-content { padding: 22px; }
.sweater-content h3 { font-family: "Cormorant Garamond", serif; font-size: 24px; color: var(--green); margin-bottom: 6px; }
.price { color: var(--gold); font-weight: 700; font-size: 13px; }
.desc { color: var(--gray); font-size: 13px; line-height: 1.65; margin: 8px 0 14px; }
.meta { display: grid; gap: 8px; }
.meta-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; font-size: 12px; }
.meta-row strong { font-size: 11px; letter-spacing: 0.5px; color: var(--green); }
.chips { display: flex; gap: 6px; flex-wrap: wrap; }
.chips em { background: var(--cream); border: 1px solid var(--border); padding: 4px 8px; font-style: normal; font-size: 11px; border-radius: 20px; }
.color-chip { text-transform: capitalize; }
</style>
