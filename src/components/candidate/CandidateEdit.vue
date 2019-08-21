<template>
  <b-modal :id="id" :ref="id" title="Edit Candidate" size="custome">
    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab title="Candidate Info" active>
          <b-container v-if="!updateCandidate.state.loading" fluid>
            <b-form>
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    id="input-group-candidateName"
                    label="Name"
                    label-for="input-candidateName"
                  >
                    <b-form-input
                      id="input-candidateName"
                      v-model="candidate.name"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateNationId"
                    label="Nation ID"
                    label-for="input-candidateNationId"
                  >
                    <b-form-input
                      id="input-candidateNationId"
                      v-model="candidate.nationalId"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateGender"
                    label="Gender"
                    label-for="input-candidateGender"
                  >
                    <b-form-select
                      id="input-candidateGender"
                      v-model="candidate.gender"
                      :options="genders"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateUniversity"
                    label="University"
                    label-for="input-candidateUniversity"
                  >
                    <b-form-select
                      id="input-candidateUniversity"
                      v-model="candidate.universityName"
                      :options="suppliers"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group id="input-group-Faculty" label="Faculty" label-for="input-Faculty">
                    <b-form-select
                      id="input-Faculty"
                      v-model="candidate.facultyName"
                      :options="faculties"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateEmail"
                    label="Email"
                    label-for="input-candidateEmail"
                  >
                    <b-form-input
                      id="input-candidateEmail"
                      v-model="candidate.email"
                      type="email"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidatePhone"
                    label="Phone"
                    label-for="input-candidatePhone"
                  >
                    <b-form-input
                      id="input-candidatePhone"
                      v-model="candidate.phone"
                      type="tel"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateDateOfBirth"
                    label="Date Of Birth"
                    label-for="input-candidateDateOfBirth"
                  >
                    <b-form-input
                      id="input-candidateDateOfBirth"
                      v-model="candidate.dayOfBirth"
                      type="date"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateGraduationDate"
                    label="Graduation Date"
                    label-for="input-candidateGraduationDate"
                  >
                    <b-form-input
                      id="input-candidateGraduationDate"
                      v-model="candidate.graduationDate"
                      type="number"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateFullTimeWorking"
                    label="Full Time Working"
                    label-for="input-candidateFullTimeWorking"
                  >
                    <b-form-input
                      id="input-candidateFullTimeWorking"
                      v-model="candidate.fullTimeWorking"
                      type="date"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateGPA"
                    label="GPA"
                    label-for="input-candidateGPA"
                  >
                    <b-form-input id="input-candidateGPA" v-model="candidate.gpa" type="text" />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateSkill"
                    label="Skill"
                    label-for="input-candidateSkill"
                  >
                    <b-form-select
                      id="input-candidateSkill"
                      v-model="candidate.skill"
                      :options="subSubjects"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateFacebook"
                    label="Facebook"
                    label-for="input-candidateFacebook"
                  >
                    <b-form-input
                      id="input-candidateFacebook"
                      v-model="candidate.facebook"
                      :options="skills"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
          <b-container fluid v-if="updateCandidate.state.loading === true">
            <b-row>
              <b-col cols="12">
                <div class="bg-white rounded-5 p-3 text-center">
                  <b-spinner style="width: 3rem; height: 3rem;" label="Loading"></b-spinner>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-tab>
        <b-tab title="Training Info">
          <b-container fluid v-if="!updateSection.state.loading">
            <b-form>
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateStatus"
                    label="Status"
                    label-for="input-candidateStatus"
                  >
                    <b-form-select
                      id="input-candidateStatus"
                      v-model="candidate.candidateStatus"
                      :options="status"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateFinalGrade"
                    label="Final grade"
                    label-for="input-candidateFinalGrade"
                  >
                    <b-form-input
                      v-model="candidate.finalGrade"
                      id="input-candidateFinalGrade"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateContractType"
                    label="Contract Type"
                    label-for="input-candidateContractType"
                  >
                    <b-form-select
                      v-model="candidate.contractType"
                      :options="contractTypes"
                      id="input-candidateContractType"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateCertificateID"
                    label="Certificate ID"
                    label-for="input-candidateCertificateID"
                  >
                    <b-form-input
                      v-model="candidate.certificateId"
                      id="input-candidateCertificateID"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    id="input-group-candidateCompletionLevel"
                    label="Completion Level"
                    label-for="input-candidateCompletionLevel"
                  >
                    <b-form-select
                      v-model="candidate.completionLevel"
                      :options="completionLevel"
                      id="input-candidateCompletionLevel"
                    ></b-form-select>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group
                    id="input-group-candidateTransferNote"
                    label="Note"
                    label-for="input-candidateTransferNote"
                  >
                    <b-form-textarea
                      v-model="candidate.note"
                      id="input-candidateTransferNote"
                      placeholder="Enter something..."
                      rows="12"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
          <b-container fluid v-if="updateSection.state.loading === true">
            <b-row>
              <b-col cols="12">
                <div class="bg-white rounded-5 p-3 text-center">
                  <b-spinner style="width: 3rem; height: 3rem;" label="Loading"></b-spinner>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-tab>
      </b-tabs>
    </b-card>
    <template slot="modal-footer" slot-scope="{ cancel }">
      <div class="d-flex justify-content-center w-200 fixed-bottom sticky-top">
        <b-button @click="cancel()" variant="light">Cancel</b-button>
        <b-button
          @click="updateCandidateInfo"
          variant="success"
          v-if="tabIndex == 0"
          class="ml-3"
        >Save Info</b-button>
        <b-button
          @click="updateSectionInfo"
          v-if="tabIndex == 1"
          variant="success"
          class="shadow ml-3"
        >Save section</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ToastMixin } from "../mixins";

export default {
  props: {
    candidate: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      default: "modalCandidateEdit"
    }
  },
  mixins: [ToastMixin],
  data() {
    return {
      tabDisabled: true,
      tabIndex: 0,
      skills: [],
      genders: [
        { value: "Male", text: "Male" },
        { value: "Female", text: "Female" }
      ],
      suppliers: [],
      subSubjects: [],
      faculties: [],
      status: [
        { value: "Active", text: "Active" },
        { value: "Done", text: "Done" },
        { value: "Failed", text: "Failed" },
        { value: "Passed", text: "Passed" }
      ],
      completionLevel: [
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" }
      ],
      GSTstatus: [{ value: "transfer", text: "Transfer" }],
      contractTypes: [
        {
          value: "Fresher Training Contract",
          text: "Fresher Training Contract"
        },
        {
          value: "On job training Contract",
          text: "On job training Contract"
        },
        {
          value: "Definite-term Labor Contract",
          text: "Definite-term Labor Contract"
        },
        {
          value: "Intern Contract",
          text: "Intern Contract"
        }
      ],
      eventType: [
        {
          value: "Intership",
          text: "Intership"
        }
      ]
    };
  },
  created() {
    this.getSupplier();
    this.getSubSubjectType();
    this.getFaculty();
  },
  computed: {
    universities() {
      return this.$store.state.supplier.getSupplier;
    },
    updateCandidate() {
      return this.$store.state.candidate.updateCandidate;
    },
    subSubjectsType() {
      return this.$store.state.subject.getSubSubject;
    },
    updateSection() {
      return this.$store.state.section.updateSection;
    },
    facultiesList() {
      return this.$store.state.faculty.getFaculty;
    }
  },
  watch: {
    universities: {
      immediate: false,
      handler() {
        const universities = this.universities.data;
        if (universities) {
          this.suppliers = universities.flatMap(university => {
            return {
              value: university.universityName,
              text: university.universityName
            };
          });
        }
      }
    },
    subSubjectsType: {
      handler() {
        const subSubjects = this.subSubjectsType.data;
        if (subSubjects) {
          this.subSubjects = subSubjects.flatMap(subSubject => {
            return {
              value: subSubject.subSubjectTypeName,
              text: subSubject.subSubjectTypeName
            };
          });
        }
      }
    },
    facultiesList: {
      handler() {
        if (this.facultiesList.data) {
          this.faculties = this.facultiesList.data.flatMap(faculty => {
            return {
              text: faculty.name,
              value: faculty.name
            };
          });
        }
      }
    },
    updateCandidate: {
      handler() {
        if (this.updateCandidate.state.success === true) {
          this.showToast("Update successfull", "Success", "success");
        } else if (this.updateCandidate.state.success === false) {
          let msg = "";
          msg += this.updateCandidate.data.errors.flatMap(msgs => {
            return ` ${msgs}`;
          });
          this.showToast(msg, "Error", "danger");
        }
        this.convertDate("YYYY-MM-DD");
      }
    },
    updateSection: {
      handler() {
        if (this.updateSection.state.success === true) {
          this.showToast("Update successfull", "Success", "success");
        } else if (this.updateSection.state.success === false) {
          this.showToast("Update faild", "Error", "danger");
        }
      }
    }
  },
  methods: {
    getSupplier() {
      this.$store.dispatch("supplier/getSupplier");
    },
    getSubSubjectType() {
      this.$store.dispatch("subject/getSubSubject");
    },
    getFaculty() {
      this.$store.dispatch("faculty/getFaculty");
    },
    updateCandidateInfo() {
      this.convertDate("D-MMM-YYYY");
      const { candidate } = this;
      this.$store.dispatch("candidate/updateCandidateInfo", { candidate });
    },

    updateSectionInfo() {
      this.$store.dispatch("section/updateSection", this.candidate);
    },

    convertDate(pattern) {
      if (this.candidate.fullTimeWorking) {
        this.candidate.fullTimeWorking = this.formatDate(
          this.candidate.fullTimeWorking,
          pattern
        );
      }
      if (this.candidate.dayOfBirth) {
        this.candidate.dayOfBirth = this.formatDate(
          this.candidate.dayOfBirth,
          pattern
        );
      }
    }
  }
};
</script>