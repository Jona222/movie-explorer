<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-80 text-center">
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {{ t('loginPrompt.title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        {{ t('loginPrompt.description') }}
      </p>
      <div class="flex justify-center gap-4">
        <button
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            @click="onLogin"
        >
          {{ t('loginPrompt.login') }}
        </button>
        <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            @click="$emit('close')"
        >
          {{ t('loginPrompt.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuth} from '~/composables/useAuth'
import {useI18n} from 'vue-i18n'
const emit = defineEmits(['close'])

const {t} = useI18n()

const {login} = useAuth()

const onLogin = async () => {
  await login()

  setTimeout(() => {
    emit('close')
  }, 100)
}
</script>
