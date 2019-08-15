<template>
  <div id="homePage">
    <Header />
    <main>
      <b-container>
        <b-row class="my-3 align-items-stretch">
          <EventList />
          <b-col cols="12" md="8" lg="9">
            <b-row class="mb-3">
              <b-col cols="12" md="6" class="mb-3 mb-md-0">
                <b-card no-body class="border-0">
                  <div class="d-flex p-3">
                    <div class="flex-fill text-center">
                      <font-awesome-icon icon="user" class="display-3 text-primary" />
                    </div>
                    <div class="d-flex flex-column flex-fill align-self-center">
                      <span class="text-muted">Candidate</span>
                      <span v-if="!loading.candidate" class="h4" v-text="totalCandidate"></span>
                      <span v-if="loading.candidate" class="h4">
                        <b-spinner variant="primary" />
                      </span>
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" md="6">
                <b-card no-body class="border-0">
                  <div class="d-flex p-3">
                    <div class="flex-fill text-center">
                      <font-awesome-icon icon="calendar-alt" class="display-3 text-danger" />
                    </div>
                    <div class="d-flex flex-column flex-fill align-self-center">
                      <span class="text-muted">Event</span>
                      <span v-if="!loading.event" class="h4" v-text="totalEvent"></span>
                      <span v-if="loading.event" class="h4">
                        <b-spinner variant="danger" />
                      </span>
                    </div>
                  </div>
                </b-card>
              </b-col>
            </b-row>
            <div class="card border-0">
              <div class="card-header bg-white">
                <h4 class="card-title mb-0">Calendar</h4>
              </div>
              <div class="card-body">
                <Calendar />
              </div>
            </div>
          </b-col>
        </b-row>
        <Chart />
      </b-container>
    </main>
  </div>
</template>
<script>
import Header from "../header/Header";
import Chart from "./Chart";
import EventList from "./EventList";
import Calendar from "./Calendar";

export default {
  name: "Homepage",
  components: {
    Header,
    Chart,
    EventList,
    Calendar
  },
  computed: {
    eventStatus() {
      return this.$store.state.home.eventStatus.data;
    },
    subSubjectType() {
      return this.$store.state.home.subSubjectType.data;
    }
  },
  watch: {
    eventStatus: {
      handler() {
        if (this.eventStatus) {
          Object.values(this.eventStatus).forEach(
            el => (this.totalEvent += el)
          );
          this.loading.event = false;
        }
      }
    },
    subSubjectType: {
      handler() {
        if (this.subSubjectType) {
          Object.values(this.subSubjectType).forEach(
            el => (this.totalCandidate += el)
          );
          this.loading.candidate = false;
        }
      }
    }
  },
  data() {
    return {
      loading: {
        event: true,
        candidate: true
      },
      totalEvent: 0,
      totalCandidate: 0
    };
  }
};
</script>
