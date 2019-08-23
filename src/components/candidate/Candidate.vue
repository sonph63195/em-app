<template>
  <div>
    <Header />
    <main class="mt-3">
      <b-container fluid>
        <section class="candidate position-relative">
          <b-row class="candidate-header">
            <b-col cols="12" class="mb-3 d-flex flex-column">
              <div class="main-action flex-1 d-flex flex-column flex-lg-row flex-lg-grow-0 w-100">
                <!-- <b-button
                  variant="outline-success"
                  class="flex-0 btn-icon btn-import border-0 mb-3 mr-lg-3"
                  v-b-modal.modal-ImportCandidate
                >
                  <font-awesome-icon icon="calendar-alt" class="mr-3" />Import Candidate
                </b-button>-->
                <b-button v-b-modal.modalCreateNewCandidate variant="primary" class="mb-3">
                  <font-awesome-icon icon="plus-circle" class="mr-3" />Create Candidate
                </b-button>
              </div>
              <!-- <div
                class="bg-white rounded-5 w-100 d-flex flex-1 flex-lg-grow-1 align-self-center mt-3 mt-lg-0"
              >
                <div class="filter flex-fill d-flex">
                  <b-dd text="Status" size="sm" variant="white" class="m-2">
                    <b-dropdown-form>
                      <b-form-checkbox>Active</b-form-checkbox>
                      <b-form-checkbox>Cancel</b-form-checkbox>
                      <b-form-checkbox>Done</b-form-checkbox>
                      <b-form-checkbox>Drop-Out</b-form-checkbox>
                      <b-form-checkbox>Passed</b-form-checkbox>
                    </b-dropdown-form>
                  </b-dd>
                  <b-dd text="Skill" size="sm" variant="white" class="m-2">
                    <b-dropdown-form>
                      <b-form-checkbox>Java</b-form-checkbox>
                      <b-form-checkbox>.Net</b-form-checkbox>
                      <b-form-checkbox>All</b-form-checkbox>
                    </b-dropdown-form>
                  </b-dd>
                  <b-dd text="Faculty" size="sm" variant="white" class="m-2">
                    <b-dropdown-form>
                      <b-form-checkbox>ICT</b-form-checkbox>
                      <b-form-checkbox>ICT-CE</b-form-checkbox>
                      <b-form-checkbox>ICT-SE</b-form-checkbox>
                      <b-form-checkbox>MAT</b-form-checkbox>
                      <b-form-checkbox>SET</b-form-checkbox>
                    </b-dropdown-form>
                  </b-dd>
                </div>
              </div>-->
            </b-col>
          </b-row>

          <!-- Content -->
          <b-row class="candidate-content">
            <b-col cols="12" class="mb-3 d-flex flex-column">
              <CandidateContentModal ref="candidateList" />
            </b-col>
          </b-row>
          <!-- End content -->
        </section>

        <b-modal id="modalEdit" size="custome" title="Edit Candidate" ok-only></b-modal>
      </b-container>
    </main>
  </div>
</template>
<script>
import Header from "../header/Header";
import CandidateContentModal from "../candidate/CandidateContentModal";

export default {
  components: {
    Header,
    CandidateContentModal
  },
  computed: {},
  watch: {},
  data() {
    return {
      candidate: {
        selectedChange: null,
        status: [
          { value: null, text: "Select status" },
          { value: "pass", text: "Pass" },
          { value: "onboard", text: "Onboard" },
          { value: "cancel", text: "Cancel" },
          { value: "re_apply", text: "Re-apply" },
          { value: "calling", text: "Calling" },
          { value: "mail_merge", text: "Mail-merge" },
          { value: "transfer", text: "Transfer" }
        ]
      },
      candidatesRemove: null
    };
  },
  created() {
    this.loadAllCourseCode();
    this.getFaculty();
  },
  methods: {
    showRemoveCandidateOnList() {
      this.candidatesRemove = this.$refs.candidateList.candidates.filter(
        candidate => candidate.isChosen
      );
      // show confirm pop up
      this.$refs.modalPopUp.$bvModal.show("modalPopUp");
    },

    /**
     *
     */
    removeCandidateList() {
      // eslint-disable-next-line
      console.log(this.candidatesRemove);
    },

    loadAllCourseCode() {
      this.$store.dispatch("event/loadAllCourseCode");
    },
    getFaculty() {
      this.$store.dispatch("faculty/getFaculty");
    }
  }
};
</script>




