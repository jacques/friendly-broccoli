import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    tfaPending: false,
    tfaEnabled: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    isSuperAdmin: (state) => state.user?.role === 'superadmin',
    currentUser: (state) => state.user
  },

  actions: {
    async login(email, password) {
      try {
        // Mock API call - replace with actual API endpoint
        const response = await axios.post('/api/auth/login', { email, password })
        
        if (response.data.requiresTfa) {
          this.tfaPending = true
          return { requiresTfa: true }
        }

        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed')
      }
    },

    async verifyTfa(code) {
      try {
        const response = await axios.post('/api/auth/verify-tfa', { code })
        
        this.token = response.data.token
        this.user = response.data.user
        this.tfaPending = false
        localStorage.setItem('token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'TFA verification failed')
      }
    },

    async requestPasswordReset(email) {
      try {
        await axios.post('/api/auth/lost-password', { email })
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Password reset request failed')
      }
    },

    async resetPassword(token, password, passwordConfirmation) {
      try {
        await axios.post('/api/auth/reset-password', { 
          token, 
          password, 
          password_confirmation: passwordConfirmation 
        })
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Password reset failed')
      }
    },

    async changePassword(currentPassword, newPassword, newPasswordConfirmation) {
      try {
        await axios.post('/api/auth/change-password', { 
          current_password: currentPassword,
          new_password: newPassword, 
          new_password_confirmation: newPasswordConfirmation 
        })
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Password change failed')
      }
    },

    async enableTfa() {
      try {
        const response = await axios.post('/api/auth/tfa/enable')
        return { success: true, qrCode: response.data.qrCode, secret: response.data.secret }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to enable TFA')
      }
    },

    async confirmTfa(code) {
      try {
        await axios.post('/api/auth/tfa/confirm', { code })
        this.tfaEnabled = true
        if (this.user) {
          this.user.tfaEnabled = true
        }
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to confirm TFA')
      }
    },

    async disableTfa(code) {
      try {
        await axios.post('/api/auth/tfa/disable', { code })
        this.tfaEnabled = false
        if (this.user) {
          this.user.tfaEnabled = false
        }
        return { success: true }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to disable TFA')
      }
    },

    async fetchUser() {
      try {
        const response = await axios.get('/api/auth/user')
        this.user = response.data.user
        this.tfaEnabled = response.data.user.tfaEnabled || false
        return { success: true }
      } catch (error) {
        this.logout()
        throw new Error(error.response?.data?.message || 'Failed to fetch user')
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.tfaPending = false
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

    initializeAuth() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        // In a real app, fetch user data here
        // For demo purposes, set a mock user
        this.user = {
          id: 1,
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'superadmin',
          tfaEnabled: false
        }
        this.tfaEnabled = this.user.tfaEnabled
      }
    }
  }
})
