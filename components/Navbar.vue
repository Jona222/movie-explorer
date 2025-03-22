<template>
  <nav class="bg-gray-500 text-white p-4 dark:bg-gray-900">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/"
                class="flex items-center gap-2 text-2xl font-bold text-black hover:text-gray-400 transition duration-300 dark:text-white dark:hover:text-gray-400">
        <Icon name="film"/>
        Movie Explorer
      </NuxtLink>
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
                class="absolute z-50 right-0 top-10 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 text-black dark:text-white"
            >
              <NuxtLink to="/" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Home
              </NuxtLink>
              <NuxtLink to="/favorites" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Favorites
              </NuxtLink>
              <NuxtLink to="/watchlist" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Watchlist
              </NuxtLink>
              <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Logout
              </button>
            </div>
          </transition>

          <button @click="toggleTheme" class="text-center text-white dark:text-white">
            <Icon :name="theme === 'dark' ? 'sun' : 'moon'"/>
          </button>
        </div>
        <div v-else>
          <button @click="login" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition">
            Login with Google
          </button>
        </div>
      </ClientOnly>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useTheme} from "~/composables/useTheme";
import {useAuth} from '~/composables/useAuth'

const {user, login, logout} = useAuth()
const showDropdown = ref(false)
const {theme, toggleTheme} = useTheme();
const isMenuOpen = ref(false);
</script>
