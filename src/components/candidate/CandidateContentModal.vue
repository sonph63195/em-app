<template>
  <div class="bg-white table-responsive-lg">
    <div v-if="getCandidatesState.loaded === true">
      <b-table
        ref="selectableTable"
        :items="candidates"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <!-- Create checkbox all -->
        <template slot="HEAD_all" slot-scope="data">
          <div class="d-flex">
            <span class="align-self-center mr-2">
              <b-form-checkbox @click="select">{{ data.label }}</b-form-checkbox>
            </span>
          </div>
        </template>

        <!-- Create checkbox for allrow -->
        <template slot="all" slot-scope="data">
          <b-form-checkbox v-model="data.item.isChosen" />
        </template>

        <!-- Hidden label of action -->
        <template slot="HEAD_action" slot-scope="data">
          <div class="d-flex">
            <span>{{ data.label='' }}</span>
          </div>
        </template>

        <!-- Edit color fit with status -->
        <template slot="name" slot-scope="data">
          <div>{{data.item.name}}</div>
          <span
            class="badge"
            :class="'badge' + candidateStatusColor(data.item.candidateStatus)"
            v-text="data.item.candidateStatus"
          />
        </template>

        <template slot="university" slot-scope="data">
          <div>{{ data.item.universityName }}</div>
        </template>

        <!-- Create edit button and remove button  -->
        <template slot="action" slot-scope="row">
          <div class="event-action mt-3 mt-lg-0 mr-0 mr-lg-3">
            <div>
              <div class="d-flex flex-lg-column">
                <div class="d-flex flex-fill">
                  <div class="flex-fill">
                    <b-button
                      v-b-tooltip.hover
                      title="View candidate's info"
                      @click="viewCandidateInfo(row.item)"
                      variant="light"
                      block
                    >
                      <font-awesome-icon icon="eye" />
                    </b-button>
                  </div>
                  <div class="flex-fill">
                    <b-button
                      v-b-tooltip.hover
                      title="Edit candidate's info"
                      @click="editCandidate(row.item)"
                      variant="light"
                      block
                    >
                      <font-awesome-icon icon="edit" />
                    </b-button>
                  </div>
                  <div class="flex-fill">
                    <b-button v-b-tooltip.hover title="View event list" variant="light" block>
                      <font-awesome-icon icon="calendar" />
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </b-table>
    </div>
    <div v-if="getCandidatesState.loading === true">
      <div class="bg-white rounded-5 mb-3 p-3 text-center">
        <b-spinner style="width: 3rem; height: 3rem;" label="Loading"></b-spinner>
      </div>
    </div>
    <CandidateEdit id="modalCandidateEdit" ref="popupCandidateEdit" :candidate="currentCandidate" />
    <ViewCandidate
      id="modalViewCandidate"
      v-on:showEditFromView="editCandidate"
      :candidate="currentCandidate"
    />
  </div>
</template>

<script>
import CandidateEdit from "./CandidateEdit";
import ViewCandidate from "./ViewCandidate";

import { CandidateStatusMixin } from "../mixins";

export default {
  components: {
    CandidateEdit,
    ViewCandidate
  },
  mixins: [CandidateStatusMixin],
  data() {
    return {
      sortDesc: false,
      sortBy: "name",
      fields: [
        { key: "all" },
        { key: "name", sortable: true, sortBy: "name" },
        { key: "gender", sortable: false },
        { key: "phone", sortable: true, sortBy: "phone" },
        { key: "account", sortable: true, sortBy: "account" },
        { key: "university", sortable: true, sortBy: "university" },
        "action"
      ],
      currentCandidate: {}
    };
  },
  computed: {
    // getCandidateLoading() {
    //   let storeCandidate = this.$store.state.candidate;
    //   let load = {
    //     loading: storeCandidate.getCandidate.loading,
    //     loaded: storeCandidate.getCandidate.loaded
    //   };
    //   return load;
    // },
    candidates() {
      return this.$store.state.candidate.candidates;
    },
    getCandidatesState() {
      return this.$store.state.candidate.getCandidate;
    }
  },
  methods: {
    select() {
      this.$refs.selectableTable.selectAllRows();
    },

    eventActionButton(status) {
      return status === "Cancelled" || status === "Done";
    },
    getCandidates(pageNumber) {
      this.$emit("loadCandidates", pageNumber);
    },

    viewCandidateInfo(candidate) {
      this.currentCandidate = candidate;
      this.$bvModal.show("modalViewCandidate");
    },
    editCandidate(candidate) {
      this.currentCandidate = candidate;
      this.$bvModal.show("modalCandidateEdit");
    }
  }
};
</script>





