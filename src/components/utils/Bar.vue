<template>
  <canvas :id="id"></canvas>
</template>

<script>
import Chart from "chart.js";

export default {
  props: {
    id: String,
    data: Object
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  data() {
    return {
      type: "bar",
      // data: this.data,
      options: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.createChart(this.id, {
      type: this.type,
      data: this.data,
      options: this.options
    });
  }
};
</script>
