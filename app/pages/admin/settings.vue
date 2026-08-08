<script setup lang="ts">
import type { Settings } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const supabase = useSupabase()
const settings = ref<Settings | null>(null)
const loading = ref(false)
const saving = ref(false)
const success = ref(false)

const form = ref({
  whatsapp_number: '',
  instagram_url: '',
  hero_title: '',
  hero_subtitle: '',
  hero_image_url: '',
  hero_video_url: '',
  experience_image_url: ''
})

const fetchSettings = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single()

  if (error) {
    console.error('Error:', error)
  } else if (data) {
    settings.value = data
    form.value = { ...data }
  }
  loading.value = false
}

const saveSettings = async () => {
  saving.value = true
  success.value = false

  if (settings.value) {
    const { error } = await supabase
      .from('settings')
      .update(form.value)
      .eq('id', settings.value.id)

    if (error) {
      console.error('Error updating:', error)
      saving.value = false
      return
    }
  } else {
    const { data, error } = await supabase
      .from('settings')
      .insert([form.value])
      .select()
      .single()

    if (error) {
      console.error('Error inserting:', error)
      saving.value = false
      return
    }

    settings.value = data
  }

  saving.value = false
  success.value = true

  setTimeout(() => {
    success.value = false
  }, 3000)
}

onMounted(fetchSettings)
</script>

<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1>Configuración</h1>
        <p>Configuración general del sitio</p>
      </div>
    </div>

    <div class="settings-card">
      <form @submit.prevent="saveSettings">
        <div class="form-section">
          <h2>Redes sociales</h2>

          <div class="form-grid">
            <div class="form-group">
              <label>Número de WhatsApp</label>
              <input
                v-model="form.whatsapp_number"
                type="text"
                placeholder="573001234567"
              />
              <small>Solo números, con código de país</small>
            </div>

            <div class="form-group">
              <label>URL de Instagram</label>
              <input
                v-model="form.instagram_url"
                type="url"
                placeholder="https://www.instagram.com/vivepatrimoni0/"
              />
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Hero (inicio)</h2>

          <div class="form-grid">
            <div class="form-group full-width">
              <label>Título principal</label>
              <input
                v-model="form.hero_title"
                type="text"
                placeholder="Vive el río. Vive Patrimonio."
              />
            </div>

            <div class="form-group full-width">
              <label>Subtítulo</label>
              <textarea
                v-model="form.hero_subtitle"
                rows="3"
                placeholder="Una experiencia frente al río Sinú..."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Imágenes del sitio</h2>

          <div class="form-grid">
            <div class="form-group full-width">
              <AdminImageUpload
                v-model="form.hero_image_url"
                bucket="site"
                label="Imagen de fondo del Hero"
              />
              <small>Imagen principal que se muestra detrás del título. Formato JPEG o PNG.</small>
            </div>

            <div class="form-group full-width">
              <AdminVideoUpload
                v-model="form.hero_video_url"
                bucket="site"
                label="Video del Hero (opcional)"
              />
              <small>Se muestra en pantallas de escritorio. Sube el video en la mejor calidad posible (MP4 recomendado). Si está vacío, solo se muestra la imagen.</small>
            </div>

            <div class="form-group full-width">
              <AdminImageUpload
                v-model="form.experience_image_url"
                bucket="site"
                label="Imagen de la sección Experiencia"
              />
              <small>Imagen que aparece al lado del texto "El río es parte de nosotros".</small>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <div v-if="success" class="success-message">
            ✓ Configuración guardada
          </div>
          <button type="submit" :disabled="saving" class="btn-primary">
            {{ saving ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-page {
  max-width: 800px;
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

.settings-card {
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #eee;
}

.form-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.form-section h2 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #123b32;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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

.form-group small {
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

.form-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 24px;
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

.btn-primary:hover:not(:disabled) {
  background: #09251f;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  color: #065f46;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .settings-card {
    padding: 20px;
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
