import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/lost-password',
    name: 'LostPassword',
    component: () => import('../views/auth/LostPasswordView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/auth/ResetPasswordView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/tfa-verify',
    name: 'TfaVerify',
    component: () => import('../views/auth/TfaVerifyView.vue'),
    meta: { requiresTfaPending: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('../views/ChangePasswordView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tfa-settings',
    name: 'TfaSettings',
    component: () => import('../views/TfaSettingsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/settings/SettingsView.vue'),
    meta: { requiresAuth: true, requiresSuperAdmin: true },
    children: [
      {
        path: '',
        redirect: '/settings/companies'
      },
      {
        path: 'companies',
        name: 'SettingsCompanies',
        component: () => import('../views/settings/tabs/CompaniesTab.vue')
      },
      {
        path: 'feature-flags',
        name: 'SettingsFeatureFlags',
        component: () => import('../views/settings/tabs/FeatureFlagsTab.vue')
      },
      {
        path: 'permissions',
        name: 'SettingsPermissions',
        component: () => import('../views/settings/tabs/PermissionsTab.vue')
      },
      {
        path: 'roles',
        name: 'SettingsRoles',
        component: () => import('../views/settings/tabs/RolesTab.vue')
      },
      {
        path: 'integrations',
        name: 'SettingsIntegrations',
        component: () => import('../views/settings/tabs/IntegrationsTab.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else if (to.meta.requiresTfaPending && !authStore.tfaPending) {
    next({ name: 'Login' })
  } else if (to.meta.requiresSuperAdmin && !authStore.isSuperAdmin) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
