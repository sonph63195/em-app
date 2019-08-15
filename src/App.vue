<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
    <div class="mt-3"></div>
  </div>
</template>

<script>
import "@/assets/style.css";

export default {
  name: "app"
};
</script>
