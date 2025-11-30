<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref(false)

const token = route.query.token || ''

const resetPassword = async () => {
  if (password.value !== passwordConfirmation.value) {
    error.value = 'Passwords do not match'
    return
  }

  error.value = ''
  loading.value = true

  try {
    await authStore.resetPassword(token, password.value, passwordConfirmation.value)
    success.value = true
    setTimeout(() => {
      router.push('/login')
    }, 3000)
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
      <h1 class="text-3xl font-bold text-gray-800">Reset Password</h1>
      <p class="text-gray-600 mt-2">Enter your new password</p>
    </div>

    <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-6">
      <font-awesome-icon icon="check-circle" class="mr-2" />
      Your password has been reset successfully. Redirecting to login...
    </div>

    <form v-if="!success" @submit.prevent="resetPassword" class="space-y-6">
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        <font-awesome-icon icon="exclamation-triangle" class="mr-2" />
        {{ error }}
      </div>

      <div v-if="!token" class="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded-md">
        <font-awesome-icon icon="exclamation-triangle" class="mr-2" />
        Invalid or missing reset token. Please request a new password reset.
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          New Password
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
            minlength="8"
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

      <div>
        <label for="passwordConfirmation" class="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <font-awesome-icon icon="lock" class="text-gray-400" />
          </div>
          <input
            id="passwordConfirmation"
            v-model="passwordConfirmation"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            required
            minlength="8"
            class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
          />
          <button
            type="button"
            @click="showPasswordConfirmation = !showPasswordConfirmation"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <font-awesome-icon :icon="showPasswordConfirmation ? 'eye-slash' : 'eye'" class="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading || !token"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <font-awesome-icon v-if="loading" icon="spinner" spin class="mr-2" />
        {{ loading ? 'Resetting...' : 'Reset Password' }}
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
