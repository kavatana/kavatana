<template>
  <div class="concierge-root">
    <button
      v-if="!isOpen"
      ref="launcher"
      class="concierge-launcher"
      type="button"
      aria-haspopup="dialog"
      aria-controls="portfolio-concierge"
      title="Ask the portfolio concierge"
      @click="openPanel"
    >
      <Bot :size="24" aria-hidden="true" />
      <span class="sr-only">Ask the portfolio concierge</span>
    </button>

    <Teleport to="body">
      <Transition name="concierge">
        <div
          v-if="isOpen"
          class="concierge-backdrop"
          @click.self="closePanel"
        >
          <section
            id="portfolio-concierge"
            ref="panel"
            class="concierge-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="concierge-title"
            aria-describedby="concierge-boundary"
          >
            <header class="concierge-header">
              <div class="concierge-identity">
                <span class="concierge-mark" aria-hidden="true">
                  <Bot :size="20" />
                </span>
                <div>
                  <h2 id="concierge-title">Portfolio concierge</h2>
                  <p id="concierge-boundary">{{ content.boundary }}</p>
                </div>
              </div>

              <div class="concierge-tools">
                <button
                  class="icon-button"
                  type="button"
                  title="Clear conversation"
                  :disabled="messages.length === 0"
                  @click="clearConversation"
                >
                  <RotateCcw :size="18" aria-hidden="true" />
                  <span class="sr-only">Clear conversation</span>
                </button>
                <button
                  class="icon-button"
                  type="button"
                  title="Close concierge"
                  @click="closePanel"
                >
                  <X :size="20" aria-hidden="true" />
                  <span class="sr-only">Close concierge</span>
                </button>
              </div>
            </header>

            <div ref="messageList" class="concierge-messages" aria-live="polite">
              <div v-if="messages.length === 0" class="concierge-welcome">
                <span class="welcome-icon" aria-hidden="true">
                  <Sparkles :size="18" />
                </span>
                <p>{{ greeting }}</p>
              </div>

              <article
                v-for="message in messages"
                :key="message.id"
                class="message"
                :class="`message-${message.role}`"
              >
                <p>{{ message.text }}</p>

                <div v-if="message.links?.length" class="message-links">
                  <template v-for="link in message.links" :key="link.href">
                    <NuxtLink
                      v-if="isInternal(link.href)"
                      :to="link.href"
                      class="evidence-link"
                      @click="closePanel"
                    >
                      {{ link.label }}
                      <ArrowUpRight :size="14" aria-hidden="true" />
                    </NuxtLink>
                    <a
                      v-else
                      :href="link.href"
                      class="evidence-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ link.label }}
                      <ArrowUpRight :size="14" aria-hidden="true" />
                    </a>
                  </template>
                </div>

                <div
                  v-if="message.role === 'concierge' && message.followUps?.length"
                  class="message-follow-ups"
                >
                  <button
                    v-for="followUp in message.followUps"
                    :key="followUp"
                    type="button"
                    @click="submitQuery(followUp)"
                  >
                    {{ followUp }}
                  </button>
                </div>
              </article>

              <div v-if="messages.length === 0" class="starter-grid">
                <button
                  v-for="starter in starters"
                  :key="starter.query"
                  type="button"
                  @click="submitQuery(starter.query)"
                >
                  {{ starter.label }}
                </button>
              </div>
            </div>

            <form class="concierge-composer" @submit.prevent="submitInput">
              <label class="sr-only" for="concierge-input">
                Ask about Ka Vatana's work
              </label>
              <textarea
                id="concierge-input"
                ref="inputElement"
                v-model="input"
                rows="1"
                maxlength="500"
                placeholder="Ask about Ka's work..."
                @keydown.enter.exact.prevent="submitInput"
              ></textarea>
              <button
                class="send-button"
                type="submit"
                title="Send question"
                :disabled="!input.trim()"
              >
                <Send :size="19" aria-hidden="true" />
                <span class="sr-only">Send question</span>
              </button>
            </form>
          </section>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowUpRight,
  Bot,
  RotateCcw,
  Send,
  Sparkles,
  X
} from '@lucide/vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useConcierge } from '~/composables/useConcierge'
import type { ConciergeMessage } from '~/types/concierge'


const STORAGE_KEY = 'kavatana:portfolio-concierge:v1'
const MAX_MESSAGES = 20

const route = useRoute()
const {
  content,
  ask,
  contextualGreeting,
  contextualStarters
} = useConcierge()

const isOpen = ref(false)
const input = ref('')
const messages = ref<ConciergeMessage[]>([])
const previousTopicId = ref<string | null>(null)
const launcher = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const inputElement = ref<HTMLTextAreaElement | null>(null)
const messageList = ref<HTMLElement | null>(null)
const focusBeforeOpen = ref<HTMLElement | null>(null)
let messageSequence = 0

const currentPath = computed(() => route.path)
const greeting = computed(() => contextualGreeting(currentPath.value))
const starters = computed(() => contextualStarters(currentPath.value))

const nextMessageId = (role: ConciergeMessage['role']) => {
  messageSequence += 1
  return `${role}-${Date.now()}-${messageSequence}`
}

const isInternal = (href: string) => href.startsWith('/')
const isSafeHref = (href: string) =>
  href.startsWith('/') || href.startsWith('https://')

const scrollToLatest = async () => {
  await nextTick()
  if (messageList.value) {
    messageList.value.scrollTop = messageList.value.scrollHeight
  }
}

const persistSession = () => {
  if (!import.meta.client) return

  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        messages: messages.value.slice(-MAX_MESSAGES),
        previousTopicId: previousTopicId.value
      })
    )
  } catch {
    // The concierge remains fully usable when browser storage is unavailable.
  }
}

const restoreSession = () => {
  if (!import.meta.client) return

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return
    const parsed = JSON.parse(stored) as {
      messages?: ConciergeMessage[]
      previousTopicId?: string | null
    }

    if (Array.isArray(parsed.messages)) {
      messages.value = parsed.messages
        .filter(
          (message) =>
            message &&
            (message.role === 'user' || message.role === 'concierge') &&
            typeof message.text === 'string'
        )
        .map((message) => ({
          ...message,
          text: message.text.slice(0, 2000),
          links: Array.isArray(message.links)
            ? message.links.filter(
                (link) =>
                  typeof link?.label === 'string' &&
                  typeof link?.href === 'string' &&
                  isSafeHref(link.href)
              )
            : [],
          followUps: Array.isArray(message.followUps)
            ? message.followUps.filter(
                (followUp) => typeof followUp === 'string'
              )
            : []
        }))
        .slice(-MAX_MESSAGES)
    }

    previousTopicId.value =
      typeof parsed.previousTopicId === 'string'
        ? parsed.previousTopicId
        : null
  } catch {
    sessionStorage.removeItem(STORAGE_KEY)
  }
}

const openPanel = async () => {
  focusBeforeOpen.value = document.activeElement as HTMLElement | null
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  await nextTick()
  inputElement.value?.focus()
  scrollToLatest()
}

const closePanel = async () => {
  isOpen.value = false
  document.body.style.overflow = ''
  await nextTick()
  const focusTarget = focusBeforeOpen.value?.isConnected
    ? focusBeforeOpen.value
    : launcher.value
  focusTarget?.focus()
}

const clearConversation = () => {
  messages.value = []
  previousTopicId.value = null
  input.value = ''
  if (import.meta.client) {
    sessionStorage.removeItem(STORAGE_KEY)
  }
  nextTick(() => inputElement.value?.focus())
}

const submitQuery = (query: string) => {
  const safeQuery = query.trim().slice(0, 500)
  if (!safeQuery) return

  messages.value.push({
    id: nextMessageId('user'),
    role: 'user',
    text: safeQuery
  })

  const response = ask(safeQuery, {
    previousTopicId: previousTopicId.value,
    currentPath: currentPath.value
  })

  messages.value.push({
    id: nextMessageId('concierge'),
    role: 'concierge',
    text: response.answer,
    links: response.links,
    followUps: response.followUps
  })

  previousTopicId.value = response.topicId
  input.value = ''
  messages.value = messages.value.slice(-MAX_MESSAGES)
  persistSession()
  scrollToLatest()
  nextTick(() => inputElement.value?.focus())
}

const submitInput = () => submitQuery(input.value)

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closePanel()
    return
  }

  if (event.key !== 'Tab' || !panel.value) return

  const focusable = Array.from(
    panel.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled])'
    )
  )
  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(messages, persistSession, { deep: true })

onMounted(() => {
  restoreSession()
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.concierge-root {
  position: relative;
  z-index: 90;
}

.concierge-launcher {
  position: fixed;
  right: max(1.25rem, env(safe-area-inset-right));
  bottom: max(1.25rem, env(safe-area-inset-bottom));
  z-index: 90;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
  color: var(--color-assistant-on-solid);
  cursor: pointer;
  background: var(--color-assistant-solid);
  border: 1px solid var(--color-assistant-solid-border);
  border-radius: 50%;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.34);
  transition:
    background-color var(--transition-fast),
    transform var(--transition-fast);
}

.concierge-launcher:hover {
  background: var(--color-assistant-solid-hover);
  transform: translateY(-2px);
}

.concierge-backdrop {
  position: fixed;
  inset: 0;
  z-index: 110;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.38);
}

.concierge-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  width: min(27rem, calc(100vw - 3rem));
  height: min(42rem, calc(100dvh - 6rem));
  overflow: hidden;
  color: var(--color-text-primary);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.48);
}

.concierge-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4.5rem;
  padding: 0.75rem 0.875rem;
  border-bottom: 1px solid var(--color-border);
}

.concierge-identity {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  min-width: 0;
}

.concierge-mark,
.welcome-icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  color: var(--color-assistant-soft-text);
  background: var(--color-assistant-soft);
  border: 1px solid var(--color-assistant-soft-border);
  border-radius: 6px;
}

.concierge-header h2 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0;
}

.concierge-header p {
  margin: 0.125rem 0 0;
  overflow: hidden;
  font-size: 0.72rem;
  color: var(--color-text-secondary);
  text-overflow: ellipsis;
  letter-spacing: 0;
  white-space: nowrap;
}

.concierge-tools {
  display: flex;
  flex: 0 0 auto;
  gap: 0.25rem;
}

.icon-button,
.send-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--target-min-size);
  height: var(--target-min-size);
  padding: 0;
  color: var(--color-text-secondary);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 6px;
}

.icon-button:hover:not(:disabled) {
  color: var(--color-text-primary);
  background: var(--color-surface-2);
}

.icon-button:disabled {
  cursor: default;
  opacity: 0.35;
}

.concierge-messages {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  min-height: 0;
  padding: 1rem;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.concierge-welcome {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.25rem 0 0.5rem;
}

.concierge-welcome p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--color-text-secondary);
}

.message {
  width: fit-content;
  max-width: 92%;
  padding: 0.75rem 0.875rem;
  border-radius: 8px;
}

.message p {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.55;
  letter-spacing: 0;
  white-space: pre-line;
}

.message-user {
  align-self: flex-end;
  color: var(--color-assistant-on-solid);
  background: var(--color-assistant-solid);
  border: 1px solid var(--color-assistant-solid-border);
}

.message-concierge {
  align-self: flex-start;
  color: var(--color-text-primary);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
}

.message-links,
.message-follow-ups {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.evidence-link {
  display: inline-flex;
  align-items: center;
  min-height: var(--target-min-size);
  gap: 0.25rem;
  padding: 0.45rem 0;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-assistant-link);
  text-decoration: none;
  letter-spacing: 0;
}

.evidence-link:hover {
  color: var(--color-assistant-link-hover);
}

.message-follow-ups button,
.starter-grid button {
  min-height: var(--target-min-size);
  padding: 0.625rem 0.75rem;
  font: inherit;
  font-size: 0.78rem;
  line-height: 1.35;
  color: var(--color-text-secondary);
  text-align: left;
  letter-spacing: 0;
  cursor: pointer;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.message-follow-ups button:hover,
.starter-grid button:hover {
  color: var(--color-text-primary);
  border-color: var(--color-assistant-solid-border);
}

.starter-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.625rem;
}

.concierge-composer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.5rem;
  align-items: end;
  padding: 0.75rem;
  background: var(--color-surface-1);
  border-top: 1px solid var(--color-border);
}

.concierge-composer textarea {
  width: 100%;
  min-height: 3rem;
  max-height: 7rem;
  padding: 0.75rem;
  overflow-y: auto;
  font: inherit;
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--color-text-primary);
  resize: none;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.concierge-composer textarea::placeholder {
  color: var(--color-text-muted);
}

.send-button {
  color: var(--color-assistant-on-solid);
  background: var(--color-assistant-solid);
  border: 1px solid var(--color-assistant-solid-border);
}

.send-button:hover:not(:disabled) {
  background: var(--color-assistant-solid-hover);
}

.send-button:disabled {
  cursor: default;
  opacity: 0.4;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.concierge-enter-active,
.concierge-leave-active {
  transition: opacity var(--transition-base);
}

.concierge-enter-active .concierge-panel,
.concierge-leave-active .concierge-panel {
  transition:
    opacity var(--transition-base),
    transform var(--transition-base);
}

.concierge-enter-from,
.concierge-leave-to {
  opacity: 0;
}

.concierge-enter-from .concierge-panel,
.concierge-leave-to .concierge-panel {
  opacity: 0;
  transform: translateY(0.75rem);
}

@media (max-width: 640px) {
  .concierge-launcher {
    right: max(1rem, env(safe-area-inset-right));
    bottom: max(1rem, env(safe-area-inset-bottom));
  }

  .concierge-backdrop {
    padding: 0;
  }

  .concierge-panel {
    width: 100%;
    height: min(84dvh, 46rem);
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
    border-radius: 8px 8px 0 0;
  }

  .starter-grid {
    grid-template-columns: 1fr;
  }
}
</style>
