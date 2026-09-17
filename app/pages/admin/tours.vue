<script setup lang="ts">
import type { Tour } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const supabase = useSupabase()
const tours = ref<Tour[]>([])
const loading = ref(false)
const showForm = ref(false)
const editingTour = ref<Tour | null>(null)

const form = ref({
  name: '',
  duration: '',
  type: '',
  description: '',
  price: null as number | null,
  image_url: '',
  images: [] as string[],
  whatsapp_message: '',
  available: true,
  sort_order: 0
})
const uploadingImage = ref(false)

const fetchTours = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error:', error)
  } else {
    tours.value = data || []
  }
  loading.value = false
}

const openForm = (tour?: Tour) => {
  if (tour) {
    editingTour.value = tour
    form.value = {
      name: tour.name,
      duration: tour.duration,
      type: tour.type,
      description: tour.description || '',
      price: tour.price,
      image_url: tour.image_url || '',
      images: tour.images ? [...tour.images] : [],
      whatsapp_message: tour.whatsapp_message || '',
      available: tour.available,
      sort_order: tour.sort_order
    }
  } else {
    editingTour.value = null
    form.value = {
      name: '',
      duration: '',
      type: '',
      description: '',
      price: null,
      image_url: '',
      images: [],
      whatsapp_message: '',
      available: true,
      sort_order: 0
    }
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingTour.value = null
}

const saveTour = async () => {
  if (!form.value.name) return

  const payload = {
    name: form.value.name,
    duration: form.value.duration,
    type: form.value.type,
    description: form.value.description,
    price: form.value.price,
    image_url: form.value.image_url,
    images: form.value.images,
    whatsapp_message: form.value.whatsapp_message,
    available: form.value.available,
    sort_order: form.value.sort_order
  }

  if (editingTour.value) {
    const { error } = await supabase
      .from('tours')
      .update(payload)
      .eq('id', editingTour.value.id)

    if (error) {
      console.error('Error updating:', error)
      return
    }
  } else {
    const { error } = await supabase
      .from('tours')
      .insert([payload])

    if (error) {
      console.error('Error inserting:', error)
      return
    }
  }

  closeForm()
  await fetchTours()
}

const deleteTour = async (id: string) => {
  if (!confirm('¿Eliminar este tour?')) return

  const { error } = await supabase
    .from('tours')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting:', error)
    return
  }

  await fetchTours()
}

const formatPrice = (price: number | null) => {
  if (!price) return '-'
  return `$${price.toLocaleString('es-CO')}`
}

const { uploadImage } = useStorage()

const handleMultiImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingImage.value = true
  const url = await uploadImage(file, 'tours')
  if (url) {
    form.value.images.push(url)
  }
  uploadingImage.value = false
  target.value = ''
}

const removeImage = (index: number) => {
  form.value.images.splice(index, 1)
}

onMounted(fetchTours)
</script>

<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1>Tours</h1>
        <p>{{ tours.length }} tours registrados</p>
      </div>
      <button @click="openForm()" class="btn-primary">+ Agregar tour</button>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal">
        <h2>{{ editingTour ? 'Editar tour' : 'Nuevo tour' }}</h2>

        <form @submit.prevent="saveTour">
          <div class="form-grid">
            <div class="form-group">
              <label>Nombre</label>
              <input v-model="form.name" type="text" required />
            </div>

            <div class="form-group">
              <label>Duración</label>
              <input v-model="form.duration" type="text" placeholder="45 MIN" required />
            </div>

            <div class="form-group">
              <label>Tipo</label>
              <input v-model="form.type" type="text" placeholder="GRUPAL" required />
            </div>

            <div class="form-group">
              <label>Precio (COP)</label>
              <input v-model.number="form.price" type="number" min="0" />
            </div>

            <div class="form-group full-width">
              <label>Descripción</label>
              <textarea v-model="form.description" rows="3"></textarea>
            </div>

            <div class="form-group full-width">
              <label>Imagen principal (legacy)</label>
              <AdminImageUpload
                v-model="form.image_url"
                bucket="tours"
                label="Imagen del tour"
              />
            </div>

            <div class="form-group full-width">
              <label>Fotos del tour (carrusel)</label>
              <div class="multi-images">
                <div v-for="(img, i) in form.images" :key="i" class="multi-image-preview">
                  <img :src="img" :alt="`Foto ${i + 1}`" />
                  <button type="button" @click="removeImage(i)" class="remove-btn">✕</button>
                </div>
                <label class="upload-more" :class="{ uploading: uploadingImage }">
                  <input type="file" accept="image/*" @change="handleMultiImageUpload" :disabled="uploadingImage" />
                  <span v-if="uploadingImage">...</span>
                  <span v-else>+</span>
                </label>
              </div>
            </div>

            <div class="form-group full-width">
              <label>Mensaje de WhatsApp</label>
              <input v-model="form.whatsapp_message" type="text" placeholder="Hola, quiero reservar..." />
            </div>

            <div class="form-group">
              <label>Orden</label>
              <input v-model.number="form.sort_order" type="number" min="0" />
            </div>

            <div class="form-group">
              <label>
                <input v-model="form.available" type="checkbox" />
                Disponible
              </label>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeForm" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Duración</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tour in tours" :key="tour.id">
            <td>
              <div class="image-cell">
                <img v-if="tour.image_url" :src="tour.image_url" :alt="tour.name" />
                <div v-else class="no-image">Sin imagen</div>
              </div>
            </td>
            <td class="name-cell">{{ tour.name }}</td>
            <td>{{ tour.duration }}</td>
            <td>{{ tour.type }}</td>
            <td>{{ formatPrice(tour.price) }}</td>
            <td>
              <span :class="['status', tour.available ? 'available' : 'unavailable']">
                {{ tour.available ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="actions-cell">
              <button @click="openForm(tour)" class="btn-icon">✏️</button>
              <button @click="deleteTour(tour.id)" class="btn-icon danger">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
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

.form-group input,
.form-group textarea {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #123b32;
}

.form-group input[type="checkbox"] {
  width: auto;
  margin-right: 8px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.table-container {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f9f9f9;
}

th {
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #666;
  border-bottom: 1px solid #eee;
}

td {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.image-cell {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  background: #f0f0f0;
}

.image-cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #999;
}

.name-cell {
  font-weight: 500;
}

.status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status.available {
  background: #d1fae5;
  color: #065f46;
}

.status.unavailable {
  background: #fee2e2;
  color: #991b1b;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #f0f0f0;
}

.btn-icon.danger:hover {
  background: #fee2e2;
}

.multi-images {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.multi-image-preview {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.multi-image-preview .remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.9);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-more {
  width: 120px;
  height: 120px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #123b32;
  }

  &.uploading {
    opacity: 0.6;
    cursor: not-allowed;
  }

  input {
    display: none;
  }

  span {
    font-size: 28px;
    color: #999;
  }
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

  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  table {
    min-width: 650px;
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
