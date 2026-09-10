<script setup lang="ts">
import type { Sweater } from '~/types'

definePageMeta({ layout: 'admin', middleware: ['auth'] })

const supabase = useSupabase()
const sweaters = ref<Sweater[]>([])
const showForm = ref(false)
const editing = ref<Sweater | null>(null)
const search = ref('')
const activeType = ref('todos')

const form = ref({
  name: '',
  type: 'clasico',
  description: '',
  price: null as number | null,
  image_url: '',
  sizes: [] as string[],
  colors: [] as string[],
  available: true,
  sort_order: 0
})

const sizesInput = ref('')
const colorsInput = ref('')

const types = [
  { value: 'clasico', label: 'Clásico' },
  { value: 'urbano', label: 'Urbano' },
  { value: 'artesanal', label: 'Artesanal' },
  { value: 'edicion', label: 'Edición especial' }
]

const fetchSweaters = async () => {
  const { data } = await supabase.from('sweaters').select('*').order('sort_order', { ascending: true })
  sweaters.value = (data as Sweater[]) || []
}

const openForm = (s?: Sweater) => {
  if (s) {
    editing.value = s
    form.value = { name: s.name, type: s.type, description: s.description || '', price: s.price, image_url: s.image_url || '', sizes: [...(s.sizes || [])], colors: [...(s.colors || [])], available: s.available, sort_order: s.sort_order }
  } else {
    editing.value = null
    form.value = { name: '', type: 'clasico', description: '', price: null, image_url: '', sizes: [], colors: [], available: true, sort_order: 0 }
  }
  sizesInput.value = form.value.sizes.join(', ')
  colorsInput.value = form.value.colors.join(', ')
  showForm.value = true
}
const closeForm = () => { showForm.value = false; editing.value = null }

const syncArrays = () => {
  form.value.sizes = sizesInput.value.split(',').map(s => s.trim().toUpperCase()).filter(Boolean)
  form.value.colors = colorsInput.value.split(',').map(s => s.trim()).filter(Boolean)
}

const save = async () => {
  if (!form.value.name) return
  syncArrays()
  if (editing.value) {
    const { error } = await supabase.from('sweaters').update(form.value).eq('id', editing.value.id)
    if (error) { console.error(error); return }
  } else {
    const { error } = await supabase.from('sweaters').insert([form.value])
    if (error) { console.error(error); return }
  }
  closeForm()
  await fetchSweaters()
}

const remove = async (id: string) => {
  if (!confirm('¿Eliminar este suéter?')) return
  await supabase.from('sweaters').delete().eq('id', id)
  await fetchSweaters()
}

const formatPrice = (p: number | null) => p ? '$' + p.toLocaleString('es-CO') : '-'

const filtered = computed(() => {
  let r = sweaters.value
  if (activeType.value !== 'todos') r = r.filter(s => s.type === activeType.value)
  if (search.value.trim()) r = r.filter(s => s.name.toLowerCase().includes(search.value.toLowerCase()))
  return r
})

onMounted(fetchSweaters)
</script>

<template>
  <div class="admin-page">
    <div class="page-header">
      <div><h1>Suéteres</h1><p>{{ filtered.length }} de {{ sweaters.length }} suéteres</p></div>
      <button class="btn-primary" @click="openForm()">+ Agregar suéter</button>
    </div>

    <div class="filters-bar">
      <div class="search-box"><input v-model="search" placeholder="Buscar suéter..." /></div>
      <div class="category-filters">
        <button :class="['filter-btn', { active: activeType === 'todos' }]" @click="activeType = 'todos'">Todos</button>
        <button v-for="t in types" :key="t.value" :class="['filter-btn', { active: activeType === t.value }]" @click="activeType = t.value">{{ t.label }}</button>
      </div>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal">
        <h2>{{ editing ? 'Editar suéter' : 'Nuevo suéter' }}</h2>
        <form @submit.prevent="save">
          <div class="form-grid">
            <div class="form-group"><label>Nombre</label><input v-model="form.name" required /></div>
            <div class="form-group"><label>Tipo</label>
              <select v-model="form.type">
                <option v-for="t in types" :key="t.value" :value="t.value">{{ t.label }}</option>
              </select>
            </div>
            <div class="form-group full-width"><label>Descripción</label><textarea v-model="form.description" rows="3"></textarea></div>
            <div class="form-group"><label>Precio COP</label><input v-model.number="form.price" type="number" min="0" /></div>
            <div class="form-group"><label>Orden</label><input v-model.number="form.sort_order" type="number" min="0" /></div>
            <div class="form-group full-width"><AdminImageUpload v-model="form.image_url" bucket="sweaters" label="Foto del suéter" /></div>
            <div class="form-group full-width"><label>Tallas (separadas por coma, ej: S, M, L, XL)</label><input v-model="sizesInput" placeholder="S, M, L, XL" /></div>
            <div class="form-group full-width"><label>Colores (coma, ej: Beige, Verde, Negro)</label><input v-model="colorsInput" placeholder="Beige, Verde, Negro" /></div>
            <div class="form-group"><label><input v-model="form.available" type="checkbox" /> Disponible</label></div>
          </div>
          <div class="form-actions"><button type="button" class="btn-secondary" @click="closeForm">Cancelar</button><button type="submit" class="btn-primary">Guardar</button></div>
        </form>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead><tr><th>Foto</th><th>Nombre</th><th>Tipo</th><th>Tallas</th><th>Colores</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr v-for="s in filtered" :key="s.id">
            <td><div class="image-cell"><img v-if="s.image_url" :src="s.image_url" :alt="s.name" /><div v-else class="no-image">Sin foto</div></div></td>
            <td class="name-cell">{{ s.name }}</td>
            <td>{{ s.type }}</td>
            <td><span class="chips"><em v-for="x in s.sizes" :key="x">{{ x }}</em></span></td>
            <td><span class="chips"><em v-for="x in s.colors" :key="x">{{ x }}</em></span></td>
            <td>{{ formatPrice(s.price) }}</td>
            <td><span :class="['status', s.available ? 'available' : 'unavailable']">{{ s.available ? 'Sí' : 'No' }}</span></td>
            <td class="actions-cell"><button class="btn-icon" @click="openForm(s)">✏️</button><button class="btn-icon danger" @click="remove(s.id)">🗑️</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-page { max-width: 1400px; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; h1 { font-size: 28px; } p { color: #666; font-size: 14px; } }
.filters-bar { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
.search-box input { padding: 10px 14px; border: 1px solid #ddd; border-radius: 6px; width: 280px; }
.category-filters { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn { padding: 8px 16px; border: 1px solid #ddd; border-radius: 20px; background: #fff; cursor: pointer; font-size: 13px; &.active { background: #123b32; color: #fff; border-color: #123b32; } }
.btn-primary { background: #123b32; color: #fff; border: 0; padding: 12px 22px; border-radius: 6px; font-weight: 600; cursor: pointer; }
.btn-secondary { background: #fff; border: 1px solid #ddd; padding: 12px 22px; border-radius: 6px; cursor: pointer; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: grid; place-items: center; z-index: 1000; }
.modal { background: #fff; padding: 28px; border-radius: 12px; width: min(640px, 96%); max-height: 90vh; overflow: auto; h2 { margin-bottom: 20px; } }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
.form-group { display: flex; flex-direction: column; &.full-width { grid-column: 1/-1; } label { font-size: 13px; font-weight: 500; margin-bottom: 6px; } input, select, textarea { padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; } }
.form-actions { display: flex; gap: 12px; justify-content: flex-end; }
.table-container { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 900px; }
th { padding: 14px; text-align: left; font-size: 11px; text-transform: uppercase; color: #666; background: #f9f9f9; border-bottom: 1px solid #eee; }
td { padding: 14px; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
.image-cell { width: 56px; height: 56px; border-radius: 6px; overflow: hidden; background: #f0f0f0; img { width: 100%; height: 100%; object-fit: cover; } }
.no-image { display: grid; place-items: center; height: 100%; font-size: 10px; color: #999; }
.status { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; &.available { background: #d1fae5; color: #065f46; } &.unavailable { background: #fee2e2; color: #991b1b; } }
.actions-cell { display: flex; gap: 8px; }
.btn-icon { background: none; border: 0; cursor: pointer; padding: 6px; border-radius: 6px; &:hover { background: #f0f0f0; } &.danger:hover { background: #fee2e2; } }
.chips { display: inline-flex; flex-wrap: wrap; gap: 4px; em { background: #f5efe3; border: 1px solid #e5d9c3; padding: 2px 6px; border-radius: 10px; font-style: normal; font-size: 11px; } }
@media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } .page-header { flex-direction: column; gap: 12px; } }
</style>
