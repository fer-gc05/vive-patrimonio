<script setup lang="ts">
import type { Drink } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const supabase = useSupabase()
const drinks = ref<Drink[]>([])
const loading = ref(false)
const showForm = ref(false)
const editingDrink = ref<Drink | null>(null)

const form = ref({
  name: '',
  category: 'margaritas',
  category_label: 'Margarita',
  description: '',
  price: null as number | null,
  image_url: '',
  available: true,
  sort_order: 0
})

const categories = [
  { value: 'margaritas', label: 'Margaritas', categoryLabel: 'Margarita' },
  { value: 'daiquiris', label: 'Daiquiris', categoryLabel: 'Daiquiri' },
  { value: 'clasicos', label: 'Clásicos', categoryLabel: 'Clásico' },
  { value: 'sodas', label: 'Sodas', categoryLabel: 'Soda' },
  { value: 'cervezas', label: 'Cervezas', categoryLabel: 'Cerveza' }
]

const fetchDrinks = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('drinks')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error:', error)
  } else {
    drinks.value = data || []
  }
  loading.value = false
}

const openForm = (drink?: Drink) => {
  if (drink) {
    editingDrink.value = drink
    form.value = { ...drink }
  } else {
    editingDrink.value = null
    form.value = {
      name: '',
      category: 'margaritas',
      category_label: 'Margarita',
      description: '',
      price: null,
      image_url: '',
      available: true,
      sort_order: 0
    }
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingDrink.value = null
}

const updateCategoryLabel = () => {
  const selected = categories.find(c => c.value === form.value.category)
  if (selected) {
    form.value.category_label = selected.categoryLabel
  }
}

const saveDrink = async () => {
  if (!form.value.name) return

  if (editingDrink.value) {
    const { error } = await supabase
      .from('drinks')
      .update(form.value)
      .eq('id', editingDrink.value.id)

    if (error) {
      console.error('Error updating:', error)
      return
    }
  } else {
    const { error } = await supabase
      .from('drinks')
      .insert([form.value])

    if (error) {
      console.error('Error inserting:', error)
      return
    }
  }

  closeForm()
  await fetchDrinks()
}

const deleteDrink = async (id: string) => {
  if (!confirm('¿Eliminar esta bebida?')) return

  const { error } = await supabase
    .from('drinks')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting:', error)
    return
  }

  await fetchDrinks()
}

const formatPrice = (price: number | null) => {
  if (!price) return '-'
  return `$${price.toLocaleString('es-CO')}`
}

onMounted(fetchDrinks)
</script>

<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1>Bebidas</h1>
        <p>{{ drinks.length }} bebidas registradas</p>
      </div>
      <button @click="openForm()" class="btn-primary">+ Agregar bebida</button>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal">
        <h2>{{ editingDrink ? 'Editar bebida' : 'Nueva bebida' }}</h2>

        <form @submit.prevent="saveDrink">
          <div class="form-grid">
            <div class="form-group">
              <label>Nombre</label>
              <input v-model="form.name" type="text" required />
            </div>

            <div class="form-group">
              <label>Categoría</label>
              <select v-model="form.category" @change="updateCategoryLabel" required>
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                  {{ cat.label }}
                </option>
              </select>
            </div>

            <div class="form-group full-width">
              <label>Descripción</label>
              <textarea v-model="form.description" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label>Precio (COP)</label>
              <input v-model.number="form.price" type="number" min="0" />
            </div>

            <div class="form-group">
              <label>Orden</label>
              <input v-model.number="form.sort_order" type="number" min="0" />
            </div>

            <div class="form-group full-width">
              <AdminImageUpload
                v-model="form.image_url"
                bucket="drinks"
                label="Imagen de la bebida"
              />
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
            <th>Categoría</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="drink in drinks" :key="drink.id">
            <td>
              <div class="image-cell">
                <img v-if="drink.image_url" :src="drink.image_url" :alt="drink.name" />
                <div v-else class="no-image">Sin imagen</div>
              </div>
            </td>
            <td class="name-cell">{{ drink.name }}</td>
            <td>{{ drink.category_label }}</td>
            <td>{{ formatPrice(drink.price) }}</td>
            <td>
              <span :class="['status', drink.available ? 'available' : 'unavailable']">
                {{ drink.available ? 'Sí' : 'No' }}
              </span>
            </td>
            <td>{{ drink.sort_order }}</td>
            <td class="actions-cell">
              <button @click="openForm(drink)" class="btn-icon">✏️</button>
              <button @click="deleteDrink(drink.id)" class="btn-icon danger">🗑️</button>
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
.form-group select,
.form-group textarea {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
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
