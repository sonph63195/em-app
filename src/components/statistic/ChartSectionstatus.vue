<template>
  <b-row class="align-items-stretch">
    <b-col cols="12" md="12" class="mt-3">
      <b-card class="h-100" no-body>
        <b-card-header class="bg-white font-weight-bold" header-text-variant="info">Section status</b-card-header>
        <div
          v-if="sectionStatus.state.loading === true"
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
            <div v-if="sectionStatus.state.loaded === true" class="p-3">
              <Doughnut id="sectionStatusDoughnut" :data="sectionStatusBar" />
            </div>
          </b-tab>
          <b-tab :title="titleBar">
            <template slot="title">
              <font-awesome-icon icon="chart-bar" class="mr-3" />
            </template>
            <div v-if="sectionStatus.state.loaded === true" class="p-3">
              <Bar id="sectionStatusBar" :data="sectionStatusBar" />
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
      sectionStatusBar: {
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
    this.getSectionStatus();
  },
  watch: {
    sectionStatus: {
      immediate: true,
      handler() {
        let loaded =
          this.sectionStatus.state.loaded === true && this.sectionStatus.data;
        if (loaded) {
          this.sectionStatusBar.labels = Object.keys(this.sectionStatus.data);
          this.sectionStatusBar.datasets[0].data = Object.values(
            this.sectionStatus.data
          );
        }
      }
    }
  },
  computed: {
    sectionStatus() {
      return this.$store.state.home.sectionStatus;
    }
  },
  methods: {
    getSectionStatus() {
      this.$store.dispatch("home/getSectionStatus");
    }
  }
};
</script>
