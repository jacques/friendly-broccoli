import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { pinia, useAuthStore } from './stores'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faLock,
  faEnvelope,
  faSignOutAlt,
  faHome,
  faCog,
  faQuestionCircle,
  faKey,
  faShieldAlt,
  faBuilding,
  faFlag,
  faUserShield,
  faUsers,
  faPlug,
  faMap,
  faSms,
  faMobileAlt,
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faCheck,
  faSpinner,
  faEye,
  faEyeSlash,
  faBars,
  faChevronDown,
  faChevronRight,
  faArrowLeft,
  faSearch,
  faExclamationTriangle,
  faInfoCircle,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faUser,
  faLock,
  faEnvelope,
  faSignOutAlt,
  faHome,
  faCog,
  faQuestionCircle,
  faKey,
  faShieldAlt,
  faBuilding,
  faFlag,
  faUserShield,
  faUsers,
  faPlug,
  faMap,
  faSms,
  faMobileAlt,
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faCheck,
  faSpinner,
  faEye,
  faEyeSlash,
  faBars,
  faChevronDown,
  faChevronRight,
  faArrowLeft,
  faSearch,
  faExclamationTriangle,
  faInfoCircle,
  faCheckCircle,
  faTimesCircle
)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

// Initialize auth store
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
