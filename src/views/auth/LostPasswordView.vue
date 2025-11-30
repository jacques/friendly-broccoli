<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const requestReset = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.requestPasswordReset(email.value)
    success.value = true
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-xl p-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Forgot Password?</h1>
      <p class="text-gray-600 mt-2">Enter your email to receive reset instructions</p>
    </div>

    <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-6">
      <font-awesome-icon icon="check-circle" class="mr-2" />
      Password reset instructions have been sent to your email.
    </div>

    <form v-if="!success" @submit.prevent="requestReset" class="space-y-6">
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

      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <font-awesome-icon v-if="loading" icon="spinner" spin class="mr-2" />
        {{ loading ? 'Sending...' : 'Send Reset Instructions' }}
      </button>
    </form>

    <div class="mt-6 text-center">
      <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
        <font-awesome-icon icon="arrow-left" class="mr-1" />
        Back to Login
      </router-link>
    </div>
  </div>
</template>
