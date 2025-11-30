<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const currentPassword = ref('')
const newPassword = ref('')
const newPasswordConfirmation = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref(false)

const changePassword = async () => {
  if (newPassword.value !== newPasswordConfirmation.value) {
    error.value = 'New passwords do not match'
    return
  }

  if (newPassword.value.length < 8) {
    error.value = 'New password must be at least 8 characters long'
    return
  }

  error.value = ''
  success.value = false
  loading.value = true

  try {
    await authStore.changePassword(currentPassword.value, newPassword.value, newPasswordConfirmation.value)
    success.value = true
    currentPassword.value = ''
    newPassword.value = ''
    newPasswordConfirmation.value = ''
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Change Password</h1>
      <p class="text-gray-600 mt-1">Update your account password</p>
    </div>

    <div class="max-w-lg">
      <div class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="changePassword" class="space-y-6">
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            <font-awesome-icon icon="exclamation-triangle" class="mr-2" />
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
            <font-awesome-icon icon="check-circle" class="mr-2" />
            Your password has been changed successfully.
          </div>

          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <font-awesome-icon icon="lock" class="text-gray-400" />
              </div>
              <input
                id="currentPassword"
                v-model="currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                required
                class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <font-awesome-icon :icon="showCurrentPassword ? 'eye-slash' : 'eye'" class="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <font-awesome-icon icon="lock" class="text-gray-400" />
              </div>
              <input
                id="newPassword"
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                required
                minlength="8"
                class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <font-awesome-icon :icon="showNewPassword ? 'eye-slash' : 'eye'" class="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-1">Must be at least 8 characters long</p>
          </div>

          <div>
            <label for="newPasswordConfirmation" class="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <font-awesome-icon icon="lock" class="text-gray-400" />
              </div>
              <input
                id="newPasswordConfirmation"
                v-model="newPasswordConfirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                minlength="8"
                class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <font-awesome-icon :icon="showConfirmPassword ? 'eye-slash' : 'eye'" class="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <font-awesome-icon v-if="loading" icon="spinner" spin class="mr-2" />
            {{ loading ? 'Changing Password...' : 'Change Password' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
