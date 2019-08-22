<template>
  <b-row>
    <b-col cols="12" md="2">
      <b-form>
        <ul class="nav">
          <li class="nav-item my-1 w-100">
            <b-form-group label="Event" label-for="input-statust_1">
              <b-form-select id="input-statust_1"  :options="contracts" v-model="candidate.statust_1" class="w-100"></b-form-select>
              <!-- <div class="mt-3">Selected: <strong>{{ candidate.statust_1 }}</strong></div> -->
            </b-form-group>
            <div class="text-center">
              <font-awesome-icon icon="arrow-down" class="display-3" />
            </div>
          </li>
          <li class="nav-item my-1 w-100">
            <b-form-group label="Event" label-for="input-statust_2">
              <b-form-select id="input-statust_2" :options="contracts" v-model="candidate.statust_2" class="w-100"></b-form-select>
            </b-form-group>
          </li>
        </ul>
        <div class="text-center mb-5">
          <b-button @click="reportSection()">Proccess</b-button>
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
      <b-table class="border 1" striped hover :items="items" :fields="fields"></b-table>
    </b-col>
    
  </b-row>
</template>

<script>
import "handsontable/dist/handsontable.full.css";
export default {
  components: {
  },
  data() {
    return {
      uiversitiesOptions: [
        { value: null, text: "Please select university" },
        { value: "FU", text: "FPT University" }
      ],
      contracts: [
        { value: "On_job_training_Contract", text: "On Job Training Contract" },
        { value: "Define-term Labor-Contract", text: "Define term Labor Contract" },
        { value: "Fresher-Training-Contract", text: "Fresher Training Contract" },
        { value: "No_contract", text: "No Contract" }
      ],
      candidate: {
        statust_1: "",
        statust_2: "",
        number: ""
      },
      fields: ["No", "Student_Name","Account", "University", "Gender"],
      items: [
        { No:"1", Student_Name: "Nguyen Thi Hong Nhung",Account:"nhunnhun.abc@gmail.com",University:"FU" ,Gender:"Female"},
        { No:"2", Student_Name: "Bui Quoc Khanh",Account:"nhunnhun.abc@gmail.com",University:"FU" ,Gender:"Female"},
        { No:"3", Student_Name: "Nguyen Thi Hong Nhung",Account:"nhunnhun.abc@gmail.com",University:"FU" ,Gender:"Female"},
        { No:"4", Student_Name: "Nguyen Thi Hong Nhung",Account:"nhunnhun.abc@gmail.com",University:"FU" ,Gender:"Female"},
        { No:"5", Student_Name: "Nguyen Thi Hong Nhung",Account:"nhunnhun.abc@gmail.com",University:"FU" ,Gender:"Female"},
      ]
    };
  },
  methods: {
    /**
     *
     */
    reportSection() {
      this.$store.dispatch("statistic/reportSection",this.candidate.statust_1,this.candidate.statust_2);
    },
  },
  watch:{
    handler(){
     this.reportSection();
    }
  },
  mounted(){
    this.reportSection();
  },
  computed: {
    /**
     *
     */
    // reportSectiontState() {
    //   return this.$store.state.statistic.reportSection;
    // },

    reportSectionUpdate() {
      return this.$store.state.statistic.reportSection  ;
    },
  }
};
</script>
