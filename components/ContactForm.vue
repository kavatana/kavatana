<template>
  <div class="contact-form-card">
    <div v-if="status === 'success'" class="success-message" aria-live="polite">
      <p>{{ successMessage }}</p>
    </div>
    
    <form v-else @submit.prevent="submitForm" aria-live="polite">
      <div v-if="status === 'error'" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
      
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" required :disabled="isLoading" aria-describedby="name-error" />
        <span id="name-error" class="validation-error" v-if="errors.name">{{ errors.name }}</span>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required :disabled="isLoading" aria-describedby="email-error" />
        <span id="email-error" class="validation-error" v-if="errors.email">{{ errors.email }}</span>
      </div>
      
      <div class="form-group">
        <label for="type">Type of inquiry (optional)</label>
        <select id="type" v-model="form.type" :disabled="isLoading">
          <option value="">Select an option</option>
          <option value="startup">Startup opportunity</option>
          <option value="contract">Contract work</option>
          <option value="collab">Collaboration</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" v-model="form.message" rows="4" required :disabled="isLoading" aria-describedby="message-error"></textarea>
        <span id="message-error" class="validation-error" v-if="errors.message">{{ errors.message }}</span>
      </div>
      
      <button type="submit" class="submit-btn" :disabled="isLoading">
        {{ isLoading ? 'Sending...' : 'Send message' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { usePortfolioConfig } from '~/composables/usePortfolioConfig'

const config = usePortfolioConfig()

const form = reactive({
  name: '',
  email: '',
  type: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')
const successMessage = ref("Message sent. I'll be in touch within a few days.")
const isLoading = ref(false)

const submitForm = async () => {
  errors.name = ''
  errors.email = ''
  errors.message = ''
  errorMessage.value = ''

  if (!form.name) errors.name = 'Name is required'
  if (!form.email) errors.email = 'Email is required'
  if (!form.message) errors.message = 'Message is required'

  if (errors.name || errors.email || errors.message) return

  status.value = 'loading'
  isLoading.value = true

  try {
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || ''

    // No backend endpoint configured: fall back to the visitor's own email client.
    // This always works with no server and is honest — nothing is silently dropped.
    if (!endpoint) {
      const to = config?.email || 'kavatanaa@gmail.com'
      const subject = encodeURIComponent(`Portfolio contact${form.type ? ` (${form.type})` : ''} — ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
      if (import.meta.client) {
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
      }
      successMessage.value = 'Opening your email app with your message ready — just press send.'
      status.value = 'success'
      isLoading.value = false
      return
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (!response.ok) throw new Error('Failed to send message')

    successMessage.value = "Message sent. I'll be in touch within a few days."
    status.value = 'success'

    const { $trackEvent } = useNuxtApp()
    if ($trackEvent) {
      $trackEvent('contact_form_success')
    }
  } catch {
    status.value = 'error'
    errorMessage.value = 'Something went wrong. Please email me directly instead.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.contact-form-card {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-xl);
}

@media (min-width: 768px) {
  .contact-form-card {
    padding: var(--space-2xl);
  }
}

.success-message {
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  text-align: center;
  padding: var(--space-2xl) 0;
}

.error-message {
  color: var(--color-error);
  font-size: var(--text-sm);
  margin-bottom: var(--space-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-md);
}

label {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

input, select, textarea {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  transition: border-color var(--transition-fast);
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

input:disabled, select:disabled, textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.validation-error {
  color: var(--color-error);
  font-size: var(--text-xs);
}

.submit-btn {
  width: 100%;
  background-color: var(--color-accent);
  color: var(--color-bg);
  border: none;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  font-weight: bold;
  font-size: var(--text-base);
  cursor: pointer;
  margin-top: var(--space-sm);
  transition: background-color var(--transition-fast);
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
