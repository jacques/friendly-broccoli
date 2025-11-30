<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const setupStep = ref('initial') // 'initial', 'setup', 'confirm', 'disable'
const qrCode = ref('')
const secret = ref('')
const confirmCode = ref('')
const disableCode = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const startEnableTfa = async () => {
  error.value = ''
  loading.value = true

  try {
    const result = await authStore.enableTfa()
    qrCode.value = result.qrCode
    secret.value = result.secret
    setupStep.value = 'setup'
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const confirmTfa = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.confirmTfa(confirmCode.value)
    success.value = 'Two-factor authentication has been enabled successfully.'
    setupStep.value = 'initial'
    confirmCode.value = ''
    qrCode.value = ''
    secret.value = ''
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const startDisableTfa = () => {
  setupStep.value = 'disable'
  error.value = ''
  success.value = ''
}

const disableTfa = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.disableTfa(disableCode.value)
    success.value = 'Two-factor authentication has been disabled.'
    setupStep.value = 'initial'
    disableCode.value = ''
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const cancelSetup = () => {
  setupStep.value = 'initial'
  confirmCode.value = ''
  disableCode.value = ''
  qrCode.value = ''
  secret.value = ''
  error.value = ''
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Two-Factor Authentication</h1>
      <p class="text-gray-600 mt-1">Manage your account security settings</p>
    </div>

    <div class="max-w-lg">
      <div class="bg-white rounded-lg shadow p-6">
        <!-- Status Display -->
        <div class="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
          <div class="flex items-center">
            <div class="p-3 rounded-full" :class="authStore.tfaEnabled ? 'bg-green-100' : 'bg-gray-100'">
              <font-awesome-icon icon="shield-alt" :class="authStore.tfaEnabled ? 'text-green-600' : 'text-gray-400'" class="text-xl" />
            </div>
            <div class="ml-4">
              <p class="font-medium text-gray-900">Two-Factor Authentication</p>
              <p class="text-sm" :class="authStore.tfaEnabled ? 'text-green-600' : 'text-gray-500'">
                {{ authStore.tfaEnabled ? 'Enabled' : 'Not enabled' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Alerts -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
          <font-awesome-icon icon="exclamation-triangle" class="mr-2" />
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-6">
          <font-awesome-icon icon="check-circle" class="mr-2" />
          {{ success }}
        </div>

        <!-- Initial State -->
        <div v-if="setupStep === 'initial'">
          <div v-if="!authStore.tfaEnabled">
            <div class="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-6">
              <font-awesome-icon icon="info-circle" class="mr-2" />
              Add an extra layer of security to your account by enabling two-factor authentication.
            </div>
            <button
              @click="startEnableTfa"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <font-awesome-icon v-if="loading" icon="spinner" spin class="mr-2" />
              {{ loading ? 'Setting up...' : 'Enable Two-Factor Authentication' }}
            </button>
          </div>

          <div v-else>
            <div class="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md mb-6">
              <font-awesome-icon icon="exclamation-triangle" class="mr-2" />
              Disabling two-factor authentication will make your account less secure.
            </div>
            <button
              @click="startDisableTfa"
              class="w-full flex justify-center py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Disable Two-Factor Authentication
            </button>
          </div>
        </div>

        <!-- Setup Step -->
        <div v-if="setupStep === 'setup'">
          <div class="text-center mb-6">
            <p class="text-sm text-gray-600 mb-4">
              Scan this QR code with your authenticator app (like Google Authenticator or Authy):
            </p>
            <!-- Placeholder for QR code - in real app, display actual QR image -->
            <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
              <div v-if="qrCode" class="flex justify-center">
                <img :src="qrCode" alt="QR Code" class="w-48 h-48" />
              </div>
              <div v-else class="text-gray-500">
                <font-awesome-icon icon="mobile-alt" class="text-4xl mb-2" />
                <p>QR Code will appear here</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-2">Or enter this code manually:</p>
            <code class="bg-gray-100 px-3 py-1 rounded text-sm font-mono">{{ secret || 'DEMO-SECRET-KEY' }}</code>
          </div>

          <div class="space-y-4">
            <div>
              <label for="confirmCode" class="block text-sm font-medium text-gray-700 mb-1">
                Enter the 6-digit code from your app:
              </label>
              <input
                id="confirmCode"
                v-model="confirmCode"
                type="text"
                maxlength="6"
                pattern="[0-9]{6}"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center text-xl tracking-widest"
                placeholder="000000"
              />
            </div>

            <div class="flex space-x-3">
              <button
                @click="cancelSetup"
                class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="confirmTfa"
                :disabled="loading || confirmCode.length !== 6"
                class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <font-awesome-icon v-if="loading" icon="spinner" spin class="mr-2" />
                {{ loading ? 'Verifying...' : 'Confirm' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Disable Step -->
        <div v-if="setupStep === 'disable'">
          <div class="space-y-4">
            <p class="text-sm text-gray-600">
              Enter the 6-digit code from your authenticator app to disable two-factor authentication:
            </p>

            <div>
              <label for="disableCode" class="block text-sm font-medium text-gray-700 mb-1">
                Authentication Code
              </label>
              <input
                id="disableCode"
                v-model="disableCode"
                type="text"
                maxlength="6"
                pattern="[0-9]{6}"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center text-xl tracking-widest"
                placeholder="000000"
              />
            </div>

            <div class="flex space-x-3">
              <button
                @click="cancelSetup"
                class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="disableTfa"
                :disabled="loading || disableCode.length !== 6"
                class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                <font-awesome-icon v-if="loading" icon="spinner" spin class="mr-2" />
                {{ loading ? 'Disabling...' : 'Disable TFA' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
