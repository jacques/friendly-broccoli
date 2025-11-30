<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const editingFlag = ref(null)
const form = ref({
  name: '',
  key: '',
  description: '',
  enabled: true,
  rolloutPercentage: 100
})

// Demo data
const featureFlags = ref([
  { id: 1, name: 'Dark Mode', key: 'dark_mode', description: 'Enable dark mode theme', enabled: true, rolloutPercentage: 100 },
  { id: 2, name: 'New Dashboard', key: 'new_dashboard', description: 'New dashboard layout', enabled: false, rolloutPercentage: 50 },
  { id: 3, name: 'Beta Features', key: 'beta_features', description: 'Access to beta features', enabled: true, rolloutPercentage: 25 },
  { id: 4, name: 'SMS Notifications', key: 'sms_notifications', description: 'Enable SMS notifications', enabled: true, rolloutPercentage: 100 }
])

const openCreateModal = () => {
  editingFlag.value = null
  form.value = { name: '', key: '', description: '', enabled: true, rolloutPercentage: 100 }
  showModal.value = true
}

const openEditModal = (flag) => {
  editingFlag.value = flag
  form.value = { ...flag }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingFlag.value = null
}

const saveFlag = () => {
  if (editingFlag.value) {
    const index = featureFlags.value.findIndex(f => f.id === editingFlag.value.id)
    if (index !== -1) {
      featureFlags.value[index] = { ...form.value, id: editingFlag.value.id }
    }
  } else {
    featureFlags.value.push({ ...form.value, id: Date.now() })
  }
  closeModal()
}

const toggleFlag = (flag) => {
  flag.enabled = !flag.enabled
}

const deleteFlag = (flag) => {
  if (confirm(`Are you sure you want to delete "${flag.name}"?`)) {
    featureFlags.value = featureFlags.value.filter(f => f.id !== flag.id)
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Feature Flags</h2>
        <p class="text-sm text-gray-500">Control feature rollouts and availability</p>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Feature Flag
      </button>
    </div>

    <!-- Feature Flags List -->
    <div class="space-y-4">
      <div
        v-for="flag in featureFlags"
        :key="flag.id"
        class="border border-gray-200 rounded-lg p-4"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <button
              @click="toggleFlag(flag)"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :class="flag.enabled ? 'bg-blue-600' : 'bg-gray-200'"
            >
              <span
                class="inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                :class="flag.enabled ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
            <div class="ml-4">
              <h3 class="font-medium text-gray-900">{{ flag.name }}</h3>
              <p class="text-sm text-gray-500">{{ flag.description }}</p>
              <p class="text-xs text-gray-400 mt-1">Key: <code class="bg-gray-100 px-1 rounded">{{ flag.key }}</code></p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <span class="text-sm text-gray-500">Rollout</span>
              <p class="font-medium text-gray-900">{{ flag.rolloutPercentage }}%</p>
            </div>
            <div class="flex space-x-2">
              <button @click="openEditModal(flag)" class="text-blue-600 hover:text-blue-900 p-2">
                <font-awesome-icon icon="edit" />
              </button>
              <button @click="deleteFlag(flag)" class="text-red-600 hover:text-red-900 p-2">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingFlag ? 'Edit Feature Flag' : 'Add Feature Flag' }}
          </h3>
        </div>
        <form @submit.prevent="saveFlag" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Dark Mode"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Key</label>
            <input
              v-model="form.key"
              type="text"
              required
              pattern="[a-z_]+"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., dark_mode"
            />
            <p class="text-xs text-gray-500 mt-1">Lowercase letters and underscores only</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe what this feature flag controls"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rollout Percentage</label>
            <div class="flex items-center space-x-3">
              <input
                v-model.number="form.rolloutPercentage"
                type="range"
                min="0"
                max="100"
                class="flex-1"
              />
              <span class="text-gray-700 font-medium w-12 text-right">{{ form.rolloutPercentage }}%</span>
            </div>
          </div>
          <div class="flex items-center">
            <input
              v-model="form.enabled"
              type="checkbox"
              id="enabled"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="enabled" class="ml-2 text-sm text-gray-700">Enable this feature flag</label>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <font-awesome-icon icon="save" class="mr-2" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
