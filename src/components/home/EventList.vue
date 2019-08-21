<template>
  <b-col cols="12" md="4" lg="3">
    <div class="py-3">
      <h4 class="text-muted text-center">Recent Event</h4>
    </div>
    <div v-if="loaded === true">
      <router-link
        v-for="(event, index) in events"
        :key="index"
        :to="`event-info/eventId=${event.eventId}`"
        style="text-decoration: none!important"
      >
        <div class="text-dark home-event-link">
          <div v-b-tooltip.hover :title="event.courseCode" class="bg-white rounded-10 p-3 mb-3">
            <h6 class="text-truncate">
              <span class="text-danger mr-2">
                <font-awesome-icon icon="calendar-alt" />
              </span>
              {{ event.courseCode }}
            </h6>
            <div class="d-flex align-self-stretch align-items-center">
              <div class="text-muted flex-fill">
                <span class="h4">{{event.actualNumberOfEnrolled}}</span>
                <span>&nbsp;candidates</span>
              </div>
              <div class="text-muted flex-shrink-1 align-self-center">
                <span class="d-flex flex-column">
                  <small>{{ event.actualStartDate }}</small>
                </span>
                <span class="badge">{{ event.eventStatus }}</span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div v-if="loading === true" class="d-flex justify-content-center">
      <b-spinner label="Spinning"></b-spinner>
    </div>
  </b-col>
</template>

<style scoped>
.home-event-link:hover {
  text-decoration: none;
}
.home-event-link:hover > div {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  transition: opacity 0.4s ease-in;
}
</style>


<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.geteventRecent();
  },
  computed: {
    events() {
      return this.$store.state.event.eventRecent.data;
    },
    loading() {
      return this.$store.state.event.eventRecent.state.loading;
    },
    loaded() {
      return this.$store.state.event.eventRecent.state.loaded;
    }
  },
  methods: {
    geteventRecent() {
      this.$store.dispatch("event/eventRecent");
    }
  }
};
</script>
