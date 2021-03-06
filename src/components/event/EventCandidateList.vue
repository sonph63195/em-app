<template>
  <b-modal id="candidateList" :title="this.courseCode" size="xl">
    <b-card no-body class="border-0">
      <div class="border-bottom p-2 d-flex">
        <div class="flex-fill">
          <!-- <button class="btn btn-success">
            <font-awesome-icon icon="file-excel" class="mr-md-2" />
            <span class="d-none d-md-inline-block">Import Candidate</span>
          </button>-->
        </div>
        <div class="ml-3 d-flex flex-0">
          <button @click="showCreateCandidate" class="btn btn-primary">
            <font-awesome-icon icon="plus-circle" class="mr-md-2" />
            <span class="d-none d-md-inline-block">Create Candidate</span>
          </button>
        </div>
      </div>
      <div v-if="loadSectionState.loading" class="bg-white rounded-5 text-center p-3">
        <b-spinner style="width: 3rem; height: 3rem;" label="Loading"></b-spinner>
      </div>
      <div v-if="loadSectionState.loaded" class="table-responsive-lg">
        <b-table
          :striped="table.striped"
          :hover="table.hover"
          :fixed="table.fixed"
          :items="candidates"
          :fields="table.fields"
        >
          <template slot="HEAD_action">
            <div class="d-flex">
              <span class="align-self-center mr-2">
                <b-form-checkbox v-model="checkAll">All</b-form-checkbox>
              </span>
            </div>
          </template>
          <template slot="no" slot-scope="data">{{ data.index + 1 }}</template>
          <template slot="candidateName" slot-scope="data">
            <div class="d-flex">
              <div class="align-self-center mr-2">
                <div>{{ data.item.name }}</div>
                <span
                  class="badge"
                  :class="'badge' + candidateStatusColor(data.item.candidateStatus)"
                >{{ data.item.candidateStatus }}</span>
              </div>
            </div>
          </template>
          <template slot="university" slot-scope="data">
            <div>{{ data.item.universityName }}</div>
          </template>
          <template slot="action" slot-scope="data">
            <div class="d-flex">
              <span class="align-self-center mr-2">
                <b-form-checkbox v-model="data.item.isChosen"></b-form-checkbox>
              </span>

              <div class="flex-fill text-center">
                <b-button variant="light" pill class="mr-2" @click="showCandidateInfo(data.item)">
                  <font-awesome-icon icon="eye" />
                </b-button>
              </div>
            </div>
          </template>
        </b-table>
      </div>
      <div
        v-if="loadSectionState.loaded == false || candidates.length < 1"
        class="alert alert-danger border-0"
      >
        <span>Empty!</span>
      </div>
    </b-card>

    <!-- Footer modal -->
    <template slot="modal-footer">
      <div class="d-flex justify-content-center w-100">
        <div class="flex-fill">
          <!-- <b-pagination-nav link-gen="linkGen" number-of-pages="numberOfPages()"></b-pagination-nav> -->
          <ul class="pagination">
            <li class="page-item" :class=" this.currentPage === 1 ? 'disabled': ''">
              <a class="page-link" href="#" @click="loadListByPage(1)">
                <span>«</span>
              </a>
            </li>
            <li class="page-item" :class=" this.currentPage === 1 ? 'disabled': ''">
              <a class="page-link" href="#" @click="loadListByPage(--currentPage)">
                <span>‹</span>
              </a>
            </li>
            <li
              v-for="page in paginate"
              :key="page"
              :class="currentPage === page ? 'active': ''"
              class="page-item"
            >
              <a class="page-link" href="#" @click="loadListByPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class=" this.currentPage === numberOfPages() ? 'disabled': ''">
              <a class="page-link" href="#" @click="loadListByPage(++currentPage)">
                <span>›</span>
              </a>
            </li>
            <li class="page-item" :class=" this.currentPage === numberOfPages() ? 'disabled': ''">
              <a class="page-link" href="#" @click="loadListByPage(numberOfPages())">
                <span>»</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <button @click="cancelSection" class="btn btn-light mr-3">
            <font-awesome-icon icon="trash" class="mr-md-2" />
            <span class="d-none d-md-inline-block">Remove Select</span>
          </button>
        </div>
      </div>
    </template>
    <EventCandidateInfo v-bind:candidateInfo="this.candidateInfo" />
    <CreateCandidate
      id="modalCreateCandidate"
      :courseCode="courseCode"
      v-on:addNewCandidateEventSuccess="addNewCandidateEventSuccess"
    />
  </b-modal>
</template>
<script>
import { CandidateStatusMixin, ToastMixin } from "../mixins";
import EventCandidateInfo from "./EventCandidateInfo";
import CreateCandidate from "../candidate/CreateCandidate";

export default {
  mixins: [CandidateStatusMixin, ToastMixin],
  components: {
    EventCandidateInfo,
    CreateCandidate
  },
  data() {
    return {
      table: {
        fields: [
          "no",
          { key: "candidateName", sortable: true },
          { key: "account", sortable: true },
          { key: "university", sortable: true },
          { key: "action", sortable: false }
        ],
        striped: true,
        hover: false,
        fixed: false
      },
      candidateInfo: "",
      selectedStatusCandidate: null,
      paginate: null,
      currentPage: 1,
      checkAll: false
    };
  },
  props: ["courseCode", "eventId", "actualNumberOfTrainees"],
  created() {
    // When component was created, just get page number, default page number = 1. and redirect page to page=1
    // After that will call event list with page number.
    //this.paginate = 1;
    //this.getCandidates();
  },
  computed: {
    /**
     *
     */
    loadSectionState() {
      return this.$store.state.section.loadSection;
    },

    /**
     *
     */
    candidates() {
      return this.$store.state.section.candidates;
    },

    cancelSections() {
      return this.$store.state.section.cancelSections;
    }
  },
  watch: {
    candidates: {
      immediate: true,
      handler() {
        const pages = this.numberOfPages();
        this.paginate = [];
        for (let i = 0; i < pages; i++) {
          this.paginate.push(i + 1);
        }
      }
    },
    eventId: {
      handler() {
        this.getCandidates();
      }
    },
    checkAll: {
      handler() {
        //alert("sdasd");
        this.candidates.forEach(candidate => {
          candidate.isChosen = this.checkAll;
          //console.log(candidate);
        });
      }
    },
    cancelSections: {
      handler() {
        if (this.cancelSections.state.success === true) {
          this.getCandidates();
          this.showToast("Successfull", "Success", "success");
        } else if (this.cancelSections.state.success === false) {
          this.showToast("Cannot remove ", "Error", "danger");
        }
      }
    }
  },
  methods: {
    /**
     *
     */
    numberOfPages() {
      let result = 1;
      let numberCandidates = this.actualNumberOfTrainees;
      result = Math.floor(numberCandidates / 10);
      if (numberCandidates % 10 !== 0) {
        result += 1;
      }
      return isNaN(result) ? 1 : result;
    },

    showCandidateInfo(item) {
      this.candidateInfo = item;
      this.$bvModal.show("modalCandidateInfo");
    },

    loadListByPage(page) {
      this.currentPage = page;

      this.getCandidates();
    },
    getCandidates() {
      const body = {
        eventId: this.eventId,
        page: this.currentPage
      };
      const { dispatch } = this.$store;
      dispatch("section/loadSection", body);
    },
    showCreateCandidate() {
      //
      this.$bvModal.show("modalCreateCandidate");
    },
    addNewCandidateEventSuccess(candidate) {
      this.candidates.unshift(candidate);
    },
    cancelSection() {
      const sections = this.candidates.flatMap(candidate => {
        if (candidate.isChosen === true) {
          return candidate.sectionId;
        }
        return null;
      });
      this.$store.dispatch("section/cancelSections", sections);
    }
  }
};
</script>