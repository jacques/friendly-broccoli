<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { name: 'Companies', route: '/settings/companies', icon: 'building' },
  { name: 'Feature Flags', route: '/settings/feature-flags', icon: 'flag' },
  { name: 'Permissions', route: '/settings/permissions', icon: 'user-shield' },
  { name: 'Roles', route: '/settings/roles', icon: 'users' },
  { name: 'Integrations', route: '/settings/integrations', icon: 'plug' }
]

const currentTab = computed(() => {
  return tabs.find(tab => route.path === tab.route)?.name || 'Companies'
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600 mt-1">Manage system configuration and integrations</p>
    </div>

    <!-- Tabs Navigation -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px overflow-x-auto">
          <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.route"
            class="flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap"
            :class="[
              currentTab === tab.name
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <font-awesome-icon :icon="tab.icon" class="mr-2" />
            {{ tab.name }}
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-white rounded-lg shadow">
      <router-view />
    </div>
  </div>
</template>
