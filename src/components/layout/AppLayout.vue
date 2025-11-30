<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', icon: 'home', route: '/dashboard' },
  { name: 'Change Password', icon: 'key', route: '/change-password' },
  { name: 'TFA Settings', icon: 'shield-alt', route: '/tfa-settings' },
  { name: 'Help', icon: 'question-circle', route: '/help' }
]

const adminNavigation = [
  { name: 'Settings', icon: 'cog', route: '/settings' }
]

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Mobile sidebar backdrop -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <div 
      :class="[
        'fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex items-center justify-center h-16 bg-gray-900">
        <span class="text-white text-xl font-semibold">Admin Panel</span>
      </div>
      
      <nav class="mt-5 px-2">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.route"
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white mb-1"
          active-class="bg-gray-900 text-white"
          @click="sidebarOpen = false"
        >
          <font-awesome-icon :icon="item.icon" class="mr-4 h-5 w-5" />
          {{ item.name }}
        </router-link>

        <!-- Admin navigation -->
        <div v-if="authStore.isSuperAdmin" class="mt-8">
          <h3 class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Administration
          </h3>
          <router-link
            v-for="item in adminNavigation"
            :key="item.name"
            :to="item.route"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white mt-1"
            active-class="bg-gray-900 text-white"
            @click="sidebarOpen = false"
          >
            <font-awesome-icon :icon="item.icon" class="mr-4 h-5 w-5" />
            {{ item.name }}
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Top bar -->
      <div class="sticky top-0 z-10 bg-white shadow">
        <div class="flex items-center justify-between h-16 px-4">
          <button
            @click="toggleSidebar"
            class="text-gray-500 hover:text-gray-600 lg:hidden"
          >
            <font-awesome-icon icon="bars" class="h-6 w-6" />
          </button>

          <div class="flex items-center">
            <span class="text-gray-700 mr-4">{{ authStore.currentUser?.name }}</span>
            <button
              @click="logout"
              class="flex items-center text-gray-500 hover:text-gray-700"
            >
              <font-awesome-icon icon="sign-out-alt" class="h-5 w-5" />
              <span class="ml-2 hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
