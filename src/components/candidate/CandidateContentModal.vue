<template>
  <div class="bg-white table-responsive-lg">
    <b-table :items="candidates" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
      <!-- Create checkbox all -->
      <template slot="HEAD_all" slot-scope="data">
        <div class="d-flex">
          <span class="align-self-center mr-2">
            <b-form-checkbox>{{ data.label }}</b-form-checkbox>
          </span>
        </div>
      </template>

      <!-- Create checkbox for allrow -->
      <template slot="all" slot-scope="row">
        <b-form-checkbox v-model="row.detailsShowing" />
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
      </template>

      <!-- Create edit button and remove button  -->
      <template slot="action" slot-scope="row">
        <b-button pill @click="viewCandidateInfo(row.item)" variant="light">
          <font-awesome-icon icon="eye" />
        </b-button>
        <!-- <b-link v-b-modal.modalRemove class="btn btn-icon rounded-pill btn-light">
          <font-awesome-icon icon="trash" />
        </b-link>-->
      </template>
    </b-table>
    <!-- <b-modal id="modalRemove" size="md" title="Remove Candidate"></b-modal> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortDesc: false,
      sortBy: "name",
      fields: [
        { key: "all" },
        { key: "name", sortable: true, sortBy: "name" },
        { key: "gender" },
        { key: "phone", sortable: true, sortBy: "phone" },
        { key: "account", sortable: true, sortBy: "account" },
        { key: "university", sortable: true, sortBy: "university" },
        "action"
      ]
    };
  },
  computed: {
    getCandidateLoading() {
      let storeCandidate = this.$store.state.candidate;
      let load = {
        loading: storeCandidate.getCandidate.loading,
        loaded: storeCandidate.getCandidate.loaded
      };
      return load;
    },
    candidates() {
      return this.$store.state.candidate.candidates;
    }
  },
  methods: {
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i].candidateId);
        }
      }
    },
    statusBadgeColor(name) {
      let result = "badge-";
      switch (name) {
        case "Cancelled":
          result += "warning";
          break;
        case "Drop-Out":
          result += "danger";
          break;
        case "Passed":
          result += "success";
          break;
        default:
          // Active
          result += "primary";
      }
      return result;
    },
    eventActionButton(status) {
      return status === "Cancelled" || status === "Done";
    },
    getCandidates(pageNumber) {
      this.$emit("getCandidates", pageNumber);
    },

    /**
     *
     */
    viewCandidateInfo(candidate) {
      this.$router.push({
        name: "candidateInfo",
        params: { candidateId: candidate.candidateId }
      });
    }
  }
};
</script>





