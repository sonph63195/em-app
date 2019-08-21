<template>
  <b-modal :id="id" :ref="id" :title="candidate.name" size="custome" ok-only>
    <b-row>
      <b-col cols="12">
        <span class="captionSubtitle">Account</span>
        <h4 class="font-weight-normal">
          <span
            class="badge"
            :class="'badge' + candidateStatusColor(candidate.candidateStatus)"
            v-text="candidate.candidateStatus"
          />
          {{candidate.account || "N/A"}}
        </h4>
      </b-col>
      <b-col cols="12">
        <span class="captionSubtitle">email</span>
        <h4 class="font-weight-normal">{{candidate.email || "N/A"}}</h4>
      </b-col>
      <b-col cols="12">
        <span class="captionSubtitle">Course code</span>
        <h4 class="font-weight-normal">{{candidate.courseCode || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">University</span>
        <h4 class="font-weight-normal">{{candidate.universityName || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">Faculty</span>
        <h4 class="font-weight-normal">{{candidate.facultyName || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">Contract Type</span>
        <h4 class="font-weight-normal">{{candidate.contractType || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">Nation ID</span>
        <h4 class="font-weight-normal">{{candidate.nationalId || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">Gender</span>
        <h4 class="font-weight-normal">{{candidate.gender || "N/A"}}</h4>
      </b-col>

      <b-col cols="12" md="6">
        <span class="captionSubtitle">Phone</span>
        <h4 class="font-weight-normal">{{candidate.phone || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">Day Of Birth</span>
        <h4 class="font-weight-normal">{{candidate.dayOfBirth || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">Graduation Date</span>
        <h4 class="font-weight-normal">{{candidate.graduationDate || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">Full Time Working</span>
        <h4 class="font-weight-normal">{{candidate.fullTimeWorking || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">Candidate GPA</span>
        <h4 class="font-weight-normal">{{candidate.gpa || "N/A"}}</h4>
      </b-col>
      <b-col cols="12" md="6">
        <span class="captionSubtitle">Skill</span>
        <h4 class="font-weight-normal">{{candidate.skill || "N/A"}}</h4>
      </b-col>

      <b-col cols="12">
        <span class="captionSubtitle">Facebook</span>
        <h4 class="font-weight-normal">{{candidate.facebook || "N/A"}}</h4>
      </b-col>
    </b-row>
    <template slot="modal-footer" slot-scope="{ cancel }">
      <div class="d-flex justify-content-center w-100 fixed-bottom sticky-top">
        <b-button @click="cancel()" variant="light">Close</b-button>
        <b-button @click="showEdit" variant="success" class="shadow ml-3">Edit info</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { CandidateStatusMixin } from "../mixins";

export default {
  props: {
    candidate: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      default: "modalViewCandidate"
    }
  },
  mixins: [CandidateStatusMixin],
  methods: {
    showEdit() {
      this.$emit("showEditFromView", this.candidate);
    }
  }
};
</script>