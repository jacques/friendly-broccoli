<script setup>
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '../../../stores/settings'

const settingsStore = useSettingsStore()

const showModal = ref(false)
const editingCompany = ref(null)
const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  status: 'active'
})

// Demo data
const companies = ref([
  { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', phone: '+1 234 567 890', status: 'active' },
  { id: 2, name: 'Tech Solutions Ltd', email: 'info@techsol.com', phone: '+1 234 567 891', status: 'active' },
  { id: 3, name: 'Global Industries', email: 'hello@global.com', phone: '+1 234 567 892', status: 'inactive' }
])

onMounted(() => {
  // settingsStore.fetchCompanies()
})

const openCreateModal = () => {
  editingCompany.value = null
  form.value = { name: '', email: '', phone: '', address: '', status: 'active' }
  showModal.value = true
}

const openEditModal = (company) => {
  editingCompany.value = company
  form.value = { ...company }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingCompany.value = null
}

const saveCompany = () => {
  if (editingCompany.value) {
    // Update existing
    const index = companies.value.findIndex(c => c.id === editingCompany.value.id)
    if (index !== -1) {
      companies.value[index] = { ...form.value, id: editingCompany.value.id }
    }
  } else {
    // Create new
    companies.value.push({ ...form.value, id: Date.now() })
  }
  closeModal()
}

const deleteCompany = (company) => {
  if (confirm(`Are you sure you want to delete ${company.name}?`)) {
    companies.value = companies.value.filter(c => c.id !== company.id)
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Companies</h2>
        <p class="text-sm text-gray-500">Manage registered companies</p>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Company
      </button>
    </div>

    <!-- Companies Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="company in companies" :key="company.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <font-awesome-icon icon="building" class="text-gray-400 mr-3" />
                <span class="font-medium text-gray-900">{{ company.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ company.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ company.phone }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
              >
                {{ company.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openEditModal(company)" class="text-blue-600 hover:text-blue-900 mr-3">
                <font-awesome-icon icon="edit" />
              </button>
              <button @click="deleteCompany(company)" class="text-red-600 hover:text-red-900">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingCompany ? 'Edit Company' : 'Add Company' }}
          </h3>
        </div>
        <form @submit.prevent="saveCompany" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              v-model="form.address"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
