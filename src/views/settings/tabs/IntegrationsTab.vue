<script setup>
import { ref } from 'vue'

// Active integration section
const activeSection = ref('google-maps')

// Google Maps Settings
const googleMaps = ref({
  javascriptApiKey: '',
  backendApiKey: ''
})

// Clickatell Settings
const clickatell = ref({
  provider: 'developer_central', // 'developer_central' or 'rest_api'
  apiKey: '',
  apiId: ''
})

// Panacea Mobile Settings
const panaceaMobile = ref({
  username: '',
  password: '',
  apiKey: '',
  prefixRouting: [
    { prefix: '+27', route: 'vodacom', description: 'South Africa - Vodacom' },
    { prefix: '+1', route: 'twilio', description: 'USA - Twilio' }
  ]
})

// Prefix Routing Modal
const showPrefixModal = ref(false)
const editingPrefixIndex = ref(null)
const prefixForm = ref({
  prefix: '',
  route: '',
  description: ''
})

const loading = ref({
  googleMaps: false,
  clickatell: false,
  panaceaMobile: false
})

const success = ref({
  googleMaps: false,
  clickatell: false,
  panaceaMobile: false
})

// Save handlers
const saveGoogleMaps = async () => {
  loading.value.googleMaps = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value.googleMaps = false
  success.value.googleMaps = true
  setTimeout(() => { success.value.googleMaps = false }, 3000)
}

const saveClickatell = async () => {
  loading.value.clickatell = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value.clickatell = false
  success.value.clickatell = true
  setTimeout(() => { success.value.clickatell = false }, 3000)
}

const savePanaceaMobile = async () => {
  loading.value.panaceaMobile = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value.panaceaMobile = false
  success.value.panaceaMobile = true
  setTimeout(() => { success.value.panaceaMobile = false }, 3000)
}

// Prefix routing handlers
const openAddPrefixModal = () => {
  editingPrefixIndex.value = null
  prefixForm.value = { prefix: '', route: '', description: '' }
  showPrefixModal.value = true
}

const openEditPrefixModal = (index) => {
  editingPrefixIndex.value = index
  prefixForm.value = { ...panaceaMobile.value.prefixRouting[index] }
  showPrefixModal.value = true
}

const closePrefixModal = () => {
  showPrefixModal.value = false
  editingPrefixIndex.value = null
}

const savePrefix = () => {
  if (editingPrefixIndex.value !== null) {
    panaceaMobile.value.prefixRouting[editingPrefixIndex.value] = { ...prefixForm.value }
  } else {
    panaceaMobile.value.prefixRouting.push({ ...prefixForm.value })
  }
  closePrefixModal()
}

const deletePrefix = (index) => {
  if (confirm('Are you sure you want to delete this prefix route?')) {
    panaceaMobile.value.prefixRouting.splice(index, 1)
  }
}
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-gray-900">Integrations</h2>
      <p class="text-sm text-gray-500">Configure third-party service integrations</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <nav class="space-y-1">
          <button
            @click="activeSection = 'google-maps'"
            class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md"
            :class="activeSection === 'google-maps' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'"
          >
            <font-awesome-icon icon="map" class="mr-3" />
            Google Maps
          </button>
          <button
            @click="activeSection = 'clickatell'"
            class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md"
            :class="activeSection === 'clickatell' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'"
          >
            <font-awesome-icon icon="sms" class="mr-3" />
            Clickatell
          </button>
          <button
            @click="activeSection = 'panacea-mobile'"
            class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md"
            :class="activeSection === 'panacea-mobile' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'"
          >
            <font-awesome-icon icon="mobile-alt" class="mr-3" />
            Panacea Mobile
          </button>
        </nav>
      </div>

      <!-- Content Area -->
      <div class="lg:col-span-3">
        <!-- Google Maps Settings -->
        <div v-if="activeSection === 'google-maps'" class="border border-gray-200 rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center">
              <font-awesome-icon icon="map" class="text-green-600 mr-3 text-xl" />
              <div>
                <h3 class="font-semibold text-gray-900">Google Maps</h3>
                <p class="text-sm text-gray-500">Configure Google Maps API keys for mapping features</p>
              </div>
            </div>
          </div>
          <form @submit.prevent="saveGoogleMaps" class="p-6 space-y-4">
            <div v-if="success.googleMaps" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
              <font-awesome-icon icon="check-circle" class="mr-2" />
              Google Maps settings saved successfully.
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">JavaScript API Key</label>
              <input
                v-model="googleMaps.javascriptApiKey"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="AIza..."
              />
              <p class="text-xs text-gray-500 mt-1">Used for client-side map rendering in the browser</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Backend API Key</label>
              <input
                v-model="googleMaps.backendApiKey"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="AIza..."
              />
              <p class="text-xs text-gray-500 mt-1">Used for server-side API calls (geocoding, directions, etc.)</p>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 class="text-sm font-medium text-blue-800 mb-2">API Key Setup</h4>
              <ul class="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li>Go to Google Cloud Console</li>
                <li>Enable Maps JavaScript API and Geocoding API</li>
                <li>Create separate keys for JavaScript and backend usage</li>
                <li>Restrict JavaScript key to your domain(s)</li>
                <li>Restrict backend key to server IP addresses</li>
              </ul>
            </div>

            <div class="flex justify-end pt-4">
              <button
                type="submit"
                :disabled="loading.googleMaps"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <font-awesome-icon v-if="loading.googleMaps" icon="spinner" spin class="mr-2" />
                <font-awesome-icon v-else icon="save" class="mr-2" />
                Save Settings
              </button>
            </div>
          </form>
        </div>

        <!-- Clickatell Settings -->
        <div v-if="activeSection === 'clickatell'" class="border border-gray-200 rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center">
              <font-awesome-icon icon="sms" class="text-blue-600 mr-3 text-xl" />
              <div>
                <h3 class="font-semibold text-gray-900">Clickatell</h3>
                <p class="text-sm text-gray-500">Configure Clickatell SMS gateway integration</p>
              </div>
            </div>
          </div>
          <form @submit.prevent="saveClickatell" class="p-6 space-y-4">
            <div v-if="success.clickatell" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
              <font-awesome-icon icon="check-circle" class="mr-2" />
              Clickatell settings saved successfully.
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">API Provider</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="clickatell.provider"
                    type="radio"
                    value="developer_central"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">Developer Central (Legacy)</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="clickatell.provider"
                    type="radio"
                    value="rest_api"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">REST API (Recommended)</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input
                v-model="clickatell.apiKey"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Clickatell API key"
              />
            </div>

            <div v-if="clickatell.provider === 'developer_central'">
              <label class="block text-sm font-medium text-gray-700 mb-1">API ID</label>
              <input
                v-model="clickatell.apiId"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Developer Central API ID"
              />
              <p class="text-xs text-gray-500 mt-1">Required for Developer Central integration</p>
            </div>

            <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h4 class="text-sm font-medium text-yellow-800 mb-2">
                <font-awesome-icon icon="info-circle" class="mr-1" />
                Provider Information
              </h4>
              <div v-if="clickatell.provider === 'developer_central'" class="text-sm text-yellow-700">
                <p>Developer Central is the legacy Clickatell platform. Consider migrating to the REST API for better features and support.</p>
              </div>
              <div v-else class="text-sm text-yellow-700">
                <p>REST API is the recommended integration method with better reliability and features.</p>
              </div>
            </div>

            <div class="flex justify-end pt-4">
              <button
                type="submit"
                :disabled="loading.clickatell"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <font-awesome-icon v-if="loading.clickatell" icon="spinner" spin class="mr-2" />
                <font-awesome-icon v-else icon="save" class="mr-2" />
                Save Settings
              </button>
            </div>
          </form>
        </div>

        <!-- Panacea Mobile Settings -->
        <div v-if="activeSection === 'panacea-mobile'" class="border border-gray-200 rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center">
              <font-awesome-icon icon="mobile-alt" class="text-purple-600 mr-3 text-xl" />
              <div>
                <h3 class="font-semibold text-gray-900">Panacea Mobile</h3>
                <p class="text-sm text-gray-500">Configure Panacea Mobile SMS gateway with prefix routing</p>
              </div>
            </div>
          </div>
          <form @submit.prevent="savePanaceaMobile" class="p-6 space-y-6">
            <div v-if="success.panaceaMobile" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
              <font-awesome-icon icon="check-circle" class="mr-2" />
              Panacea Mobile settings saved successfully.
            </div>

            <!-- Credentials Section -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">API Credentials</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    v-model="panaceaMobile.username"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    v-model="panaceaMobile.password"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  v-model="panaceaMobile.apiKey"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your Panacea Mobile API key"
                />
              </div>
            </div>

            <!-- Prefix Routing Section -->
            <div class="space-y-4">
              <div class="flex items-center justify-between border-b border-gray-200 pb-2">
                <h4 class="text-sm font-medium text-gray-900">Prefix Routing</h4>
                <button
                  type="button"
                  @click="openAddPrefixModal"
                  class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <font-awesome-icon icon="plus" class="mr-1" />
                  Add Route
                </button>
              </div>

              <p class="text-sm text-gray-500">
                Configure routing rules based on phone number prefixes to route messages through different carriers or gateways.
              </p>

              <div v-if="panaceaMobile.prefixRouting.length > 0" class="border border-gray-200 rounded-md overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Prefix</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="(route, index) in panaceaMobile.prefixRouting" :key="index">
                      <td class="px-4 py-2">
                        <code class="bg-gray-100 px-2 py-1 rounded text-sm">{{ route.prefix }}</code>
                      </td>
                      <td class="px-4 py-2 text-sm text-gray-900">{{ route.route }}</td>
                      <td class="px-4 py-2 text-sm text-gray-500">{{ route.description }}</td>
                      <td class="px-4 py-2 text-right">
                        <button @click="openEditPrefixModal(index)" class="text-blue-600 hover:text-blue-900 mr-2">
                          <font-awesome-icon icon="edit" />
                        </button>
                        <button @click="deletePrefix(index)" class="text-red-600 hover:text-red-900">
                          <font-awesome-icon icon="trash" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-else class="bg-gray-50 border border-gray-200 rounded-md p-4 text-center text-gray-500">
                <font-awesome-icon icon="info-circle" class="mr-2" />
                No prefix routes configured. Add routes to enable carrier-specific routing.
              </div>
            </div>

            <div class="flex justify-end pt-4">
              <button
                type="submit"
                :disabled="loading.panaceaMobile"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <font-awesome-icon v-if="loading.panaceaMobile" icon="spinner" spin class="mr-2" />
                <font-awesome-icon v-else icon="save" class="mr-2" />
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Prefix Routing Modal -->
    <div v-if="showPrefixModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingPrefixIndex !== null ? 'Edit Prefix Route' : 'Add Prefix Route' }}
          </h3>
        </div>
        <form @submit.prevent="savePrefix" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prefix</label>
            <input
              v-model="prefixForm.prefix"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., +27, +1, +44"
            />
            <p class="text-xs text-gray-500 mt-1">Phone number prefix to match (including country code)</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Route</label>
            <input
              v-model="prefixForm.route"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., vodacom, twilio, default"
            />
            <p class="text-xs text-gray-500 mt-1">Gateway or carrier identifier</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              v-model="prefixForm.description"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., South Africa - Vodacom"
            />
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closePrefixModal"
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
