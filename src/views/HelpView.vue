<script setup>
import { ref } from 'vue'

const faqs = [
  {
    question: 'How do I change my password?',
    answer: 'Go to the "Change Password" page from the sidebar menu. Enter your current password and then your new password twice to confirm the change.'
  },
  {
    question: 'What is Two-Factor Authentication (TFA)?',
    answer: 'Two-Factor Authentication adds an extra layer of security to your account. When enabled, you\'ll need to enter a code from your authenticator app in addition to your password when logging in.'
  },
  {
    question: 'How do I enable Two-Factor Authentication?',
    answer: 'Navigate to "TFA Settings" from the sidebar. Click "Enable Two-Factor Authentication", scan the QR code with your authenticator app, and enter the verification code to complete setup.'
  },
  {
    question: 'What if I lose access to my authenticator app?',
    answer: 'Contact your system administrator to reset your two-factor authentication. They can disable TFA on your account so you can set it up again with a new device.'
  },
  {
    question: 'How do I contact support?',
    answer: 'For technical support, please email support@example.com or use the contact form below. Our support team typically responds within 24 business hours.'
  },
  {
    question: 'What are the password requirements?',
    answer: 'Passwords must be at least 8 characters long. We recommend using a mix of uppercase and lowercase letters, numbers, and special characters for better security.'
  }
]

const expandedFaq = ref(null)

const toggleFaq = (index) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const contactForm = ref({
  subject: '',
  message: ''
})

const submitContact = () => {
  alert('Contact form submitted! (This is a demo)')
  contactForm.value = { subject: '', message: '' }
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Help Center</h1>
      <p class="text-gray-600 mt-1">Find answers to common questions and get support</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- FAQs -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div class="divide-y divide-gray-200">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="px-6 py-4"
            >
              <button
                @click="toggleFaq(index)"
                class="w-full flex items-center justify-between text-left"
              >
                <span class="font-medium text-gray-900">{{ faq.question }}</span>
                <font-awesome-icon
                  :icon="expandedFaq === index ? 'chevron-down' : 'chevron-right'"
                  class="text-gray-400 transition-transform"
                />
              </button>
              <div
                v-if="expandedFaq === index"
                class="mt-3 text-gray-600 text-sm"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form & Quick Links -->
      <div class="space-y-6">
        <!-- Quick Links -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div class="space-y-3">
            <router-link
              to="/change-password"
              class="flex items-center text-blue-600 hover:text-blue-700"
            >
              <font-awesome-icon icon="key" class="mr-2" />
              Change Password
            </router-link>
            <router-link
              to="/tfa-settings"
              class="flex items-center text-blue-600 hover:text-blue-700"
            >
              <font-awesome-icon icon="shield-alt" class="mr-2" />
              TFA Settings
            </router-link>
            <router-link
              to="/dashboard"
              class="flex items-center text-blue-600 hover:text-blue-700"
            >
              <font-awesome-icon icon="home" class="mr-2" />
              Dashboard
            </router-link>
          </div>
        </div>

        <!-- Contact Support -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>
          <form @submit.prevent="submitContact" class="space-y-4">
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                id="subject"
                v-model="contactForm.subject"
                type="text"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                v-model="contactForm.message"
                rows="4"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your issue..."
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="bg-blue-50 rounded-lg p-6">
          <h3 class="font-semibold text-blue-900 mb-2">Need immediate help?</h3>
          <p class="text-sm text-blue-700 mb-3">
            Our support team is available Monday-Friday, 9am-5pm.
          </p>
          <p class="text-sm text-blue-700">
            <font-awesome-icon icon="envelope" class="mr-2" />
            support@example.com
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
