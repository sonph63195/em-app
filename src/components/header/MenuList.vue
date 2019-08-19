<template>
  <div class="d-block d-md-flex">
    <b-nav-item :active="url.includes('event')" to="/event">Event Management</b-nav-item>
    <b-nav-item :active="url.includes('candidate')" to="/candidate">Candidate Management</b-nav-item>
    <b-nav-item :active="url.includes('statistic')" to="/statistic">Statistic</b-nav-item>
  </div>
</template>

<script>
export default {
  computed: {
    url() {
      return this.$route.path;
    }
  }
};
</script>
