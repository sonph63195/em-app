<template>
  <div id="homePage">
    <Header />
    <main>
      <b-container fluid>
        <b-row class="my-3 align-items-stretch">
          <EventList />
          <b-col cols="12" md="8">
            <b-row class="align-items-stretch mb-3">
              <b-col cols="12" md="6" class="mb-3 mb-md-0">
                <b-card no-body class="border-0">
                  <div class="d-flex p-3">
                    <div class="flex-fill text-center display-3 text-primary px-3">
                      <span v-text="totalCandidate"></span>
                    </div>
                    <div class="d-flex flex-column flex-fill align-self-center">
                      <span class="text-muted">Candidates</span>
                      <div v-if="!loading.candidate">
                        <div class="d-block h4">
                          <span
                            v-if="sectionStatus['Active']"
                            class="flex-fill badge badge-primary mr-2"
                          >Active: {{ sectionStatus['Active'] }}</span>
                          <span
                            v-if="sectionStatus['Passed']"
                            class="flex-fill badge badge-success mr-2"
                          >Passed: {{ sectionStatus["Passed"] }}</span>
                          <span
                            v-if="sectionStatus['Done']"
                            class="flex-fill badge badge-warning mr-2"
                          >Done: {{ sectionStatus["Done"] }}</span>
                          <span
                            v-if="sectionStatus['Cancel']"
                            class="flex-fill badge badge-danger mr-3"
                          >Cancel: {{ sectionStatus["Cancel"] }}</span>
                          <span
                            v-if="sectionStatus['Drop-Out']"
                            class="flex-fill badge badge-dark"
                          >Drop-Out: {{ sectionStatus["Drop-Out"] }}</span>
                        </div>
                      </div>
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
                    <div class="flex-fill text-center display-3 text-danger px-3">
                      <span v-text="totalEvent" />
                    </div>
                    <div class="d-flex flex-column flex-fill align-self-center">
                      <span class="text-muted">Events</span>
                      <div v-if="!loading.event">
                        <div class="d-block event-details h4">
                          <span
                            v-if="eventStatus['Finish']"
                            class="flex-fill badge badge-warning mr-2"
                          >Finish: {{ eventStatus["Finish"] }}</span>
                          <span
                            v-if="eventStatus['On-going']"
                            class="flex-fill badge badge-success mr-2"
                          >On-going: {{ eventStatus["On-going"] }}</span>
                          <span
                            v-if="eventStatus['Planning']"
                            class="flex-fill badge badge-primary mr-2"
                          >Planning: {{ eventStatus["Planning"] }}</span>
                          <span
                            v-if="eventStatus['Cancel']"
                            class="flex-fill badge badge-danger"
                          >Cancel: {{ eventStatus["Cancel"] }}</span>
                        </div>
                      </div>
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
      </b-container>
    </main>
  </div>
</template>
<script>
import Header from "../header/Header";
import EventList from "./EventList";
import Calendar from "./Calendar";

export default {
  name: "Homepage",
  components: {
    Header,
    EventList,
    Calendar
  },
  computed: {
    eventStatus() {
      return this.$store.state.home.eventStatus.data;
    },
    sectionStatus() {
      return this.$store.state.home.sectionStatus.data;
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
    sectionStatus: {
      handler() {
        if (this.sectionStatus) {
          Object.values(this.sectionStatus).forEach(el => {
            this.totalCandidate += el;
          });
          this.loading.candidate = false;
        }
      }
    }
  },
  methods: {
    getEventStatus() {
      this.$store.dispatch("home/getEventStatus");
    },
    getSectionStatus() {
      this.$store.dispatch("home/getSectionStatus");
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
  },
  created() {
    this.getEventStatus();
    this.getSectionStatus();
  }
};
</script>
