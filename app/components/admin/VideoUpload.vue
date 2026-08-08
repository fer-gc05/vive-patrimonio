<script setup lang="ts">
interface Props {
  modelValue: string
  bucket: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Video'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { uploadImage } = useStorage()

const uploading = ref(false)
const previewUrl = ref(props.modelValue)
const fileName = ref('')

watch(() => props.modelValue, (newVal) => {
  previewUrl.value = newVal
})

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  uploading.value = true
  fileName.value = file.name

  const url = await uploadImage(file, props.bucket)

  if (url) {
    previewUrl.value = url
    emit('update:modelValue', url)
  }

  uploading.value = false
  target.value = ''
}

const removeVideo = () => {
  previewUrl.value = ''
  fileName.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="video-upload">
    <label>{{ label }}</label>

    <div v-if="previewUrl" class="preview">
      <video :src="previewUrl" controls preload="metadata"></video>
      <button type="button" @click="removeVideo" class="remove-btn">✕</button>
    </div>

    <div v-else class="upload-area">
      <input
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/*"
        @change="handleFileSelect"
        :disabled="uploading"
        class="file-input"
      />
      <div class="upload-placeholder">
        <span v-if="uploading">Subiendo video...</span>
        <span v-else>🎬 Click para subir video</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.video-upload label {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.preview {
  position: relative;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.preview video {
  width: 100%;
  display: block;
  max-height: 300px;
  object-fit: contain;
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
  width: 100%;
  max-width: 400px;
  height: 120px;
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
