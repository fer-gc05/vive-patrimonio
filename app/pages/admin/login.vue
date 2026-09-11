<script setup lang="ts">
definePageMeta({
  layout: false
})

const supabase = useSupabase()
const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const login = async () => {
  loading.value = true
  error.value = ''

  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  loading.value = false

  if (authError) {
    error.value = authError.message
    return
  }

  router.push('/admin')
}

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    router.push('/admin')
  }
})
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Admin Login</h1>
      <p>Vive Patrimonio</p>

      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="admin@vivepatrimonio.com"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <div class="password-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'" tabindex="-1">
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #123b32 0%, #09251f 100%);
}

.login-card {
  background: #fff;
  padding: 48px;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
}

.login-card h1 {
  font-size: 28px;
  margin-bottom: 8px;
  color: #123b32;
}

.login-card > p {
  color: #666;
  margin-bottom: 32px;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #123b32;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  padding-right: 44px;
}

.toggle-password {
  position: absolute;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 4px 6px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  color: #123b32;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 13px;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: #123b32;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login-btn:hover:not(:disabled) {
  background: #09251f;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
    margin: 16px;
  }
}
</style>
