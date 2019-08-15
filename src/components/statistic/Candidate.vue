<template>
  <b-row>
    <b-col cols="12" md="2">
      <b-form>
        <ul class="nav">
          <li class="nav-item my-1 w-100">
            <b-form-group label="Event" label-for="input-statust_1">
              <b-form-input id="input-statust_1" v-model="candidate.statust_1" class="w-100"></b-form-input>
            </b-form-group>
            <div class="text-center">
              <font-awesome-icon icon="arrow-down" class="display-3" />
            </div>
          </li>
          <li class="nav-item my-1 w-100">
            <b-form-group label="Event" label-for="input-statust_2">
              <b-form-input id="input-statust_2" v-model="candidate.statust_2" class="w-100"></b-form-input>
            </b-form-group>
          </li>
        </ul>
        <div class="text-center mb-5">
          <b-button type="submit">Proccess</b-button>
          <div>
            <span>Result:&nbsp;</span>
            <span>{{ candidate.number }}</span>
          </div>
        </div>
      </b-form>
      <div class="text-center mt-t">
        <b-button type="submit">Export File</b-button>
      </div>
    </b-col>
    <b-col cols="12" md="10">
      <hot-table :settings="hotSettings">
      </hot-table>
    </b-col>
    
  </b-row>
</template>

<script>
import "handsontable/dist/handsontable.full.css";
import HotTable from "@handsontable/vue";
export default {
  components: {
    HotTable,
  },
  data() {
    return {
      uiversitiesOptions: [
        { value: null, text: "Please select university" },
        { value: "FU", text: "FPT University" }
      ],
      candidate: {
        statust_1: "Internship",
        statust_2: "Fresher",
        number: 80
      },
      hotSettings:{
        data:[
        ["1","Nguyen Thi Hong Nhung","nhunnhun.abc@gmail.com","FU","Female"],
        ["2","Bui Quoc Khanh","quockhanh.abc@gmail.com","FU","Male"],
        ["3","Pham Hoang Son","hoangson.abc@gmail.com","FU","Male"],
        ["4","Nguyen Thi Hong Anh","honganh.abc@gmail.com","FU","Female"],
        ],
        columnSorting: true,
        colHeaders: ["No", "Student Name", "Account", "University", "Gender"]
      },
    };
  }
};
</script>
