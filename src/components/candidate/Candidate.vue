<template>
  <div>
    <Header />
    <main class="mt-3">
      <b-container fluid>
        <section class="candidate position-relative">
          <b-row class="candidate-header">
            <b-col cols="12" class="mb-3 d-flex flex-column">
              <div class="main-action flex-1 d-flex flex-column flex-lg-row flex-lg-grow-0 w-100">
                <b-button
                  variant="outline-success"
                  class="flex-0 btn-icon btn-import border-0 mb-3 mr-lg-3"
                  v-b-modal.modal-ImportCandidate
                >
                  <font-awesome-icon icon="calendar-alt" class="mr-3" />Import Candidate
                </b-button>
                <b-button v-b-modal.modalCreateCandidate variant="primary" class="mb-3">
                  <font-awesome-icon icon="plus-circle" class="mr-3" />Create Candidate
                </b-button>
              </div>
              <div
                class="bg-white rounded-5 w-100 d-flex flex-1 flex-lg-grow-1 align-self-center mt-3 mt-lg-0"
              >
                <div class="filter flex-fill">
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
              </div>
            </b-col>
          </b-row>

          <!-- Content -->
          <b-row class="candidate-content">
            <b-col cols="12" class="mb-3 d-flex flex-column">
              <CandidateContentModal
                v-on:getCandidates="getCandidates"
                v-on:removeCandidate="removeCandidate"
                ref="candidateList"
              />
            </b-col>
          </b-row>
          <!-- End content -->

          <b-row class="candidate-footer mx-0 fixed-bottom sticky-top">
            <b-col cols="12" class="bg-white rounded-5 mt-3 foot-nav-stick">
              <div class="d-flex align-items-center">
                <div class="flex-fill d-flex align-items-center">
                  <b-button variant="light">
                    <font-awesome-icon icon="trash" class="mr-3" />Remove Select
                  </b-button>
                </div>
                <div class="mt-3">
                  <b-pagination-nav :link-gen="linkGen" :number-of-pages="79" use-router></b-pagination-nav>
                </div>
              </div>
            </b-col>
          </b-row>
        </section>
        <CreateCandidate id="modalCreateCandidate" />
        <b-modal id="modalEdit" size="custome" title="Edit Candidate" ok-only></b-modal>
      </b-container>
    </main>

    <!-- Model ImportCandidate -->
    <b-modal id="modal-ImportCandidate" header-border-variant="0" footer-border-variant="0">
      <template slot="modal-header" slot-scope="{ close }">
        <h5 class="modal-title" id="modalImportCandidateTitle">Import Candidate</h5>
        <b-button
          @click="close()"
          class="close"
          variant="link"
          aria-label="Close"
          data-dismiss="modal"
        >
          <span aria-hidden="true">×</span>
        </b-button>
      </template>
      <b-container fluid>
        <b-row class="border border-dashed border-3">
          <b-col cols="12" class="text-center p-0">
            <b-form class="box">
              <DragDropFile
                v-on:fileAddedEvent="fileAddedCandidate"
                v-on:removedFileEvent="removedFileCandidate"
              />
            </b-form>
          </b-col>
        </b-row>
        <b-row v-if="workbook && workbook.SheetNames">
          <b-col class="overflow-auto mt-3 w-100 p-0">
            <div v-if="readFile">Loading...</div>
            <h5>Choose your sheet</h5>
            <b-list-group horizontal>
              <b-list-group-item
                v-for="name in workbook.SheetNames"
                :key="name"
                href="#"
                class="flex-column align-items-start"
                @click="convertJson(name)"
              >
                <span>{{name}}</span>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-container>
      <template slot="modal-footer" slot-scope="{ cancel }">
        <div class="d-flex justify-content-center w-100">
          <b-button @click="cancel()" variant="light">Cancel</b-button>
          <b-button @click="processImport" variant="success" class="shadow ml-3">Import</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import Header from "../header/Header";
import CandidateContentModal from "../candidate/CandidateContentModal";
import CreateCandidate from "../candidate/CreateCandidate";
import DragDropFile from "../utils/DragDropFile";

export default {
  components: {
    Header,
    CandidateContentModal,
    CreateCandidate,
    DragDropFile
  },
  computed: {
    readFile() {
      return this.$store.state.file.status.reading;
    },
    workbook() {
      return this.$store.state.file.workbook;
    },
    dataJsonRequest() {
      return this.$store.state.file.data;
    }
  },
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
    let pageNumber = this.$route.params.page;
    this.getCandidates(pageNumber);
  },
  methods: {
    /**
     * File added Candidate when user drag or choose a file
     */
    fileAddedCandidate() {
      const dropzone = document.getElementById("dropzone").dropzone;
      this.file = dropzone.files[0];
      if (this.file !== null) {
        this.readExcelFile();
      }
    },
    /**
     * processImport is called request to send data to server
     */
    processImport() {
      // const dropzone = document.getElementById("dropzone").dropzone;
      // this.file = dropzone.files[0];
      //console.log(dropzone.getQueuedFiles());
    },
    /**
     * removedFileCandidate is called when remove file from dragzone
     *
     * @param object {file, error, xhr}
     */
    removedFileCandidate(param) {
      this.file = null;
      const { dispatch } = this.$store;
      dispatch("file/removeFile");
      // eslint-disable-next-line
      console.log(param.error);
    },
    /**
     * Read file excel
     */
    readExcelFile() {
      const { dispatch } = this.$store;
      dispatch("file/readingFile", this.file);
    },
    /**
     * When file was read and user choose sheet convert datd to object to send it to server
     *
     * @param String event_code
     */
    convertJson(event_code) {
      let worksheet = this.workbook.Sheets[event_code];

      const { dispatch } = this.$store;
      dispatch("file/convertJson", worksheet);
    },
    /**
     * This method will open Confirm Modal(id="modalPopUp") by click to "Remove Select All" button
     * And get the events list is chosen, that list will be assigned for eventsRemove
     *
     * @returns void
     */
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

    /**
     * This method is called by Candidate-content component, and parameter is an array that has only one element that is event object(JSON)
     * need to remove (change status into Cancel). And then show Confirm Modal(id="modalPopUp") for confirm before remove.
     *
     * @param Array candidates list
     */
    removeCandidate(candidates) {
      // this.candidatesRemove = candidates;
      // // show confirm pop up
      // this.$refs.modalPopUp.$bvModal.show("modalPopUp");
    },

    /**
     * This method will call a store action (event store), to get data event list from database. Each page response
     * 10 elements.
     *
     * @param int pageNumber
     */
    getCandidates(pageNumber) {
      this.$store.dispatch("candidate/getCandidate", pageNumber);
    },

    /**
     * This method will set pageNumber and push page in address bar
     *
     * @param int number - a number in pagination
     */
    paginPage(pageNum) {
      this.$router.push(this.linkGen(pageNum));
    },
    linkGen(pageNum) {
      return {
        name: "candidatePage",
        params: { page: pageNum }
      };
    }
  }
};
</script>




