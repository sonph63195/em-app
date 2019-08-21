<template>
  <b-card no-body>
    <b-card-header class="bg-white font-weight-bold" header-text-variant="info">Candidate Of Event</b-card-header>
    <b-tabs>
      <b-tab active>
        <template slot="title">
          <font-awesome-icon icon="chart-pie" class="mr-3" />
        </template>
        <Doughnut id="eventDoughnut" :data="dataEvent"></Doughnut>
      </b-tab>
      <b-tab>
        <template slot="title">
          <font-awesome-icon icon="chart-bar" class="mr-3" />
        </template>
        <Bar id="eventBar" :data="dataEvent"></Bar>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import Doughnut from "../utils/Doughnut";
import Bar from "../utils/Bar";

export default {
  components: {
    Doughnut,
    Bar
  },
  props: {
    data: Object,
    id: String
  },
  data() {
    return {
      dataEvent: {
        labels: [
          "HCM.IUH_INTE_JAVA_HCM19_001",
          "HCM.IUH_INTE_JAVA_HCM19_002",
          "HCM.IUH_INTE_JAVA_HCM19_003",
          "HCM.IUH_INTE_JAVA_HCM19_004",
          "HCM.IUH_INTE_JAVA_HCM19_005"
        ],
        datasets: [
          {
            label: "Result",
            data: [60, 59, 75, 12, 25],
            backgroundColor: [
              "rgba(89, 192, 163, 0.5)",
              "rgba(81, 104, 242, 0.5)",
              "rgba(250, 184, 54, 0.5)",
              "rgb(204, 204, 204)",
              "rgba(63, 255, 0, 1)"
            ]
          }
        ]
      }
    };
  }
};
</script>
