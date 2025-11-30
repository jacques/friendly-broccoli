<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const login = async () => {
  error.value = ''
  loading.value = true

  try {
    const result = await authStore.login(email.value, password.value)
    
    if (result.requiresTfa) {
      router.push('/tfa-verify')
    } else {
      router.push('/dashboard')
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// TODO: Remove before production - Demo login for testing UI without backend
// This bypasses authentication and should be removed when connecting to a real API
const demoLogin = () => {
  localStorage.setItem('token', 'demo-token')
  authStore.initializeAuth()
  router.push('/dashboard')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-xl p-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Welcome Back</h1>
      <p class="text-gray-600 mt-2">Sign in to your account</p>
    </div>

    <form @submit.prevent="login" class="space-y-6">
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        <font-awesome-icon icon="exclamation-triangle" class="mr-2" />
        {{ error }}
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <font-awesome-icon icon="envelope" class="text-gray-400" />
          </div>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <font-awesome-icon icon="lock" class="text-gray-400" />
          </div>
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            required
            class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" class="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <router-link to="/lost-password" class="text-sm text-blue-600 hover:text-blue-500">
          Forgot your password?
        </router-link>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <font-awesome-icon v-if="loading" icon="spinner" spin class="mr-2" />
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>

      <!-- Demo login button for testing -->
      <button
        type="button"
        @click="demoLogin"
        class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Demo Login (Skip Authentication)
      </button>
    </form>
  </div>
</template>
