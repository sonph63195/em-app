<template>
  <!-- Modal candidate info  -->
  <b-modal
    v-model="show"
    id="modalCandidateInfo"
    ref="modalCandidateInfo"
    size="custorme"
    :title="this.candidateInfo.candidateName"
    title-tag="h3"
    header-text-variant="secondary"
    @hidden="show=false, edited = false, info=true,showEditButton=true, showSaveButton=false"
  >
    <b-form v-if="show" inline>
      <ul class="nav w-100">
        <li class="nav-item w-100 mb-3">
          <div class="d-flex justify-content-between">
            <span class="text-info ml-4">
              <strong>Contract Type:</strong>
            </span>
            <span class="flex-fill text-right text-muted" v-if="info">{{candidateInfo.contractType}}</span>
            <b-form-select v-if="edited" v-model="candidateInfo.contractType">
              <option value="Fresher Training Contract">Fresher Training Contract</option>
              <option value="On job training Contract">On job training Contract</option>
              <option value="Definite-term Labor Contract">Definite-term Labor Contract</option>
              <option value="Intern Contract">Intern Contract</option>
            </b-form-select>
          </div>
        </li>
        <li class="nav-item w-100 mb-3">
          <div class="d-flex justify-content-between">
            <span class="text-info ml-4 font-weight-bold">Candidate Status:</span>
            <span
              class="flex-fill text-right text-muted"
              v-if="info"
            >{{candidateInfo.candidateStatus}}</span>
            <b-form-select
              v-if="edited"
              v-bind:value="candidateInfo.candidateStatus"
              v-model="candidateInfo.candidateStatus"
            >
              <option value="Active">Active</option>
              <option value="Done">Done</option>
              <option value="Failed">Failed</option>
              <option value="Passed">Passed</option>
            </b-form-select>
          </div>
        </li>
        <li class="nav-item w-100 mb-3">
          <div class="d-flex justify-content-between">
            <span class="text-info ml-4 font-weight-bold">Final Grade:</span>
            <span class="flex-fill text-right text-muted" v-if="info">{{candidateInfo.finalGrade}}</span>
            <b-input
              class="text-muted"
              v-if="edited"
              v-bind:value="candidateInfo.finalGrade"
              type="text"
            />
          </div>
        </li>
        <li class="nav-item w-100 mb-3">
          <div class="d-flex justify-content-between">
            <span class="text-info ml-4 font-weight-bold">Completion Level:</span>
            <span
              class="flex-fill text-right text-muted"
              v-if="info"
            >{{candidateInfo.completionLevel}}</span>
            <b-input
              class="text-muted"
              v-if="edited"
              v-bind:value="candidateInfo.completionLevel"
              type="text"
            />
          </div>
        </li>
        <li class="nav-item w-100 mb-3">
          <div class="d-flex justify-content-between">
            <span class="text-info ml-4 font-weight-bold">Certificated Id:</span>
            <span
              class="flex-fill text-right text-muted"
              v-if="info"
            >{{candidateInfo.certificateId}}</span>
            <b-input
              class="text-muted"
              v-if="edited"
              v-bind:value="candidateInfo.certificateId"
              type="text"
            />
          </div>
        </li>
        <li class="nav-item w-100 mb-3">
          <div class="d-flex justify-content-between">
            <span class="text-info ml-4 font-weight-bold">Note:</span>
            <span class="flex-fill text-right text-muted" v-if="info">{{candidateInfo.note}}</span>
            <b-input
              class="text-muted"
              v-if="edited"
              v-bind:value="candidateInfo.note"
              type="text"
            />
          </div>
        </li>
      </ul>
    </b-form>

    <!-- Footer of modal candidate info -->
    <template slot="modal-footer">
      <div class="d-flex justify-content-center w-100">
        <b-button
          @click="show=false, edited = false, info=true,showEditButton=true, showSaveButton=false"
          variant="secondary"
          class="shadow ml-3"
        >Cancel</b-button>
        <b-button
          v-show="showEditButton"
          @click="edited = true, info=false,showEditButton=false, showSaveButton=true"
          variant="success"
          class="shadow ml-3"
        >Edit</b-button>
        <b-button
          v-show="showSaveButton"
          @click="updateSectionInfo"
          variant="success"
          class="shadow ml-3"
        >Save</b-button>
        <b-spinner v-show="updateSection.state.loading === true" label="Loading"></b-spinner>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ToastMixin } from "../mixins";

export default {
  data() {
    return {
      showSaveButton: false,
      showEditButton: true,
      edited: false,
      info: true,
      show: false
    };
  },
  props: ["candidateInfo"],
  mixins: [ToastMixin],
  methods: {
    updateSectionInfo() {
      this.edited = false;
      this.info = true;
      this.showEditButton = true;
      this.showSaveButton = false;
      this.$store.dispatch("section/updateSection", this.candidateInfo);
    }
  },
  watch: {
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
  computed: {
    updateSection() {
      return this.$store.state.section.updateSection;
    }
  }
};
</script>