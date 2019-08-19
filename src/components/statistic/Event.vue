<template>
  <b-row>
    <b-col cols="12" md="2">
      <b-form>
        <ul class="nav">
          <li class="nav-item my-1 w-100">
            <b-form-group label="University" label-for="input-university">
              <b-form-select
                id="input-university"
                v-model="event.selected"
                :options="uiversitiesOptions"
                class="w-100"
              ></b-form-select>
            </b-form-group>
          </li>
          <li class="nav-item my-1 w-100">
            <b-form-group label="Actual Start Date" label-for="input-actualStartDate">
              <b-form-input
                id="input-actualStartDate"
                type="date"
                v-model="event.actualStartDate"
                class="w-100"
                trim
              ></b-form-input>
            </b-form-group>
          </li>
          <li class="nav-item my-1 w-100">
            <b-form-group label="Actual End Date" label-for="input-actualEndDate">
              <b-form-input
                id="input-actualEndDate"
                type="date"
                v-model="event.actualEndDate"
                class="w-100"
                trim
              ></b-form-input>
            </b-form-group>
          </li>
        </ul>
        <div class="text-center">
          <b-button type="submit">Execute</b-button>
        </div>
      </b-form>
      <div class="text-center mt-3">
        <b-button type="submit">Export File</b-button>
      </div>
    </b-col>
    <b-col cols="12" md="8">
      <Chart id="eventDoughnut" :data="dataEvent" />
    </b-col>
    <div class="d-flex justify-content-end">
      <b-col cols="4" class="mt-2 ml-5" md="6">
        <hot-table :settings="hotSettings"></hot-table>
      </b-col>
    </div>
  </b-row>
</template>

<script>
import Chart from "./Chart";
import "handsontable/dist/handsontable.full.css";
import HotTable from "@handsontable/vue";
export default {
  components: {
    Chart,
    HotTable
  },
  data() {
    return {
      uiversitiesOptions: [
        { value: null, text: "Please select university" },
        { value: "FU", text: "FPT University" }
      ],
      event: {
        selected: null,
        actualStartDate: "01/01/2019",
        actualEndDate: "01/01/2019"
      },

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
      },
      hotSettings: {
        data: [
          ["HCM.IUH_INTE_JAVA_HCM19_001", 60],
          ["HCM.IUH_INTE_JAVA_HCM19_002", 59],
          ["HCM.IUH_INTE_JAVA_HCM19_003", 75],
          ["HCM.IUH_INTE_JAVA_HCM19_004", 12],
          ["HCM.IUH_INTE_JAVA_HCM19_005", 15]
        ],
        columnSorting: true,
        colHeaders: ["Event Code", "Candidate quantity"]
      }
    };
  }
};
</script>
<style>
#hot-display-license-info {
  display: none;
}
</style>
