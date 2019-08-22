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
    <b-col cols="12" md="10">
      <ChartCOE />
      <!-- <EventChart/> -->
    </b-col>
      <b-col cols="12" class="mt-2" md="2">
        <div class="bg-white"></div>
      </b-col>
      <b-col cols="12" class="mt-2 " md="10">
        <b-table class="border 1" striped hover :items="items" :fields="fields"></b-table>
      </b-col>
  </b-row>
</template>

<script>
import ChartCOE from "./ChartCOE";
export default {
  components: {
    ChartCOE
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
      fields: ["course_code", "enrolled_students"],
      items: [
        { course_code: "HCM.IUH_INTE_JAVA_HCM19_001", enrolled_students: "60" },
        { course_code: "HCM.IUH_INTE_JAVA_HCM19_002", enrolled_students: "59" },
        { course_code: "HCM.IUH_INTE_JAVA_HCM19_003", enrolled_students: "75" },
        { course_code: "HCM.IUH_INTE_JAVA_HCM19_004", enrolled_students: "12" },
        { course_code: "HCM.IUH_INTE_JAVA_HCM19_005", enrolled_students: "25" },
      ]
    };
  }
};
</script>
<style>
#hot-display-license-info {
  display: none;
}
</style>
