<template>
  <nav class="bg-gray-500 text-white p-4 dark:bg-gray-900">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/"
                class="flex items-center gap-2 text-2xl font-bold text-black hover:text-gray-400 transition duration-300 dark:text-white dark:hover:text-gray-400">
        <Icon name="film"/>
        Movie Explorer
      </NuxtLink>
      <div class="md:hidden flex gap-2">
        <button @click="toggleTheme" class="text-center text-white dark:text-white">
          <Icon :name="theme === 'dark' ? 'sun' : 'moon'"/>
        </button>

        <button @click="isMenuOpen = !isMenuOpen" class="text-white focus:outline-none">
          <Icon :name="isMenuOpen ? 'close' : 'menu'" class="w-6 h-6"/>
        </button>
      </div>

      <div class="hidden md:flex gap-4">
        <NuxtLink
            to="/favorites"
            class="flex items-center gap-2 text-lg bg-red-400 dark:bg-red-500 px-3 text-white py-1 rounded-lg hover:bg-red-600 transition duration-300"
        >
          <Icon name="favorites"/>
          Favorites
        </NuxtLink>
        <NuxtLink
            to="/watchlist"
            class="flex items-center gap-2 text-lg bg-blue-400 dark:bg-blue-500 px-3 text-white py-1 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <Icon name="watchlist"/>
          Watchlist
        </NuxtLink>
        <button @click="toggleTheme" class="text-white dark:text-white">
          <Icon :name="theme === 'dark' ? 'sun' : 'moon'"/>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="flex flex-col gap-2 md:hidden mt-4 bg-gray-600 dark:bg-gray-800 p-4 rounded-lg">
      <NuxtLink
          to="/favorites"
          class="flex items-center gap-2 text-lg bg-red-400 dark:bg-red-500 px-3 text-white py-1 rounded-lg hover:bg-red-600 transition duration-300"
          @click="isMenuOpen = false"
      >
        <Icon name="favorites"/>
        Favorites
      </NuxtLink>
      <NuxtLink
          to="/watchlist"
          class="flex items-center gap-2 text-lg bg-blue-400 dark:bg-blue-500 px-3 text-white py-1 rounded-lg hover:bg-blue-600 transition duration-300"
          @click="isMenuOpen = false"
      >
        <Icon name="watchlist"/>
        Watchlist
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useTheme} from "~/composables/useTheme";

const {theme, toggleTheme} = useTheme();
const isMenuOpen = ref(false);
</script>
