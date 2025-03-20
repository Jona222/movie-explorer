<template>
  <div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
    <Navbar />
    <slot />
  </div>
</template>


<script setup>
import Navbar from '@/components/Navbar.vue';
</script>
