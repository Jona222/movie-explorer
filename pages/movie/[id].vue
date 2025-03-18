<template>
  <div v-if="movie" class="relative bg-gray-900 text-white min-h-screen">
    <!-- Pozadinska slika -->
    <div
        class="absolute inset-0 bg-cover bg-center opacity-30"
        :style="{ backgroundImage }"
    ></div>

    <div class="container mx-auto px-4 relative z-10 py-10">
      <div class="flex flex-col md:flex-row gap-10">
        <!-- Poster -->
        <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            :alt="movie.title"
            class="w-full md:w-1/3 rounded-lg shadow-lg"
        />

        <!-- Detalji -->
        <div class="flex-1">
          <h1 class="text-4xl font-bold">{{ movie.title }}</h1>
          <p class="text-gray-400 text-lg mt-2">{{ movie.overview }}</p>

          <div class="flex gap-4 mt-4">
            <span class="bg-yellow-500 text-black px-3 py-1 rounded-lg">⭐ {{ movie.vote_average.toFixed(1) }}</span>
            <span v-for="genre in movie.genres" :key="genre.id" class="bg-gray-800 px-3 py-1 rounded-lg">
              {{ genre.name }}
            </span>
          </div>

          <!-- Glumačka ekipa -->
          <div class="mt-6">
            <h2 class="text-xl font-bold">Director: {{ director }}</h2>
            <h2 class="text-xl font-bold mt-2">Cast:</h2>
            <ul class="flex gap-4 mt-2">
              <li v-for="actor in cast" :key="actor.id" class="text-sm">
                <img
                    v-if="actor.profile_path"
                    :src="`https://image.tmdb.org/t/p/w185/${actor.profile_path}`"
                    :alt="actor.name"
                    class="w-16 h-16 rounded-full"
                />
                <p>{{ actor.name }}</p>
              </li>
            </ul>
          </div>

          <!-- Trailer -->
          <div v-if="trailerKey" class="mt-6">
            <h2 class="text-xl font-bold">Trailer:</h2>
            <iframe
                class="w-full md:w-2/3 h-64 rounded-lg shadow-lg mt-2"
                :src="`https://www.youtube.com/embed/${trailerKey}`"
                frameborder="0"
                allowfullscreen
            ></iframe>
          </div>

          <!-- Dugmad za favorite, watchlist i share -->
          <div class="mt-6 flex gap-4">
            <button class="bg-red-500 px-4 py-2 rounded-lg">❤️ Add to Favorites</button>
            <button class="bg-blue-500 px-4 py-2 rounded-lg">📌 Add to Watchlist</button>
            <button @click="shareMovie" class="bg-green-500 px-4 py-2 rounded-lg">🔗 Share</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '#app';

const route = useRoute();
const movie = ref(null);
const cast = ref([]);
const director = ref('');
const trailerKey = ref('');

const fetchMovieDetails = async () => {
  const { data } = await useFetch(`/api/movies/details?movieId=${route.params.id}`);
  if (data.value) {
    movie.value = data.value;

    // Dohvatanje glumaca i režisera
    cast.value = data.value.credits?.cast.slice(0, 5) || [];
    const crew = data.value.credits?.crew || [];
    director.value = crew.find((person) => person.job === 'Director')?.name || 'Unknown';

    // Dohvatanje trailera (YouTube)
    const trailer = data.value.videos?.results.find((v) => v.type === 'Trailer');
    trailerKey.value = trailer ? trailer.key : '';
  }
};

onMounted(fetchMovieDetails);

// Computed property za pozadinsku sliku
const backgroundImage = computed(() => {
  return movie.value ? `url(https://image.tmdb.org/t/p/w1280/${movie.value.backdrop_path})` : '';
});

// Funkcija za deljenje filma
const shareMovie = () => {
  if (navigator.share) {
    navigator.share({
      title: movie.value.title,
      text: `Check out this movie: ${movie.value.title}`,
      url: window.location.href,
    });
  } else {
    alert('Sharing is not supported in this browser.');
  }
};
</script>

