<template>
  <div>
    <!-- Tabs with card integration -->
    <b-card no-body>
      <b-tabs v-model="tabIndex" small card>
        <b-tab title="Candidate Info" active>
          <b-container fluid>
            <b-form>
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    id="input-group-candidateName"
                    label="Name"
                    label-for="input-candidateName"
                  >
                    <b-form-input id="input-candidateName" type="text" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateNationId"
                    label="Nation ID"
                    label-for="input-candidateNationId"
                  >
                    <b-form-input id="input-candidateNationId" type="text" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateGender"
                    label="Gender"
                    label-for="input-candidateGender"
                  >
                    <b-form-select id="input-candidateGender" :options="genders"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateUniversity"
                    label="University"
                    label-for="input-candidateUniversity"
                  >
                    <b-form-select id="input-candidateUniversity" :options="universities"></b-form-select>
                  </b-form-group>
                </b-col>
                <!-- <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateFaculty"
                    label="Faculty"
                    label-for="input-candidateFaculty"
                  >
                    <b-form-select id="input-candidateFaculty" :options="faculties"></b-form-select>
                  </b-form-group>
                </b-col> -->
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateEmail"
                    label="Email"
                    label-for="input-candidateEmail"
                  >
                    <b-form-input id="input-candidateEmail" type="email" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidatePhone"
                    label="Phone"
                    label-for="input-candidatePhone"
                  >
                    <b-form-input id="input-candidatePhone" type="tel" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateDateOfBirth"
                    label="Date Of Birth"
                    label-for="input-candidateDateOfBirth"
                  >
                    <b-form-input id="input-candidateDateOfBirth" type="date" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateGraduationDate"
                    label="Graduation Date"
                    label-for="input-candidateGraduationDate"
                  >
                    <b-form-input id="input-candidateGraduationDate" type="date" required></b-form-input>
                  </b-form-group>
                </b-col>
                 <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateFullTimeWorking"
                    label="Full Time Working"
                    label-for="input-candidateFullTimeWorking"
                  >
                    <b-form-input id="input-candidateFullTimeWorking" type="text" />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateGPA"
                    label="GPA"
                    label-for="input-candidateGPA"
                  >
                    <b-form-input id="input-candidateGPA" type="text" />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateSkill"
                    label="Skill"
                    label-for="input-candidateSkill"
                  >
                    <b-form-select id="input-candidateSkill" :options="skill"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
        </b-tab>
        <b-tab title="Training Info" v-bind:disabled="tabDisabled">
          <b-container fluid>
            <b-form>
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateFromDate"
                    label="From Date"
                    label-for="input-candidateFromDate"
                  >
                    <b-form-input id="input-candidateFromDate" type="date" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateToDate"
                    label="To Date"
                    label-for="input-candidateToDate"
                  >
                    <b-form-input id="input-candidateToDate" type="date" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateStatus"
                    label="Status"
                    label-for="input-candidateStatus"
                  >
                    <b-form-select id="input-candidateStatus" :options="status"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateFinalGrade"
                    label="Final grade"
                    label-for="input-candidateFinalGrade"
                  >
                    <b-form-input id="input-candidateFinalGrade" type="text" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateCompletionLevel"
                    label="University"
                    label-for="input-candidateCompletionLevel"
                  >
                    <b-form-select id="input-candidateCompletionLevel" :options="completionLevel"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateCertificateID"
                    label="Certificate ID"
                    label-for="input-candidateCertificateID"
                  >
                    <b-form-input id="input-candidateCertificateID"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateUpdatedBy"
                    label="Updated by"
                    label-for="input-candidateUpdatedBy"
                  >
                    <b-form-input id="input-candidateUpdatedBy" type="text" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateFromDate"
                    label="From date"
                    label-for="input-candidateFromDate"
                  >
                    <b-form-input id="input-candidateFromDate" type="text" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group
                    id="input-group-candidateNote"
                    label="Note"
                    label-for="input-candidateNote"
                  >
                    <b-form-input id="input-candidateNote" type="text" required></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
        </b-tab>
        <!-- <b-tab title="GST follow-up">
          <b-container>
            <b-form>
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateReCer"
                    label="RECer"
                    label-for="input-candidateReCer"
                  >
                    <b-form-input id="input-candidateReCer" type="text" />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateGSTStatus"
                    label="RECer"
                    label-for="input-candidateGSTStatus"
                  >
                    <b-form-select id="input-candidateGSTStatus" :options="GSTstatus"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateCVNumber"
                    label="CV number"
                    label-for="input-candidateGSTStatus"
                  >
                    <b-form-input id="input-candidateCVNumber" type="text"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateContractType"
                    label="1st contract Type"
                    label-for="input-candidateContractType"
                  >
                    <b-form-select id="input-candidateContractType" :options="contractType"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group
                    id="input-group-candidateGSTNote"
                    label="Note"
                    label-for="input-candidateGSTNote"
                  >
                    <b-form-textarea
                      id="input-candidateGSTNote"
                      v-model="text"
                      placeholder="Enter something..."
                      rows="2"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
        </b-tab>
        <b-tab title="Transfer">
          <b-container>
            <b-form>
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateUniHotKey"
                    label="Uni Hot_key *"
                    label-for="input-candidateUniHotKey"
                  >
                    <b-form-input id="input-candidateUniHotKey" type="text" />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateTier"
                    label="Tier"
                    label-for="input-candidateTier"
                  >
                    <b-form-input id="input-candidateTier" type="text" />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateEventType"
                    label="Event Type"
                    label-for="input-candidateEventType"
                  >
                    <b-form-select id="input-candidateEventType" :options="eventType"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateEventName"
                    label="Event Name"
                    label-for="input-candidateEventName"
                  >
                    <b-form-input id="input-candidateEventName" type="text"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateSkill"
                    label="Skill"
                    label-for="input-candidateSkill"
                  >
                    <b-form-select id="input-candidateSkill" :options="skill"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateMailMerge"
                    label="Mail Merge"
                    label-for="input-candidateMailMerge"
                  >
                    <b-form-input id="input-candidateMailMerge" type="text" />
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidate"
                    label="Feedback Status *"
                    label-for="input-candidateFeedbackStatus"
                  >
                    <b-form-input id="input-candidateFeedbackStatus" type="text" />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateGPA"
                    label="GPA"
                    label-for="input-candidateGPA"
                  >
                    <b-form-input id="input-candidateGPA" type="text" />
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group
                    id="input-group-candidateTransferNote"
                    label="Note"
                    label-for="input-candidateTransferNote"
                  >
                    <b-form-textarea
                      id="input-candidateTransferNote"
                      v-model="text"
                      placeholder="Enter something..."
                      rows="2"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
        </b-tab>-->
      </b-tabs>
    </b-card>

    <!-- Control buttons-->
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button  variant="light" @click="tabIndex--" >Cancel</b-button>
        <b-button @click="enableTrainingTab" variant="primary"  v-if="tabIndex == 0">Continue</b-button>
        <b-button variant="success" v-if="tabIndex == 1">Save</b-button>
      </b-button-group>

      <!-- <div class="text-muted">Current Tab: {{ tabIndex }}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabDisabled: true,
      tabIndex: 0,
      genders: [
        { value: "male", text: "Male" },
        { value: "female", text: "Female" }
      ],
      universities: [{ value: "fu", text: "FPT University" }],
      faculties: [{ value: "ict", text: "ICT" }],
      status: [
        { value: "active", text: "Active" },
        { value: "passed", text: "Passed" }
      ],
      completionLevel: [
        {
          value: "a",
          text: "A"
        },
        {
          value: "b",
          text: "B"
        },
        {
          value: "c",
          text: "C"
        },
        {
          value: "d",
          text: "D"
        },
        {
          value: "e",
          text: "E"
        }
      ],
      GSTstatus: [{ value: "transfer", text: "Transfer" }],
      contractType: [{ value: "1st contract Type", text: "1st contract Type" }],
      eventType: [
        {
          value: "intership",
          text: "Intership"
        }
      ],
      skill: [
        { value: "java", text: "Java" },
        { value: ".Net", text: ".Net" },
        { value: "all", text: "All" }
      ]
    };
  },
  methods: {
    // nextTab(position) {
    //   this.showTab[position] = false;
    //   this.tabIndex = position;
    //   this.tabIndex = position;
    // },
     enableTrainingTab:function(){
       this.tabIndex++;
      this.tabDisabled = false;

   },
 
  }
};
</script>

