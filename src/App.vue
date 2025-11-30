<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import AppLayout from './components/layout/AppLayout.vue'
import AuthLayout from './components/layout/AuthLayout.vue'

const route = useRoute()
const authStore = useAuthStore()

const isAuthPage = computed(() => {
  const authRoutes = ['Login', 'LostPassword', 'ResetPassword', 'TfaVerify']
  return authRoutes.includes(route.name)
})
</script>

<template>
  <AuthLayout v-if="isAuthPage || !authStore.isAuthenticated">
    <router-view />
  </AuthLayout>
  <AppLayout v-else>
    <router-view />
  </AppLayout>
</template>

<style scoped>
</style>
