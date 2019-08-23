<template>
  <div class="bg-white">
    <div v-if="eventById.loading">
      <div
        class="back-drop fixed-top fixed-bottom d-flex justify-content-center align-items-center"
      >
        <b-spinner variant="light" style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
      </div>
    </div>
    <div class="d-flex m-2">
      <b-form class="flex-fill d-flex mx-2" @submit.prevent="showByEvent">
        <!-- <b-form-select size="sm" v-model="courseCode" :options="courseCodes"></b-form-select> -->
        <vue-bootstrap-typeahead
          class="w-50"
          v-model="courseCode"
          :data="courseCodes1"
          placeholder="Type an course code..."
        />
        <b-button
          v-b-tooltip.hover
          title="Show candidates list of event"
          type="submit"
          variant="outline-dark"
          class="ml-2"
        >Show</b-button>
      </b-form>
      <div class="flex-fill"></div>
    </div>
    <div>
      <div v-if="getCandidatesState.loaded === true" class="table-responsive-lg">
        <b-table ref="selectableTable" :items="candidates" :fields="fields">
          <!-- Create checkbox all -->
          <template slot="HEAD_all" slot-scope="data">
            <div class="d-flex">
              <span class="align-self-center mr-2">
                <b-form-checkbox v-model="checkAll">{{ data.label }}</b-form-checkbox>
              </span>
            </div>
          </template>

          <!-- Create checkbox for allrow -->
          <template slot="all" slot-scope="data">
            <b-form-checkbox v-model="data.item.isChosen">{{ data.index + 1 }}</b-form-checkbox>
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
                  </div>
                </div>
              </div>
            </div>
          </template>
        </b-table>
      </div>
      <div v-if="getCandidatesState.loaded === false" class="alert alert-danger border-0">
        <span>Empty list</span>
      </div>
      <b-row class="candidate-footer mx-0 fixed-bottom sticky-top">
        <b-col cols="12" class="bg-white rounded-5 mt-3 foot-nav-stick">
          <div class="d-flex align-items-center">
            <div class="flex-fill d-flex align-items-center">
              <b-button @click="cancelSection" variant="light">
                <font-awesome-icon icon="trash" class="mr-3" />Remove Select
              </b-button>
            </div>
            <div class="mt-3">
              <b-pagination-nav :link-gen="linkGen" :number-of-pages="79"></b-pagination-nav>
            </div>
          </div>
        </b-col>
      </b-row>
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
    <CreateCandidate
      id="modalCreateNewCandidate"
      v-on:addNewCandidateEventSuccess="addNewCandidateEventSuccess"
    />
    <EventCandidateList
      :eventId="event.eventId"
      :courseCode="courseCode"
      :actualNumberOfTrainees="event.actualNumberOfTrainees"
    />
  </div>
</template>

<script>
import CandidateEdit from "./CandidateEdit";
import ViewCandidate from "./ViewCandidate";
import CreateCandidate from "./CreateCandidate";
import EventCandidateList from "../event/EventCandidateList";

import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

import { CandidateStatusMixin, ToastMixin } from "../mixins";

export default {
  components: {
    CandidateEdit,
    ViewCandidate,
    CreateCandidate,
    EventCandidateList,
    VueBootstrapTypeahead
  },
  mixins: [CandidateStatusMixin, ToastMixin],
  created() {
    let pageNumber = this.$route.params.page;
    this.getCandidates(pageNumber);
  },
  data() {
    return {
      fields: [
        { key: "all" },
        { key: "name", sortable: true, sortBy: "name" },
        { key: "gender", sortable: false },
        { key: "phone", sortable: true, sortBy: "phone" },
        { key: "account", sortable: true, sortBy: "account" },
        { key: "university", sortable: true, sortBy: "university" },
        "action"
      ],
      currentCandidate: {},
      checkAll: false,
      courseCodes: [],
      courseCodes1: [],
      courseCode: null,
      event: {}
    };
  },
  computed: {
    eventById() {
      return this.$store.state.event.getEventById;
    },
    courseCodesList() {
      return this.$store.state.event.loadAllCourseCode;
    },
    candidates() {
      return this.$store.state.candidate.candidates;
    },
    getCandidatesState() {
      return this.$store.state.candidate.getCandidate;
    }
  },
  methods: {
    getEventById(id) {
      this.$store.dispatch("event/getEventById", id);
    },
    viewCandidateInfo(candidate) {
      this.currentCandidate = candidate;
      this.$bvModal.show("modalViewCandidate");
    },
    editCandidate(candidate) {
      this.currentCandidate = candidate;
      this.$bvModal.show("modalCandidateEdit");
    },
    addNewCandidateEventSuccess(candidate) {
      this.candidates.unshift(candidate);
    },
    showByEvent() {
      const code = this.courseCodes.find(code => code.text === this.courseCode);
      if (!code || this.courseCode === null) {
        this.showToast("Type course code to show", "Warning!!!", "warning");
        return;
      }
      this.getEventById(code.eventId);
    },

    /**
     *
     */
    cancelSection() {
      const sections = this.candidates.flatMap(candidate => {
        if (candidate.isChosen === true) {
          return candidate.sectionId;
        }
        return null;
      });
      this.$store.dispatch("section/cancelSections", sections);
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
     *
     */
    linkGen(pageNum) {
      return {
        name: "candidatePage",
        params: { page: pageNum }
      };
    }
  },
  watch: {
    eventById: {
      handler() {
        if (this.eventById.loaded === true) {
          this.event = this.eventById.event;
          this.$bvModal.show("candidateList");
        } else if (this.eventById.loaded === false) {
          this.showToast(
            "Cannot load candidates list :(",
            "Load event fail",
            "danger"
          );
        }
      }
    },
    courseCodesList: {
      handler() {
        if (this.courseCodesList.data) {
          this.courseCodes = [];
          this.courseCodes1 = [];
          const codes = this.courseCodesList.data;
          const codesKeys = Object.keys(codes);
          codesKeys.forEach(key => {
            this.courseCodes.push({
              value: codes[key],
              text: codes[key],
              eventId: key
            });
            this.courseCodes1.push(codes[key]);
          });
          this.courseCodes.unshift({
            value: null,
            text: "Select your course code"
          });
        }
      }
    },
    checkAll: {
      handler() {
        this.candidates.forEach(candidate => {
          candidate.isChosen = this.checkAll;
        });
      }
    }
  }
};
</script>





