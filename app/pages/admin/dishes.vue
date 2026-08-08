<script setup lang="ts">
import type { Dish } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const supabase = useSupabase()
const dishes = ref<Dish[]>([])
const loading = ref(false)
const showForm = ref(false)
const editingDish = ref<Dish | null>(null)
const activeCategory = ref('todos')
const searchQuery = ref('')

const form = ref({
  name: '',
  category: 'entradas',
  description: '',
  price: null as number | null,
  sort_order: 0
})

const categoryOrder = ['entradas', 'hamburguesas', 'desgranados', 'picadas']
const categories = ['Entradas', 'Hamburguesas', 'Desgranados', 'Picadas']

const sortedDishes = computed(() => {
  return [...dishes.value].sort((a, b) => {
    const orderA = categoryOrder.indexOf(a.category.toLowerCase())
    const orderB = categoryOrder.indexOf(b.category.toLowerCase())
    if (orderA !== orderB) return orderA - orderB
    return a.sort_order - b.sort_order
  })
})

const fetchDishes = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error:', error)
  } else {
    dishes.value = data || []
  }
  loading.value = false
}

const openForm = (dish?: Dish) => {
  if (dish) {
    editingDish.value = dish
    form.value = { ...dish }
  } else {
    editingDish.value = null
    form.value = {
      name: '',
      category: 'entradas',
      description: '',
      price: null,
      sort_order: 0
    }
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingDish.value = null
}

const saveDish = async () => {
  if (!form.value.name) return

  if (editingDish.value) {
    const { error } = await supabase
      .from('dishes')
      .update(form.value)
      .eq('id', editingDish.value.id)

    if (error) {
      console.error('Error updating:', error)
      return
    }
  } else {
    const { error } = await supabase
      .from('dishes')
      .insert([form.value])

    if (error) {
      console.error('Error inserting:', error)
      return
    }
  }

  closeForm()
  await fetchDishes()
}

const deleteDish = async (id: string) => {
  if (!confirm('¿Eliminar este plato?')) return

  const { error } = await supabase
    .from('dishes')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting:', error)
    return
  }

  await fetchDishes()
}

const formatPrice = (price: number | null) => {
  if (!price) return '-'
  return `$${price.toLocaleString('es-CO')}`
}

const filteredDishes = computed(() => {
  let result = [...dishes.value].sort((a, b) => {
    const orderA = categoryOrder.indexOf(a.category.toLowerCase())
    const orderB = categoryOrder.indexOf(b.category.toLowerCase())
    if (orderA !== orderB) return orderA - orderB
    return a.sort_order - b.sort_order
  })
  if (activeCategory.value !== 'todos') {
    result = result.filter((d) => d.category.toLowerCase() === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((d) => d.name.toLowerCase().includes(q))
  }
  return result
})

onMounted(fetchDishes)
</script>

<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1>Comida</h1>
        <p>{{ filteredDishes.length }} de {{ dishes.length }} platos</p>
      </div>
      <button @click="openForm()" class="btn-primary">+ Agregar plato</button>
    </div>

    <div class="filters-bar">
      <div class="search-box">
        <input v-model="searchQuery" type="text" placeholder="Buscar plato..." />
      </div>
      <div class="category-filters">
        <button
          :class="['filter-btn', { active: activeCategory === 'todos' }]"
          @click="activeCategory = 'todos'"
        >Todas</button>
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['filter-btn', { active: activeCategory === cat.toLowerCase() }]"
          @click="activeCategory = cat.toLowerCase()"
        >{{ cat }}</button>
      </div>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal">
        <h2>{{ editingDish ? 'Editar plato' : 'Nuevo plato' }}</h2>

        <form @submit.prevent="saveDish">
          <div class="form-grid">
            <div class="form-group">
              <label>Nombre</label>
              <input v-model="form.name" type="text" required />
            </div>

            <div class="form-group">
              <label>Categoría</label>
              <select v-model="form.category" required>
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
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
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dish in filteredDishes" :key="dish.id">
            <td class="name-cell">{{ dish.name }}</td>
            <td>{{ dish.category }}</td>
            <td class="desc-cell">{{ dish.description || '-' }}</td>
            <td>{{ formatPrice(dish.price) }}</td>
            <td>{{ dish.sort_order }}</td>
            <td class="actions-cell">
              <button @click="openForm(dish)" class="btn-icon">✏️</button>
              <button @click="deleteDish(dish.id)" class="btn-icon danger">🗑️</button>
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

.filters-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-box input {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  max-width: 300px;
}

.search-box input:focus {
  outline: none;
  border-color: #123b32;
}

.category-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #123b32;
}

.filter-btn.active {
  background: #123b32;
  color: #fff;
  border-color: #123b32;
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

.name-cell {
  font-weight: 500;
}

.desc-cell {
  color: #666;
  font-size: 13px;
  max-width: 300px;
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
    min-width: 550px;
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
