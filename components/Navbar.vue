<template>
  <nav class="bg-gray-500 text-white p-4 dark:bg-gray-900">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink
          to="/"
          class="flex items-center gap-2 text-base md:text-xl lg:text-2xl font-bold text-black hover:text-gray-400 transition duration-300 dark:text-white dark:hover:text-gray-400"
      >
        <Icon name="film"/>
        {{ $t('title') }}
      </NuxtLink>
      <div class="flex justify-end items-center gap-2">
        <ClientOnly>
          <div
              v-if="user"
              class="relative flex items-center gap-2 "
              v-click-outside="() => showDropdown = false"
          >
            <button @click="showDropdown = !showDropdown"
                    class="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-700 transition">
              <img :src="user?.photoURL" alt="avatar" class="w-8 h-8 rounded-full"/>
              <span class="hidden md:flex text-black dark:text-white">{{ user?.displayName }}</span>
            </button>
            <transition
                name="dropdown"
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2"
            >
              <div
                  v-if="showDropdown"
                  class="absolute z-50 right-0 top-10 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-black dark:text-white"
              >
                <NuxtLink
                    to="/"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    @click="showDropdown = false"
                > {{ $t('home') }}
                </NuxtLink>
                <NuxtLink
                    to="/favorites"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    @click="showDropdown = false"
                >{{ $t('favorites') }}
                </NuxtLink>
                <NuxtLink
                    to="/watchlist"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    @click="showDropdown = false"
                >{{ $t('watchlist') }}
                </NuxtLink>
                <button @click="logout"
                        class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  {{ $t('logout') }}
                </button>
              </div>
            </transition>
          </div>
          <div v-else class="flex items-center gap-1 ">
            <button @click="login" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition">
              {{ $t('login') }}
            </button>

          </div>
        </ClientOnly>
        <button @click="toggleTheme"
                class="px-3 py-1 rounded-lg hover:bg-gray-700 transition text-center text-white dark:text-white">
          <Icon :name="theme === 'dark' ? 'sun' : 'moon'"/>
        </button>
        <button
            v-click-outside="() => showLang = false"
            @click="showLang = !showLang"
            class="px-3 py-1 rounded-lg hover:bg-gray-700 transition"
        >
          <Icon name="globe"/>
        </button>
        <transition
            name="dropdown"
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2"
        >
          <div
              v-if="showLang"
              class="absolute z-50 top-14 w-35 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-black dark:text-white"
          >
            <button
                @click="setLocale('en')"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left rounded-lg"
            >
              {{ $t('eng') }}
            </button>
            <button
                @click="setLocale('me')"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {{ $t('me') }}
            </button>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from 'vue-i18n'
import {useTheme} from "~/composables/useTheme";
import {useAuth} from '~/composables/useAuth'

const {setLocale} = useI18n()
const {user, login, logout} = useAuth()
const {theme, toggleTheme} = useTheme();

const showDropdown = ref(false)
const showLang = ref(false)
const {t} = useI18n()

</script>
