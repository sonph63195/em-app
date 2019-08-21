<template>
  <b-row class="align-items-stretch">
    <b-col cols="12" md="12" class="mt-3">
      <b-card class="h-100" no-body>
        <b-card-header class="bg-white font-weight-bold" header-text-variant="info">Sub-Subject Type</b-card-header>
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
        <b-tabs>
          <b-tab :title="titleDoughnut" active>
            <template slot="title">
              <font-awesome-icon icon="chart-pie" class="mr-3" />
            </template>
            <div v-if="subSubjectType.state.loaded === true" class="p-3">
              <Doughnut id="subSubjectTypeBar" :data="subSubjectTypeBar" />
            </div>
          </b-tab>
          <b-tab :title="titleBar">
            <template slot="title">
              <font-awesome-icon icon="chart-bar" class="mr-3" />
            </template>
            <Bar id="subSubjectTypeBar" :data="subSubjectTypeBar" />
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
      }
    };
  },
  mounted() {
    this.getSubSubjectType();
  },
  watch: {
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
    }
  },
  computed: {
    subSubjectType() {
      return this.$store.state.home.subSubjectType;
    }
  },
  methods: {
    getSubSubjectType() {
      this.$store.dispatch("home/getSubSubjectType");
    }
  }
};
</script>
