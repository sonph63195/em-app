<template>
  <b-row class="align-items-stretch">
    <b-col cols="12" md="12" class="mt-3">
      <b-card class="h-100" no-body>
        <b-card-header class="bg-white font-weight-bold"
          header-text-variant="info">Event Status</b-card-header>
        <div
          v-if="eventStatus.state.loading === true"
          class="d-flex w-100 h-100 justify-content-center p-5"
        >
          <b-spinner
            style="width: 3rem; height: 3rem;"
            class="align-self-center"
            label="Loading..."
          ></b-spinner>
        </div>
        <b-tabs>
          <b-tab :title="titleDoughnut" active>
            <template slot="title">
              <font-awesome-icon icon="chart-pie" class="mr-3" />
            </template>
            <div v-if="eventStatus.state.loaded === true" class="p-3">
              <Doughnut id="eventStatusDoughnut" :data="eventStatusBar" />
            </div>
          </b-tab>
          <b-tab :title="titleBar">
            <template slot="title">
              <font-awesome-icon icon="chart-bar" class="mr-3" />
            </template>
            <div v-if="eventStatus.state.loaded === true" class="p-3">
              <Bar id="eventStatusBar" :data="eventStatusBar" />
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import Bar from "../utils/Bar";
import Doughnut from "../utils/Doughnut";

export default {
  components: {
    Bar,
    Doughnut
  },
  data() {
    return {
      eventStatusBar: {
        labels: [],
        datasets: [
          {
            label: "Result",
            data: [],
            backgroundColor: [
              "rgba(23, 162, 184,1)",
              "rgba(255, 193, 7,1)", // Blue
              "rgba(220, 53, 69,1)",
              "rgba(52, 58, 64,1)",
              "rgba(40, 167, 69,1)"
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.getEventStatus();
  },
  watch: {
    eventStatus: {
      immediate: true,
      handler() {
        let loaded =
          this.eventStatus.state.loaded === true && this.eventStatus.data;
        if (loaded) {
          this.eventStatusBar.labels = Object.keys(this.eventStatus.data);
          this.eventStatusBar.datasets[0].data = Object.values(
            this.eventStatus.data
          );
        }
      }
    }
  },
  computed: {
    eventStatus() {
      return this.$store.state.home.eventStatus;
    }
  },
  methods: {
    getEventStatus() {
      this.$store.dispatch("home/getEventStatus");
    }
  }
};
</script>
