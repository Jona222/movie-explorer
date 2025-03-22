<template>
  <div>
    <Suspense>
      <template #default>
        <div class="container mx-auto px-4">
          <ClientOnly>
            <div class="flex flex-col md:flex-row gap-4 mb-6 mt-6">
              <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="$t('search.search')"
                  class="px-4 py-2 border rounded-lg flex-1 text-black"
              />
              <select v-model="selectedGenre" class="px-4 py-2 border rounded-lg text-black">
                <option value=""> {{ $t('genres') }}</option>
                <option v-for="genre in genres" :key="genre.id" :value="genre.name.toLowerCase()">
                  {{ genre.name }}
                </option>
              </select>
              <select v-model="selectedYear" class="px-4 py-2 border rounded-lg text-black">
                <option value="">{{ $t('years') }}</option>
                <option v-for="year in availableYears" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>

              <button
                  @click="searchMovies"
                  class="text-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                <Icon name="search"/>
              </button>
              <button
                  @click="clearSearch"
                  class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                <Icon name="close"/>
              </button>
            </div>
          </ClientOnly>
          <p v-if="loadingGenres" class="text-gray-500 text-center">{{ $t('loadingGenres') }}</p>
          <p v-if="genresError" class="text-red-500 text-center">{{ $t('errorLoadingGenres') }}</p>

          <SearchResults
              v-if="searchTriggered"
              :searchQuery="searchQuery"
              :selectedGenre="selectedGenre"
              :selectedYear="selectedYear.toString()"
          />

          <MovieList v-else/>
        </div>
      </template>
      <template #fallback>
        <p>{{ $t('loading') }}</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watchEffect} from 'vue';
import {defineAsyncComponent} from 'vue';

const MovieList = defineAsyncComponent(() => import("~/components/MovieList.vue"));
const SearchResults = defineAsyncComponent(() => import("~/components/SearchResults.vue"));


const searchQuery = ref('');
const selectedYear = ref('');
const selectedGenre = ref('');
const genres = ref([]);
const searchTriggered = ref(false);

watch(searchQuery, (newValue) => {
  if (newValue.trim().length > 0) {
    searchTriggered.value = true;
  } else {
    searchTriggered.value = false;
  }
});

const searchMovies = () => {
  searchTriggered.value = true;
};
const clearSearch = () => {
  searchQuery.value = '';
  selectedGenre.value = '';
  selectedYear.value = '';
  searchTriggered.value = false;
};
const {data: genresData, pending: loadingGenres, error: genresError} = useAsyncData('genres', async () => {
  const {data} = await useFetch('/api/movies/genres');
  return data.value?.genres || [];
});

watchEffect(() => {
  if (genresData.value) {
    genres.value = genresData.value;
  }
});

const availableYears = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({length: currentYear - 1899}, (_, i) => currentYear - i);
});
</script>
