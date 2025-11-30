<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const editingRole = ref(null)
const form = ref({
  name: '',
  description: '',
  permissions: []
})

// Demo permissions
const availablePermissions = [
  { id: 1, name: 'View Users', key: 'users.view' },
  { id: 2, name: 'Create Users', key: 'users.create' },
  { id: 3, name: 'Edit Users', key: 'users.edit' },
  { id: 4, name: 'Delete Users', key: 'users.delete' },
  { id: 5, name: 'View Companies', key: 'companies.view' },
  { id: 6, name: 'Manage Companies', key: 'companies.manage' },
  { id: 7, name: 'View Settings', key: 'settings.view' },
  { id: 8, name: 'Manage Settings', key: 'settings.manage' },
  { id: 9, name: 'View Reports', key: 'reports.view' },
  { id: 10, name: 'Export Reports', key: 'reports.export' }
]

// Demo data
const roles = ref([
  { 
    id: 1, 
    name: 'Super Admin', 
    description: 'Full system access', 
    permissions: availablePermissions.map(p => p.id),
    userCount: 2
  },
  { 
    id: 2, 
    name: 'Admin', 
    description: 'Administrative access without system settings', 
    permissions: [1, 2, 3, 4, 5, 6, 9, 10],
    userCount: 5
  },
  { 
    id: 3, 
    name: 'Manager', 
    description: 'Can manage users and view reports', 
    permissions: [1, 2, 3, 5, 9],
    userCount: 12
  },
  { 
    id: 4, 
    name: 'Viewer', 
    description: 'Read-only access', 
    permissions: [1, 5, 9],
    userCount: 45
  }
])

const getPermissionNames = (permissionIds) => {
  return permissionIds
    .map(id => availablePermissions.find(p => p.id === id)?.name)
    .filter(Boolean)
}

const openCreateModal = () => {
  editingRole.value = null
  form.value = { name: '', description: '', permissions: [] }
  showModal.value = true
}

const openEditModal = (role) => {
  editingRole.value = role
  form.value = { ...role, permissions: [...role.permissions] }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingRole.value = null
}

const saveRole = () => {
  if (editingRole.value) {
    const index = roles.value.findIndex(r => r.id === editingRole.value.id)
    if (index !== -1) {
      roles.value[index] = { ...form.value, id: editingRole.value.id, userCount: editingRole.value.userCount }
    }
  } else {
    roles.value.push({ ...form.value, id: Date.now(), userCount: 0 })
  }
  closeModal()
}

const deleteRole = (role) => {
  if (role.userCount > 0) {
    alert(`Cannot delete role "${role.name}" because it has ${role.userCount} users assigned.`)
    return
  }
  if (confirm(`Are you sure you want to delete "${role.name}"?`)) {
    roles.value = roles.value.filter(r => r.id !== role.id)
  }
}

const togglePermission = (permId) => {
  const index = form.value.permissions.indexOf(permId)
  if (index === -1) {
    form.value.permissions.push(permId)
  } else {
    form.value.permissions.splice(index, 1)
  }
}

const selectAllPermissions = () => {
  form.value.permissions = availablePermissions.map(p => p.id)
}

const clearAllPermissions = () => {
  form.value.permissions = []
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Roles</h2>
        <p class="text-sm text-gray-500">Define user roles and their permissions</p>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Role
      </button>
    </div>

    <!-- Roles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="role in roles"
        :key="role.id"
        class="border border-gray-200 rounded-lg p-4"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="font-semibold text-gray-900">{{ role.name }}</h3>
            <p class="text-sm text-gray-500">{{ role.description }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="openEditModal(role)" class="text-blue-600 hover:text-blue-900 p-1">
              <font-awesome-icon icon="edit" />
            </button>
            <button @click="deleteRole(role)" class="text-red-600 hover:text-red-900 p-1">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>
        
        <div class="flex items-center text-sm text-gray-500 mb-3">
          <font-awesome-icon icon="users" class="mr-2" />
          {{ role.userCount }} users
        </div>

        <div class="border-t border-gray-200 pt-3">
          <p class="text-xs font-medium text-gray-500 uppercase mb-2">Permissions ({{ role.permissions.length }})</p>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="permName in getPermissionNames(role.permissions).slice(0, 5)"
              :key="permName"
              class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
            >
              {{ permName }}
            </span>
            <span
              v-if="role.permissions.length > 5"
              class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
            >
              +{{ role.permissions.length - 5 }} more
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingRole ? 'Edit Role' : 'Add Role' }}
          </h3>
        </div>
        <form @submit.prevent="saveRole" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Manager"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe this role's purpose"
            ></textarea>
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700">Permissions</label>
              <div class="space-x-2">
                <button type="button" @click="selectAllPermissions" class="text-xs text-blue-600 hover:text-blue-800">
                  Select All
                </button>
                <button type="button" @click="clearAllPermissions" class="text-xs text-gray-600 hover:text-gray-800">
                  Clear
                </button>
              </div>
            </div>
            <div class="border border-gray-200 rounded-md max-h-60 overflow-y-auto">
              <div
                v-for="permission in availablePermissions"
                :key="permission.id"
                class="flex items-center px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-0"
              >
                <input
                  type="checkbox"
                  :id="`perm-${permission.id}`"
                  :checked="form.permissions.includes(permission.id)"
                  @change="togglePermission(permission.id)"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label :for="`perm-${permission.id}`" class="ml-3 flex-1 cursor-pointer">
                  <span class="text-sm font-medium text-gray-900">{{ permission.name }}</span>
                  <span class="text-xs text-gray-500 ml-2">({{ permission.key }})</span>
                </label>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ form.permissions.length }} permissions selected</p>
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
