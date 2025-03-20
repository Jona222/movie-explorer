<template>
  <div class="app-container">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  title: "Movie Explorer",
  meta: [
    {name: "description", content: "Explore movies, add to favorites, and manage your watchlist!"},
    {name: "keywords", content: "movies, cinema, TMDB, watchlist, favorite movies"},
    {name: "author", content: "Ivana"},
    {name: "robots", content: "index, follow"},

    // Open Graph (Facebook, LinkedIn)
    {property: "og:title", content: "Movie Explorer - Discover Movies"},
    {property: "og:description", content: "Search movies, add them to favorites, and track your watchlist!"},
    {property: "og:image", content: "/images/meta-image.jpg"},
    {property: "og:url", content: "https://moviexplorer.com"},
    {property: "og:type", content: "website"},

    // Twitter Card
    {name: "twitter:card", content: "summary_large_image"},
    {name: "twitter:title", content: "Movie Explorer - Discover Movies"},
    {name: "twitter:description", content: "Your favorite place for movie exploration!"},
    {name: "twitter:image", content: "/images/meta-image.jpg"}
  ]
});
</script>

<style>
.app-container {
  overflow-x: hidden;
}
</style>
