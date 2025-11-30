<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">Welcome back, {{ authStore.currentUser?.name }}!</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Stats Cards -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100">
            <font-awesome-icon icon="users" class="text-blue-600 text-xl" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Users</p>
            <p class="text-2xl font-semibold text-gray-900">1,234</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100">
            <font-awesome-icon icon="building" class="text-green-600 text-xl" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Companies</p>
            <p class="text-2xl font-semibold text-gray-900">56</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100">
            <font-awesome-icon icon="flag" class="text-yellow-600 text-xl" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Feature Flags</p>
            <p class="text-2xl font-semibold text-gray-900">12</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100">
            <font-awesome-icon icon="plug" class="text-purple-600 text-xl" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Integrations</p>
            <p class="text-2xl font-semibold text-gray-900">3</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link
          to="/change-password"
          class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <font-awesome-icon icon="key" class="text-gray-600 mr-3" />
          <span class="text-gray-700">Change Password</span>
        </router-link>

        <router-link
          to="/tfa-settings"
          class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <font-awesome-icon icon="shield-alt" class="text-gray-600 mr-3" />
          <span class="text-gray-700">TFA Settings</span>
        </router-link>

        <router-link
          to="/help"
          class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <font-awesome-icon icon="question-circle" class="text-gray-600 mr-3" />
          <span class="text-gray-700">Help Center</span>
        </router-link>

        <router-link
          v-if="authStore.isSuperAdmin"
          to="/settings"
          class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <font-awesome-icon icon="cog" class="text-gray-600 mr-3" />
          <span class="text-gray-700">Admin Settings</span>
        </router-link>
      </div>
    </div>

    <!-- Account Status -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Account Status</h2>
      <div class="space-y-4">
        <div class="flex items-center justify-between py-3 border-b border-gray-200">
          <div class="flex items-center">
            <font-awesome-icon icon="user" class="text-gray-400 mr-3" />
            <span class="text-gray-700">Account Type</span>
          </div>
          <span class="px-3 py-1 text-sm font-medium rounded-full" :class="authStore.isSuperAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'">
            {{ authStore.isSuperAdmin ? 'Super Admin' : 'User' }}
          </span>
        </div>

        <div class="flex items-center justify-between py-3 border-b border-gray-200">
          <div class="flex items-center">
            <font-awesome-icon icon="shield-alt" class="text-gray-400 mr-3" />
            <span class="text-gray-700">Two-Factor Authentication</span>
          </div>
          <span class="px-3 py-1 text-sm font-medium rounded-full" :class="authStore.tfaEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
            {{ authStore.tfaEnabled ? 'Enabled' : 'Disabled' }}
          </span>
        </div>

        <div class="flex items-center justify-between py-3">
          <div class="flex items-center">
            <font-awesome-icon icon="envelope" class="text-gray-400 mr-3" />
            <span class="text-gray-700">Email</span>
          </div>
          <span class="text-gray-600">{{ authStore.currentUser?.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
