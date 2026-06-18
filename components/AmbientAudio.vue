<template>
  <button 
    class="ambient-audio-toggle" 
    :class="{ 'is-playing': isPlaying }"
    @click="toggleAudio"
    :aria-label="isPlaying ? 'Pause ambient music' : 'Play ambient music'"
    title="Mystic Realm of Minecraft"
  >
    <div class="bars">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <audio ref="audioRef" loop preload="auto" autoplay>
      <source src="/audio/mystic-realm.mp3" type="audio/mpeg" />
    </audio>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isPlaying = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)

onMounted(() => {
  if (audioRef.value) {
    // Attempt autoplay immediately
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      // Browser blocked autoplay, wait for first user interaction
      const playOnInteract = () => {
        if (!isPlaying.value && audioRef.value) {
          audioRef.value.play().then(() => {
            isPlaying.value = true
          }).catch(() => {})
        }
        
        ['click', 'keydown', 'pointerdown', 'touchstart'].forEach(e => {
          document.removeEventListener(e, playOnInteract)
        })
      }
      
      ['click', 'keydown', 'pointerdown', 'touchstart'].forEach(e => {
        document.addEventListener(e, playOnInteract, { once: true })
      })
    })
  }
})

const toggleAudio = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(e => {
      console.error("Audio playback failed:", e)
    })
  }
}
</script>

<style scoped>
.ambient-audio-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0;
}

:global([data-theme="dark"]) .ambient-audio-toggle {
  background: rgba(20, 20, 25, 0.8);
  backdrop-filter: blur(8px);
  border-color: rgba(255, 255, 255, 0.1);
}

.ambient-audio-toggle:hover {
  transform: translateY(-2px) scale(1.05);
  border-color: var(--color-accent);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
}

.bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  height: 16px;
  width: 20px;
}

.bar {
  display: block;
  width: 3px;
  background-color: var(--color-text-secondary);
  border-radius: 2px;
  transition: height 0.2s ease, background-color 0.3s ease;
  height: 4px; /* Default height when paused */
}

/* Base heights for visual variety when paused */
.bar:nth-child(1) { height: 6px; }
.bar:nth-child(2) { height: 4px; }
.bar:nth-child(3) { height: 8px; }
.bar:nth-child(4) { height: 5px; }

.is-playing .bar {
  background-color: var(--color-accent);
  animation: sound-bars 1s infinite alternate ease-in-out;
}

.is-playing .bar:nth-child(1) { animation-delay: 0.0s; }
.is-playing .bar:nth-child(2) { animation-delay: 0.2s; }
.is-playing .bar:nth-child(3) { animation-delay: 0.4s; }
.is-playing .bar:nth-child(4) { animation-delay: 0.1s; }

@keyframes sound-bars {
  0% { height: 4px; }
  100% { height: 16px; }
}

@media (max-width: 768px) {
  .ambient-audio-toggle {
    bottom: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
}
</style>
