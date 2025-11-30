<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const editingPermission = ref(null)
const form = ref({
  name: '',
  key: '',
  description: '',
  category: 'general'
})

const categories = ['general', 'users', 'companies', 'settings', 'reports']

// Demo data
const permissions = ref([
  { id: 1, name: 'View Users', key: 'users.view', description: 'Can view user list', category: 'users' },
  { id: 2, name: 'Create Users', key: 'users.create', description: 'Can create new users', category: 'users' },
  { id: 3, name: 'Edit Users', key: 'users.edit', description: 'Can edit existing users', category: 'users' },
  { id: 4, name: 'Delete Users', key: 'users.delete', description: 'Can delete users', category: 'users' },
  { id: 5, name: 'View Companies', key: 'companies.view', description: 'Can view company list', category: 'companies' },
  { id: 6, name: 'Manage Companies', key: 'companies.manage', description: 'Can create, edit and delete companies', category: 'companies' },
  { id: 7, name: 'View Settings', key: 'settings.view', description: 'Can view settings', category: 'settings' },
  { id: 8, name: 'Manage Settings', key: 'settings.manage', description: 'Can modify settings', category: 'settings' },
  { id: 9, name: 'View Reports', key: 'reports.view', description: 'Can view reports', category: 'reports' },
  { id: 10, name: 'Export Reports', key: 'reports.export', description: 'Can export reports', category: 'reports' }
])

const groupedPermissions = () => {
  return categories.reduce((acc, category) => {
    acc[category] = permissions.value.filter(p => p.category === category)
    return acc
  }, {})
}

const openCreateModal = () => {
  editingPermission.value = null
  form.value = { name: '', key: '', description: '', category: 'general' }
  showModal.value = true
}

const openEditModal = (permission) => {
  editingPermission.value = permission
  form.value = { ...permission }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingPermission.value = null
}

const savePermission = () => {
  if (editingPermission.value) {
    const index = permissions.value.findIndex(p => p.id === editingPermission.value.id)
    if (index !== -1) {
      permissions.value[index] = { ...form.value, id: editingPermission.value.id }
    }
  } else {
    permissions.value.push({ ...form.value, id: Date.now() })
  }
  closeModal()
}

const deletePermission = (permission) => {
  if (confirm(`Are you sure you want to delete "${permission.name}"?`)) {
    permissions.value = permissions.value.filter(p => p.id !== permission.id)
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Permissions</h2>
        <p class="text-sm text-gray-500">Define granular access controls</p>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Permission
      </button>
    </div>

    <!-- Permissions by Category -->
    <div class="space-y-6">
      <div
        v-for="(perms, category) in groupedPermissions()"
        :key="category"
        class="border border-gray-200 rounded-lg"
      >
        <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
          <h3 class="font-medium text-gray-900 capitalize">{{ category }}</h3>
        </div>
        <div class="divide-y divide-gray-200">
          <div
            v-for="permission in perms"
            :key="permission.id"
            class="px-4 py-3 flex items-center justify-between"
          >
            <div>
              <h4 class="font-medium text-gray-900">{{ permission.name }}</h4>
              <p class="text-sm text-gray-500">{{ permission.description }}</p>
              <code class="text-xs bg-gray-100 px-1 rounded text-gray-600">{{ permission.key }}</code>
            </div>
            <div class="flex space-x-2">
              <button @click="openEditModal(permission)" class="text-blue-600 hover:text-blue-900 p-2">
                <font-awesome-icon icon="edit" />
              </button>
              <button @click="deletePermission(permission)" class="text-red-600 hover:text-red-900 p-2">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
          <div v-if="perms.length === 0" class="px-4 py-3 text-gray-500 text-sm">
            No permissions in this category
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingPermission ? 'Edit Permission' : 'Add Permission' }}
          </h3>
        </div>
        <form @submit.prevent="savePermission" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., View Users"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Key</label>
            <input
              v-model="form.key"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., users.view"
            />
            <p class="text-xs text-gray-500 mt-1">Use format: category.action</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              v-model="form.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option v-for="cat in categories" :key="cat" :value="cat" class="capitalize">
                {{ cat }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe what this permission allows"
            ></textarea>
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
