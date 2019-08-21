<template>
  <div>
    <Header />
    <main>
      <b-container>
        <!-- Loading and empty -->
        <b-row>
          <b-col v-if="getEventByIdState.loading" cols="12" class="mt-3">
            <div class="bg-white rounded-5 text-center p-3">
              <b-spinner style="width: 3rem; height: 3rem;" label="Loading"></b-spinner>
            </div>
          </b-col>
          <b-col v-if="!getEventByIdState.loaded" cols="12" class="mt-3">
            <div
              class="alert alert-info rounded-5 text-center p-3"
            >It's look like empty. Please come back later!</div>
          </b-col>
        </b-row>

        <!-- Content -->
        <b-row v-if="getEventByIdState.loaded">
          <b-col cols="12" class="mt-3">
            <b-card class="border-0" header="Event Information" header-tag="header" no-body>
              <div class="d-lg-flex align-items-center w-100 flex-0">
                <div class="p-3 flex-fill">
                  <div>
                    <span class="text-muted">Code</span>
                  </div>
                  <h1 class="h2 font-weight-normal text-truncate mb-0">{{ event.courseCode }}</h1>

                  <h4>
                    <span
                      class="badge"
                      :class="eventStatusColor(event.eventStatus)"
                      v-text="event.eventStatus"
                    />
                    <b-button
                      v-if="!eventIsDoneOrCancel(event.eventStatus)"
                      variant="link"
                      size="sm"
                      v-b-modal.cancelEvent
                    >
                      <font-awesome-icon icon="edit" class="text-warning" />
                    </b-button>
                  </h4>
                </div>
                <div class="p-3 flex-fill overflow-hidden">
                  <div>
                    <div>
                      <span class="text-muted">Course Name</span>
                    </div>
                    <div class="text-wrap">
                      <InputEdit
                        id="eventCourseName"
                        cssClass="h4 font-weight-normal"
                        type="select"
                        :defaultData="courseName"
                        :obj="event"
                        valueKey="courseName"
                        :state="updateEventState"
                        v-on:updateEdit="updateEvent"
                      />
                    </div>
                  </div>
                  <div class="mt-3">
                    <div>
                      <span class="text-muted">Subject Type</span>
                    </div>
                    <div class="text-wrap">
                      <InputEdit
                        id="eventSubjectType"
                        cssClass="h4 font-weight-normal"
                        type="select"
                        :obj="event"
                        :defaultData="subject"
                        valueKey="subjectType"
                        :state="updateEventState"
                        v-on:updateEdit="updateEvent"
                      />
                    </div>
                  </div>
                </div>
                <div class="p-3 flex-fill overflow-hidden">
                  <div>
                    <div>
                      <span class="text-muted">Suppiler/Partner</span>
                    </div>
                    <div class="text-wrap">
                      <InputEdit
                        id="eventSupplier"
                        cssClass="h4 font-weight-normal"
                        type="select"
                        :defaultData="supplier"
                        :obj="event"
                        valueKey="supplier"
                        :state="updateEventState"
                        v-on:updateEdit="updateEvent"
                      />
                    </div>
                  </div>
                  <div class="mt-3">
                    <div>
                      <span class="text-muted">Format Type</span>
                    </div>
                    <div class="text-truncate">
                      <span class="h4 font-weight-normal text-truncate">{{ event.formatType }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>

          <!-- Event information -->
          <b-col cols="12" class="mt-3">
            <b-card no-body class="d-flex flex-md-row border-0">
              <b-tabs pills card class="flex-fill border-right" fill justified>
                <b-tab title="Actual Information" active>
                  <b-card-text>
                    <ul class="nav w-100">
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Actual Start Date</span>
                          <span
                            class="flex-fill text-right text-muted"
                          >{{ this.formatDate(event.actualStartDate, "D-MMM-YYYY") }}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Actual End Date</span>
                          <span
                            class="flex-fill text-right text-muted"
                          >{{ this.formatDate(event.actualEndDate, "D-MMM-YYYY") }}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Actual Learning Time</span>
                          <span class="flex-fill text-right text-muted">{{event.actualLearningTime}}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Actual Number of Traineese</span>
                          <span
                            class="flex-fill text-right text-muted"
                          >{{event.actualNumberOfTrainees}}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Number of Enrolled Students</span>
                          <span
                            class="flex-fill text-right text-muted"
                          >{{event.actualNumberOfEnrolled}}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Actual Expese</span>
                          <span class="flex-fill text-right text-muted">{{event.actualExpense}}</span>
                        </div>
                      </li>
                    </ul>
                  </b-card-text>
                </b-tab>
                <b-tab title="Planned Information">
                  <b-card-text>
                    <ul class="nav w-100">
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Planned Start date</span>
                          <span
                            class="flex-fill text-right text-muted"
                          >{{ this.formatDate(event.plannedStartDate, "D-MMM-YYYY") }}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Planned End date</span>
                          <span
                            class="flex-fill text-right text-muted"
                          >{{ this.formatDate(event.plannedEndDate, "D-MMM-YYYY") }}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Planned Number of Students</span>
                          <span
                            class="flex-fill text-right text-muted"
                          >{{event.plannedNumberOfStudents}}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Planned Exprese</span>
                          <span class="flex-fill text-right text-muted">{{event.plannedExpense}}</span>
                        </div>
                      </li>
                    </ul>
                  </b-card-text>
                </b-tab>
                <b-tab title="Others Information">
                  <b-card-text>
                    <ul class="nav w-100">
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Training Feedback</span>
                          <span class="flex-fill text-right text-muted">{{event.trainingFeedback}}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Training Content</span>
                          <span class="flex-fill text-right text-muted">{{event.trainingContent}}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Training Content Teacher</span>
                          <span
                            class="flex-fill text-right text-muted"
                          >{{event.trainingContentTeacher}}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Training Content Orgainization</span>
                          <span
                            class="flex-fill text-right text-muted"
                          >{{event.trainingContentOrgainization}}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Note</span>
                          <span class="flex-fill text-right text-muted">{{event.note}}</span>
                        </div>
                      </li>
                      <li class="nav-item w-100 mb-3">
                        <div class="d-flex">
                          <span class="text-primary">Budget code</span>
                          <span class="flex-fill text-right text-muted">{{event.BudgetCodes}}</span>
                        </div>
                      </li>
                    </ul>
                  </b-card-text>
                </b-tab>
                <template slot="tabs-end">
                  <b-button class="ml-3" variant="outline-warning" @click="showPopupEditEvent">
                    <font-awesome-icon icon="edit" />&nbsp;Edit
                  </b-button>
                </template>
              </b-tabs>
            </b-card>
          </b-col>

          <!-- Candidate list -->
          <b-col cols="12" class="mt-3">
            <b-card no-body class="border-0">
              <div class="border-bottom p-2 d-flex">
                <div class="flex-fill">
                  <button class="btn btn-success">
                    <font-awesome-icon icon="file-excel" class="mr-md-2" />
                    <span class="d-none d-md-inline-block">Import Candidate</span>
                  </button>
                </div>
                <div class="ml-3 d-flex flex-0">
                  <button class="btn btn-primary">
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
                        <b-form-checkbox>All</b-form-checkbox>
                      </span>
                    </div>
                  </template>
                  <template slot="no" slot-scope="data">{{ data.index + 1 }}</template>
                  <template slot="candidateName" slot-scope="data">
                    <div class="d-flex">
                      <div class="align-self-center mr-2">
                        <div>{{ data.item.candidateName }}</div>
                        <span
                          class="badge"
                          :class="'badge' + candidateStatusColor(data.item.candidateStatus)"
                        >{{ data.item.candidateStatus }}</span>
                      </div>
                    </div>
                  </template>
                  <template slot="action" slot-scope="row">
                    <div class="d-flex">
                      <span class="align-self-center mr-2">
                        <b-form-checkbox></b-form-checkbox>
                      </span>

                      <div class="flex-fill text-center">
                        <b-button
                          @click="showCandidateInfo(row.item)"
                          variant="light"
                          pill
                          class="mr-2"
                        >
                          <font-awesome-icon icon="eye" />
                        </b-button>
                      </div>
                    </div>
                  </template>
                </b-table>
              </div>
            </b-card>
            <b-card no-body class="mt-3 border-0 fixed-bottom sticky-top foot-nav-stick">
              <div class="d-flex pt-3 pl-3">
                <div class="flex-fill">
                  <b-pagination-nav :link-gen="linkGen" :number-of-pages="pageNum" use-router></b-pagination-nav>
                </div>
                <div>
                  <b-form inline>
                    <b-form-select v-model="selectedStatusCandidate">
                      <option value="null">Choose status candidates</option>
                      <option value="Active">Active</option>
                      <option value="Cancel">Cancel</option>
                      <option value="Done">Done</option>
                      <option value="Drop-Out">Drop-Out</option>
                      <option value="Failed">Failed</option>
                      <option value="Passed">Passed</option>
                    </b-form-select>
                    <button type="button" class="btn ml-2 mr-2 btn-outline-warning">Change status</button>
                  </b-form>
                </div>
                <div>
                  <button class="btn btn-light mr-3">
                    <font-awesome-icon icon="trash" class="mr-md-2" />
                    <span class="d-none d-md-inline-block">Remove Select</span>
                  </button>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </main>

    <!-- Modal candidate info  -->
    <b-modal
      v-model="show"
      id="modalCandidateInfo"
      ref="modalCandidateInfo"
      size="custorme"
      :title="formInfo.candidateName"
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
              <span class="flex-fill text-right text-muted" v-if="info">{{formInfo.contractType}}</span>
              <b-form-select v-if="edited" v-model="formInfo.contractType">
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
              <span class="flex-fill text-right text-muted" v-if="info">{{formInfo.candidateStatus}}</span>
              <b-form-select
                v-if="edited"
                v-bind:value="formInfo.candidateStatus"
                v-model="formInfo.candidateStatus"
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
              <span class="text-info ml-4 font-weight-bold">Grade:</span>
              <span class="flex-fill text-right text-muted" v-if="info">{{formInfo.grade}}</span>
              <b-input class="text-muted" v-if="edited" v-bind:value="formInfo.grade" type="text" />
            </div>
          </li>
          <li class="nav-item w-100 mb-3">
            <div class="d-flex justify-content-between">
              <span class="text-info ml-4 font-weight-bold">Completion Level:</span>
              <span class="flex-fill text-right text-muted" v-if="info">{{formInfo.completionLevel}}</span>
              <b-input
                class="text-muted"
                v-if="edited"
                v-bind:value="formInfo.completionLevel"
                type="text"
              />
            </div>
          </li>
          <li class="nav-item w-100 mb-3">
            <div class="d-flex justify-content-between">
              <span class="text-info ml-4 font-weight-bold">Certificated Id:</span>
              <span class="flex-fill text-right text-muted" v-if="info">{{formInfo.certificatedId}}</span>
              <b-input
                class="text-muted"
                v-if="edited"
                v-bind:value="formInfo.certificatedId"
                type="text"
              />
            </div>
          </li>
          <li class="nav-item w-100 mb-3">
            <div class="d-flex justify-content-between">
              <span class="text-info ml-4 font-weight-bold">Note:</span>
              <span class="flex-fill text-right text-muted" v-if="info">{{formInfo.note}}</span>
              <b-input class="text-muted" v-if="edited" v-bind:value="formInfo.note" type="text" />
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
            @click="edited = false, info=true,showEditButton=true, showSaveButton=false"
            variant="success"
            class="shadow ml-3"
          >Save</b-button>
        </div>
      </template>
    </b-modal>

    <!-- Modal Confirm before remove -->
    <PopupMessage
      id="cancelEvent"
      type="warning"
      ref="cancelEvent"
      v-on:action="cancelEventRequest"
    >
      <div class="d-flex flex-column mt-3">
        <div v-if="!cancelEventState.loading" class="md-content mb-3">
          <div class="h5 font-weight-light">Are you want to remove?</div>
          <div>
            <small class="text-muted">
              Remove only can change status to
              <span class="badge badge-danger">Cancel</span>
            </small>
          </div>
        </div>
        <div v-if="cancelEventState.loading" class="mb-3">
          <b-spinner style="width: 3rem; height: 3rem;" label="Loading"></b-spinner>
        </div>
      </div>
    </PopupMessage>

    <!-- Edit Event -->
    <b-modal id="modalEditEvent" ref="modalEditEvent" title="Edit Event">
      <div v-if="currentEvent" class="overflow-auto">
        <b-form v-if="!updateEventState.updating">
          <div class="section-Actual">
            <h5 class="text-muted font-weight-light">Actual Information</h5>
            <b-form-group label="Start Date" label-for="editActualStartDate">
              <b-form-input
                type="date"
                id="editActualStartDate"
                v-model="currentEvent.actualStartDate"
              />
            </b-form-group>
            <b-form-group label="End Date" label-for="editActualEndDate">
              <b-form-input type="date" id="editEndStartDate" v-model="currentEvent.actualEndDate" />
            </b-form-group>
            <b-form-group label="Learning Time" label-for="editActualLearningTime">
              <b-form-input
                type="number"
                id="editActualLearningTime"
                v-model="currentEvent.actualLearningTime"
              />
            </b-form-group>
            <b-form-group label="Expese" label-for="editActualExpese">
              <b-form-input
                type="number"
                id="editActualExpese"
                v-model="currentEvent.actualExpense"
              />
            </b-form-group>
          </div>
          <div class="section-Plan mt-3">
            <h5 class="text-muted font-weight-light">Planning Information</h5>
            <b-form-group label="Start Date" label-for="editPlanStartDate">
              <b-form-input
                type="date"
                id="editPlanStartDate"
                v-model="currentEvent.plannedStartDate"
              />
            </b-form-group>
            <b-form-group label="End Date" label-for="editPlanEndDate">
              <b-form-input type="date" id="editPlanEndDate" v-model="currentEvent.plannedEndDate" />
            </b-form-group>
            <b-form-group label="Expese" label-for="editPlanExpese">
              <b-form-input
                type="number"
                id="editPlanExpese"
                v-model="currentEvent.plannedExpense"
              />
            </b-form-group>
          </div>
          <div class="section-Others mt-3">
            <h5 class="text-muted font-weight-light">Others Information</h5>
            <b-form-group label="Training Feedback" label-for="editTrainingFeedback">
              <b-form-input
                type="text"
                id="editTrainingFeedback"
                v-model="currentEvent.trainingFeedback"
              />
            </b-form-group>
            <b-form-group label="Training Content" label-for="editTrainingContent">
              <b-form-input
                type="text"
                id="editTrainingContent"
                v-model="currentEvent.trainingFeedbackContent"
              />
            </b-form-group>
            <b-form-group label="Training Content Teacher" label-for="editTrainingContentTeacher">
              <b-form-input
                type="text"
                id="editTrainingContentTeacher"
                v-model="currentEvent.trainingFeedbackTeacher"
              />
            </b-form-group>
            <b-form-group
              label="Training Content Orgainization"
              label-for="editTrainingContentOrgainization"
            >
              <b-form-input
                type="text"
                id="editTrainingContentOrgainization"
                v-model="currentEvent.trainingFeedbackOrganization"
              />
            </b-form-group>
            <b-form-group label="Note" label-for="editNote">
              <b-form-input type="text" id="editNote" v-model="currentEvent.note" />
            </b-form-group>
          </div>
        </b-form>
        <div v-if="updateEventState.updating" class="text-center">
          <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        </div>
      </div>
      <template slot="modal-footer" slot-scope="{ cancel }">
        <div class="d-flex justify-content-center w-100 fixed-bottom sticky-top">
          <b-button @click="cancel()" variant="light">Cancel</b-button>
          <b-button @click="updateEvent(currentEvent)" variant="success" class="shadow ml-3">Save</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Header from "../header/Header";
import InputEdit from "../utils/InputEdit";
import PopupMessage from "../utils/PopupMessage";

import {
  EventStatusMixin,
  CandidateStatusMixin,
  PopupMixin,
  ToastMixin
} from "../mixins";

export default {
  components: {
    Header,
    InputEdit,
    PopupMessage
  },
  mixins: [EventStatusMixin, CandidateStatusMixin, PopupMixin, ToastMixin],
  data() {
    return {
      selectedStatusCandidate: null,
      showSaveButton: false,
      showEditButton: true,
      edited: false,
      info: true,
      show: false,
      formInfo: {
        candidateName: "",
        contractType: "",
        candidateStatus: "",
        grade: "",
        completionLevel: "",
        certificatedId: "",
        note: ""
      },
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
      courseName: {
        options: [
          { value: "Global Software Talent", text: "Global Software Talent" },
          { value: "GST LITE", text: "GST LITE" },
          { value: "INTERNSHIP", text: "INTERNSHIP" },
          { value: "THESIS", text: "THESIS" },
          { value: "FSOFT TOUR", text: "FSOFT TOUR" }
        ]
      },
      subject: {
        options: [{ value: "IT Technical", text: "IT Technical" }]
      },
      supplier: {
        options: [
          { value: "ĐH Công nghiệp TPHCM", text: "ĐH Công nghiệp TPHCM" },
          { value: "ĐH FPT", text: "ĐH FPT" },
          { value: "CĐ Kỹ thuật Cao Thắng", text: "CĐ Kỹ thuật Cao Thắng" }
        ]
      },
      eventId: null,
      paginate: null,
      pageNum: 1,
      currentEvent: null
    };
  },
  created() {
    /**
     *
     */
    this.paginate = this.$route.params.page;
    this.eventId = this.$route.params.eventId;
    /**
     *
     */
    this.getEventById();
    this.loadSection();
  },
  computed: {
    event() {
      return this.$store.state.event.event;
    },

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

    /**
     *
     */
    getEventByIdState() {
      return this.$store.state.event.getEventById;
    },

    /**
     *
     */
    updateEventState() {
      return this.$store.state.event.updateEvent;
    },

    /**
     *
     */
    cancelEventState() {
      return this.$store.state.event.cancelEvent;
    }
  },
  watch: {
    event: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.pageNum = this.numberOfPages();
        });
      }
    },
    cancelEventState: {
      handler() {
        if (this.cancelEventState.success) {
          this.getEventById();
          // close confirm popup
          this.hidePopup("cancelEvent", "cancelEvent");
        } else if (this.cancelEventState.success === false) {
          this.showToast(
            "Cannot cancel event. Please try again",
            "Error",
            "danger"
          );
        }
      }
    },
    updateEventState: {
      handler() {
        if (this.updateEventState.updated === false) {
          this.showToast("Event cannot update", "Error", "danger");
        } else if (this.updateEventState.updated === true) {
          this.showToast("Event was updated", "Success", "success");
          this.hidePopup("modalEditEvent", "modalEditEvent");
        }
        this.formatDay("YYYY-MM-DD", this.event);
      }
    }
  },
  methods: {
    /**
     *
     * @author Hong Anh
     */
    showCandidateInfo(item) {
      this.formInfo.candidateName = item.candidateName;
      this.formInfo.candidateStatus = item.candidateStatus;
      this.formInfo.contractType = item.contractType;
      this.formInfo.grade = item.finalGrade;
      this.formInfo.certificatedId = item.certificatedId;
      this.formInfo.note = item.note;
      this.formInfo.completionLevel = item.completionLevel;
      this.$bvModal.show("modalCandidateInfo");
    },

    /**
     *
     */
    loadSection() {
      const { eventId, paginate } = this;
      const { dispatch } = this.$store;
      dispatch("section/loadSection", { eventId, paginate });
    },

    /**
     *
     */
    getEventById() {
      this.$store.dispatch("event/getEventById", this.eventId);
    },

    /**
     *
     */
    linkGen(pageNum) {
      let eventId = this.eventId;
      return {
        name: "eventInfoPage",
        params: { page: pageNum, eventId: eventId }
      };
    },

    /**
     *
     */
    numberOfPages() {
      let result = 0;
      let numberCandidates = this.event.actualNumberOfTrainees;
      result = Math.floor(numberCandidates / 10);
      if (numberCandidates % 10 !== 0) {
        result += 1;
      }
      return isNaN(result) ? 1 : result;
    },

    /**
     *
     */
    updateEvent(event) {
      event = this.formatDay("D-MMM-YYYY", event);
      // console.log(event);
      this.$store.dispatch("event/updateEvent", event);
    },

    /**
     *
     */
    cancelEventRequest() {
      this.$store.dispatch("event/cancelEvent", [this.eventId]);
    },

    /**
     * Show popup for edit event
     */
    showPopupEditEvent() {
      this.currentEvent = this.event;
      this.showPopup("modalEditEvent", "modalEditEvent");
    },

    /**
     *
     */
    formatDay(patern, event) {
      // format time to send to server
      //this.moment(event.actualStartDate).format(patern);
      event.actualStartDate = this.formatDate(event.actualStartDate, patern);
      event.actualEndDate = this.formatDate(event.actualEndDate, patern);
      event.plannedStartDate = this.formatDate(event.plannedStartDate, patern);
      event.plannedEndDate = this.formatDate(event.plannedEndDate, patern);
      return event;
    }
  }
};
</script>
