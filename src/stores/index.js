import { createPinia } from 'pinia'

export const pinia = createPinia()

export { useAuthStore } from './auth'
export { useSettingsStore } from './settings'
