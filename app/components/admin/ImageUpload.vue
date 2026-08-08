<script setup lang="ts">
interface Props {
  modelValue: string
  bucket: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Imagen'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { uploadImage } = useStorage()

const uploading = ref(false)
const previewUrl = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  previewUrl.value = newVal
})

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  uploading.value = true

  const url = await uploadImage(file, props.bucket)

  if (url) {
    previewUrl.value = url
    emit('update:modelValue', url)
  }

  uploading.value = false
  target.value = ''
}

const removeImage = () => {
  previewUrl.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="image-upload">
    <label>{{ label }}</label>

    <div v-if="previewUrl" class="preview">
      <img :src="previewUrl" :alt="label" />
      <button type="button" @click="removeImage" class="remove-btn">✕</button>
    </div>

    <div v-else class="upload-area">
      <input
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        :disabled="uploading"
        class="file-input"
      />
      <div class="upload-placeholder">
        <span v-if="uploading">Subiendo...</span>
        <span v-else>📷 Click para subir imagen</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-upload label {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.preview {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
}

.preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.9);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.remove-btn:hover {
  background: rgba(220, 38, 38, 1);
}

.upload-area {
  width: 200px;
  height: 200px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: border-color 0.2s;
}

.upload-area:hover {
  border-color: #123b32;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.file-input:disabled {
  cursor: not-allowed;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
}
</style>
