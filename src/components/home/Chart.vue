<template>
  <b-row class="align-items-stretch">
    <b-col cols="12" md="6" class="mt-3">
      <b-card class="border-0 h-100" no-body>
        <b-card-header class="bg-white">Sub-Subject Type</b-card-header>
        <div
          v-if="subSubjectType.state.loading === true"
          class="d-flex w-100 h-100 justify-content-center p-5"
        >
          <b-spinner
            style="width: 3rem; height: 3rem;"
            class="align-self-center"
            label="Loading..."
          ></b-spinner>
        </div>
        <div v-if="subSubjectType.state.loaded === true" class="p-3">
          <Doughnut id="subSubjectTypeBar" :data="subSubjectTypeBar" />
        </div>
      </b-card>
    </b-col>
    <b-col cols="12" md="6" class="mt-3">
      <b-card class="border-0 h-100" no-body>
        <b-card-header class="bg-white">Event Status</b-card-header>
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
        <div v-if="eventStatus.state.loaded === true" class="p-3">
          <Doughnut id="eventStatusBar" :data="eventStatusBar" />
        </div>
      </b-card>
    </b-col>
    <b-col cols="12" md="6" class="mt-3">
      <b-card class="border-0 h-100" no-body>
        <b-card-header class="bg-white">CampusLink program</b-card-header>
        <div
          v-if="campusLink.state.loading === true"
          class="d-flex w-100 h-100 justify-content-center p-5"
        >
          <b-spinner
            style="width: 3rem; height: 3rem;"
            class="align-self-center"
            label="Loading..."
          ></b-spinner>
        </div>
        <div v-if="campusLink.state.loaded === true" class="p-3">
          <Bar id="campusLinkBar" :data="campusLinkBar" />
        </div>
      </b-card>
    </b-col>
    <b-col cols="12" md="6" class="mt-3">
      <b-card class="border-0 h-100" no-body>
        <b-card-header class="bg-white">Section status</b-card-header>
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
        <div v-if="sectionStatus.state.loaded === true" class="p-3">
          <Bar id="sectionStatusBar" :data="sectionStatusBar" />
        </div>
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
      subSubjectTypeBar: {
        labels: [],
        datasets: [
          {
            label: "Result",
            data: [],
            backgroundColor: [
              "rgba(32,71,95,.5)",
              "rgba(43,72,96,.6)", // Blue
              "rgba(84,73,97,.7)",
              "rgba(18,74,98,.8)",
              "rgba(97,75,99,.9)",
              "rgba(12,76,91,.1)",
              "rgba(92,77,92,.2)",
              "rgba(02,78,93,.3)",
              "rgba(14,79,94,.4)"
            ]
          }
        ]
      },
      campusLinkBar: {
        labels: [],
        datasets: [
          {
            label: "Result",
            data: [],
            backgroundColor: [
              "rgba(32,71,95,.5)",
              "rgba(43,72,96,.6)", // Blue
              "rgba(84,73,97,.7)",
              "rgba(18,74,98,.8)",
              "rgba(97,75,99,.9)",
              "rgba(12,76,91,.1)",
              "rgba(92,77,92,.2)",
              "rgba(02,78,93,.3)",
              "rgba(14,79,94,.4)"
            ]
          }
        ]
      },
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
      },
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
    this.getSubSubjectType();
    this.getCampusLink();
    this.getEventStatus();
    this.getSectionStatus();
  },
  watch: {
    campusLink: {
      immediate: true,
      handler() {
        let loaded =
          this.campusLink.state.loaded === true && this.campusLink.data;
        if (loaded) {
          this.campusLinkBar.labels = Object.keys(this.campusLink.data);
          this.campusLinkBar.datasets[0].data = Object.values(
            this.campusLink.data
          );
        }
      }
    },
    subSubjectType: {
      immediate: true,
      handler() {
        let loaded =
          this.subSubjectType.state.loaded === true && this.subSubjectType.data;

        if (loaded) {
          this.subSubjectTypeBar.labels = Object.keys(this.subSubjectType.data);
          this.subSubjectTypeBar.datasets[0].data = Object.values(
            this.subSubjectType.data
          );
        }
      }
    },
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
    },
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
    subSubjectType() {
      return this.$store.state.home.subSubjectType;
    },
    campusLink() {
      return this.$store.state.home.campusLink;
    },
    eventStatus() {
      return this.$store.state.home.eventStatus;
    },
    sectionStatus() {
      return this.$store.state.home.sectionStatus;
    }
  },
  methods: {
    getSubSubjectType() {
      this.$store.dispatch("home/getSubSubjectType");
    },
    getCampusLink() {
      this.$store.dispatch("home/getCampusLink");
    },
    getEventStatus() {
      this.$store.dispatch("home/getEventStatus");
    },
    getSectionStatus() {
      this.$store.dispatch("home/getSectionStatus");
    }
  }
};
</script>
