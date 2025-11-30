import { defineStore } from 'pinia'
import axios from 'axios'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    companies: [],
    featureFlags: [],
    permissions: [],
    roles: [],
    integrations: {
      googleMaps: {
        javascriptApiKey: '',
        backendApiKey: ''
      },
      clickatell: {
        provider: 'developer_central', // 'developer_central' or 'rest_api'
        apiKey: '',
        apiId: ''
      },
      panaceaMobile: {
        username: '',
        password: '',
        apiKey: '',
        prefixRouting: []
      }
    },
    loading: false,
    error: null
  }),

  actions: {
    // Companies
    async fetchCompanies() {
      this.loading = true
      try {
        const response = await axios.get('/api/admin/companies')
        this.companies = response.data.companies
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch companies'
      } finally {
        this.loading = false
      }
    },

    async createCompany(company) {
      try {
        const response = await axios.post('/api/admin/companies', company)
        this.companies.push(response.data.company)
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create company')
      }
    },

    async updateCompany(id, company) {
      try {
        const response = await axios.put(`/api/admin/companies/${id}`, company)
        const index = this.companies.findIndex(c => c.id === id)
        if (index !== -1) {
          this.companies[index] = response.data.company
        }
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update company')
      }
    },

    async deleteCompany(id) {
      try {
        await axios.delete(`/api/admin/companies/${id}`)
        this.companies = this.companies.filter(c => c.id !== id)
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete company')
      }
    },

    // Feature Flags
    async fetchFeatureFlags() {
      this.loading = true
      try {
        const response = await axios.get('/api/admin/feature-flags')
        this.featureFlags = response.data.featureFlags
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch feature flags'
      } finally {
        this.loading = false
      }
    },

    async createFeatureFlag(flag) {
      try {
        const response = await axios.post('/api/admin/feature-flags', flag)
        this.featureFlags.push(response.data.featureFlag)
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create feature flag')
      }
    },

    async updateFeatureFlag(id, flag) {
      try {
        const response = await axios.put(`/api/admin/feature-flags/${id}`, flag)
        const index = this.featureFlags.findIndex(f => f.id === id)
        if (index !== -1) {
          this.featureFlags[index] = response.data.featureFlag
        }
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update feature flag')
      }
    },

    async deleteFeatureFlag(id) {
      try {
        await axios.delete(`/api/admin/feature-flags/${id}`)
        this.featureFlags = this.featureFlags.filter(f => f.id !== id)
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete feature flag')
      }
    },

    // Permissions
    async fetchPermissions() {
      this.loading = true
      try {
        const response = await axios.get('/api/admin/permissions')
        this.permissions = response.data.permissions
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch permissions'
      } finally {
        this.loading = false
      }
    },

    async createPermission(permission) {
      try {
        const response = await axios.post('/api/admin/permissions', permission)
        this.permissions.push(response.data.permission)
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create permission')
      }
    },

    async updatePermission(id, permission) {
      try {
        const response = await axios.put(`/api/admin/permissions/${id}`, permission)
        const index = this.permissions.findIndex(p => p.id === id)
        if (index !== -1) {
          this.permissions[index] = response.data.permission
        }
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update permission')
      }
    },

    async deletePermission(id) {
      try {
        await axios.delete(`/api/admin/permissions/${id}`)
        this.permissions = this.permissions.filter(p => p.id !== id)
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete permission')
      }
    },

    // Roles
    async fetchRoles() {
      this.loading = true
      try {
        const response = await axios.get('/api/admin/roles')
        this.roles = response.data.roles
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch roles'
      } finally {
        this.loading = false
      }
    },

    async createRole(role) {
      try {
        const response = await axios.post('/api/admin/roles', role)
        this.roles.push(response.data.role)
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create role')
      }
    },

    async updateRole(id, role) {
      try {
        const response = await axios.put(`/api/admin/roles/${id}`, role)
        const index = this.roles.findIndex(r => r.id === id)
        if (index !== -1) {
          this.roles[index] = response.data.role
        }
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update role')
      }
    },

    async deleteRole(id) {
      try {
        await axios.delete(`/api/admin/roles/${id}`)
        this.roles = this.roles.filter(r => r.id !== id)
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete role')
      }
    },

    // Integrations
    async fetchIntegrations() {
      this.loading = true
      try {
        const response = await axios.get('/api/admin/integrations')
        this.integrations = response.data.integrations
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch integrations'
      } finally {
        this.loading = false
      }
    },

    async updateGoogleMapsSettings(settings) {
      try {
        const response = await axios.put('/api/admin/integrations/google-maps', settings)
        this.integrations.googleMaps = response.data.settings
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update Google Maps settings')
      }
    },

    async updateClickatellSettings(settings) {
      try {
        const response = await axios.put('/api/admin/integrations/clickatell', settings)
        this.integrations.clickatell = response.data.settings
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update Clickatell settings')
      }
    },

    async updatePanaceaMobileSettings(settings) {
      try {
        const response = await axios.put('/api/admin/integrations/panacea-mobile', settings)
        this.integrations.panaceaMobile = response.data.settings
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update Panacea Mobile settings')
      }
    },

    addPrefixRoute(route) {
      this.integrations.panaceaMobile.prefixRouting.push(route)
    },

    removePrefixRoute(index) {
      this.integrations.panaceaMobile.prefixRouting.splice(index, 1)
    },

    updatePrefixRoute(index, route) {
      this.integrations.panaceaMobile.prefixRouting[index] = route
    }
  }
})
