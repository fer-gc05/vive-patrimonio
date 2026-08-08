<script setup lang="ts">
import type { GalleryImage } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const supabase = useSupabase()
const images = ref<GalleryImage[]>([])
const loading = ref(false)
const showForm = ref(false)
const editingImage = ref<GalleryImage | null>(null)

const form = ref({
  image_url: '',
  alt: '',
  sort_order: 0
})

const fetchGallery = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error:', error)
  } else {
    images.value = data || []
  }
  loading.value = false
}

const openForm = (image?: GalleryImage) => {
  if (image) {
    editingImage.value = image
    form.value = { ...image }
  } else {
    editingImage.value = null
    form.value = {
      image_url: '',
      alt: '',
      sort_order: 0
    }
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingImage.value = null
}

const saveImage = async () => {
  if (!form.value.image_url) return

  if (editingImage.value) {
    const { error } = await supabase
      .from('gallery')
      .update(form.value)
      .eq('id', editingImage.value.id)

    if (error) {
      console.error('Error updating:', error)
      return
    }
  } else {
    const { error } = await supabase
      .from('gallery')
      .insert([form.value])

    if (error) {
      console.error('Error inserting:', error)
      return
    }
  }

  closeForm()
  await fetchGallery()
}

const deleteImage = async (id: string) => {
  if (!confirm('¿Eliminar esta imagen?')) return

  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting:', error)
    return
  }

  await fetchGallery()
}

onMounted(fetchGallery)
</script>

<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1>Galería</h1>
        <p>{{ images.length }} imágenes registradas</p>
      </div>
      <button @click="openForm()" class="btn-primary">+ Agregar imagen</button>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal">
        <h2>{{ editingImage ? 'Editar imagen' : 'Nueva imagen' }}</h2>

        <form @submit.prevent="saveImage">
          <div class="form-grid">
            <div class="form-group full-width">
              <AdminImageUpload
                v-model="form.image_url"
                bucket="gallery"
                label="Imagen de galería"
              />
            </div>

            <div class="form-group full-width">
              <label>Texto alternativo (alt)</label>
              <input v-model="form.alt" type="text" placeholder="Descripción de la imagen" />
            </div>

            <div class="form-group">
              <label>Orden</label>
              <input v-model.number="form.sort_order" type="number" min="0" />
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeForm" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>

    <div class="gallery-grid">
      <div v-for="image in images" :key="image.id" class="gallery-item">
        <img :src="image.image_url" :alt="image.alt" />
        <div class="gallery-overlay">
          <p>{{ image.alt || 'Sin descripción' }}</p>
          <div class="gallery-actions">
            <button @click="openForm(image)" class="btn-icon">✏️</button>
            <button @click="deleteImage(image.id)" class="btn-icon danger">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-page {
  max-width: 1400px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  margin-bottom: 4px;
}

.page-header p {
  color: #666;
  font-size: 14px;
}

.btn-primary {
  background: #123b32;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #09251f;
}

.btn-secondary {
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f5f5f5;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal h2 {
  font-size: 24px;
  margin-bottom: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #123b32;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
  aspect-ratio: 1;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  opacity: 0;
  transition: opacity 0.2s;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-overlay p {
  color: #fff;
  font-size: 13px;
  margin-bottom: 12px;
}

.gallery-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-icon.danger:hover {
  background: rgba(220, 38, 38, 0.8);
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
  }

  .page-header .btn-primary {
    width: 100%;
    text-align: center;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .modal {
    margin: 16px;
    padding: 20px;
    max-height: calc(100vh - 32px);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>
