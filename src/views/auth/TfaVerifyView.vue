<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const code = ref('')
const loading = ref(false)
const error = ref('')

const verifyTfa = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.verifyTfa(code.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const cancel = () => {
  authStore.tfaPending = false
  router.push('/login')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-xl p-8">
    <div class="text-center mb-8">
      <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <font-awesome-icon icon="shield-alt" class="text-blue-600 text-2xl" />
      </div>
      <h1 class="text-3xl font-bold text-gray-800">Two-Factor Authentication</h1>
      <p class="text-gray-600 mt-2">Enter the code from your authenticator app</p>
    </div>

    <form @submit.prevent="verifyTfa" class="space-y-6">
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        <font-awesome-icon icon="exclamation-triangle" class="mr-2" />
        {{ error }}
      </div>

      <div>
        <label for="code" class="block text-sm font-medium text-gray-700 mb-1">
          Authentication Code
        </label>
        <input
          id="code"
          v-model="code"
          type="text"
          required
          maxlength="6"
          pattern="[0-9]{6}"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest"
          placeholder="000000"
          autocomplete="one-time-code"
        />
      </div>

      <button
        type="submit"
        :disabled="loading || code.length !== 6"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <font-awesome-icon v-if="loading" icon="spinner" spin class="mr-2" />
        {{ loading ? 'Verifying...' : 'Verify' }}
      </button>

      <button
        type="button"
        @click="cancel"
        class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Cancel
      </button>
    </form>
  </div>
</template>
