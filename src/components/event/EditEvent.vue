<template>
  <b-modal :id="id" :ref="id" title="Edit Event">
    <div>
      <b-form v-if="!updateEventState.updating">
        <div class="section section-Info">
          <div class="section-header mb-2">
            <div class="section-title flex-shrink-1 mr-3">Information</div>
            <div class="line flex-fill align-middle">
              <div class="border"></div>
            </div>
          </div>
          <div class="section-content">
            <b-form-group label="Course Name" label-for="editCoursename">
              <b-form-select id="editCoursename" v-model="event.courseName" :options="courses"></b-form-select>
            </b-form-group>
            <b-form-group label="Supplier/Partner" label-for="supplier">
              <b-form-select id="supplier" v-model="event.supplier" :options="suppliers"></b-form-select>
            </b-form-group>
            <b-form-group label="Subject Type" label-for="subject">
              <b-form-select id="subject" v-model="event.subjectType" :options="subjects"></b-form-select>
            </b-form-group>
            <b-form-group label="Sub-Subject Type" label-for="subSubject">
              <b-form-select id="subSubject" v-model="event.subSubjectType" :options="subSubjects"></b-form-select>
            </b-form-group>
            <b-form-group label="Format Type" label-for="format">
              <b-form-select id="format" v-model="event.formatType" :options="formats"></b-form-select>
            </b-form-group>
          </div>
        </div>
        <div class="section section-Actual mt-5">
          <div class="section-header mb-2">
            <div class="section-title flex-shrink-1 mr-3">Actual Information</div>
            <div class="line flex-fill align-middle">
              <div class="border"></div>
            </div>
          </div>
          <div class="section-content">
            <b-form-group label="Start Date" label-for="editActualStartDate">
              <b-form-input type="date" id="editActualStartDate" v-model="event.actualStartDate" />
            </b-form-group>
            <b-form-group label="End Date" label-for="editActualEndDate">
              <b-form-input type="date" id="editEndStartDate" v-model="event.actualEndDate" />
            </b-form-group>
            <b-form-group label="Learning Time" label-for="editActualLearningTime">
              <b-form-input
                type="number"
                id="editActualLearningTime"
                v-model="event.actualLearningTime"
              />
            </b-form-group>
            <b-form-group label="Expese" label-for="editActualExpese">
              <b-form-input type="number" id="editActualExpese" v-model="event.actualExpense" />
            </b-form-group>
          </div>
        </div>
        <div class="section section-Plan mt-5">
          <div class="section-header mb-2">
            <div class="section-title flex-shrink-1 mr-3">Planning Information</div>
            <div class="line flex-fill align-middle">
              <div class="border"></div>
            </div>
          </div>
          <div class="section-content">
            <b-form-group label="Start Date" label-for="editPlanStartDate">
              <b-form-input type="date" id="editPlanStartDate" v-model="event.plannedStartDate" />
            </b-form-group>
            <b-form-group label="End Date" label-for="editPlanEndDate">
              <b-form-input type="date" id="editPlanEndDate" v-model="event.plannedEndDate" />
            </b-form-group>
            <b-form-group label="Expese" label-for="editPlanExpese">
              <b-form-input type="number" id="editPlanExpese" v-model="event.plannedExpense" />
            </b-form-group>
          </div>
        </div>
        <div class="section section-Others mt-5">
          <div class="section-header mb-2">
            <div class="section-title flex-shrink-1 mr-3">Others Information</div>
            <div class="line flex-fill align-middle">
              <div class="border"></div>
            </div>
          </div>
          <div class="section-content">
            <b-form-group label="Training Feedback" label-for="editTrainingFeedback">
              <b-form-input type="text" id="editTrainingFeedback" v-model="event.trainingFeedback" />
            </b-form-group>
            <b-form-group label="Training Content" label-for="editTrainingContent">
              <b-form-input
                type="text"
                id="editTrainingContent"
                v-model="event.trainingFeedbackContent"
              />
            </b-form-group>
            <b-form-group label="Training Content Teacher" label-for="editTrainingContentTeacher">
              <b-form-input
                type="text"
                id="editTrainingContentTeacher"
                v-model="event.trainingFeedbackTeacher"
              />
            </b-form-group>
            <b-form-group
              label="Training Content Orgainization"
              label-for="editTrainingContentOrgainization"
            >
              <b-form-input
                type="text"
                id="editTrainingContentOrgainization"
                v-model="event.trainingFeedbackOrganization"
              />
            </b-form-group>
            <b-form-group label="Note" label-for="editNote">
              <b-form-textarea v-model="event.note"></b-form-textarea>
            </b-form-group>
          </div>
        </div>
      </b-form>
      <div v-if="updateEventState.updating" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      </div>
    </div>
    <template slot="modal-footer" slot-scope="{ cancel }">
      <div class="d-flex justify-content-center w-100 fixed-bottom sticky-top">
        <b-button @click="cancel()" variant="light">Cancel</b-button>
        <b-button @click="updateEvent(event)" variant="success" class="shadow ml-3">Save</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ToastMixin } from "../mixins";

export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      default: "modalEditEvent"
    }
  },
  mixins: [ToastMixin],
  data() {
    return {
      plan: {
        start: null,
        end: null
      },
      actual: {
        start: null,
        end: null
      },
      subjects: [{ value: "IT Technical", text: "IT Technical" }],
      formats: [
        { value: "Blended", text: "Blended" },
        { value: "Offline", text: "Offline" }
      ],
      suppliers: [],
      subSubjects: [],
      courses: [],
      changeYear: false
    };
  },
  methods: {
    /**
     *
     */
    updateEvent(event) {
      this.formatDay("D-MMM-YYYY", event);
      this.changeYear = this.checkChangeYear(event.plannedStartDate);
      event.changeYear = this.changeYear;
      this.$store.dispatch("event/updateEvent", event);
    },

    /**
     *
     */
    formatDay(patern, event) {
      event.actualStartDate = this.formatDate(event.actualStartDate, patern);
      event.actualEndDate = this.formatDate(event.actualEndDate, patern);
      event.plannedStartDate = this.formatDate(event.plannedStartDate, patern);
      event.plannedEndDate = this.formatDate(event.plannedEndDate, patern);
      return event;
    },

    checkChangeYear(planDate) {
      const planYear = this.formatDate(planDate, "YYYY");
      const currentYear = this.formatDate(this.plan.start, "YYYY");
      return currentYear != planYear;
    }
  },
  computed: {
    /**
     *
     */
    updateEventState() {
      return this.$store.state.event.updateEvent;
    },

    eventUpdate() {
      return this.$store.state.event.event;
    },

    /**
     *
     */
    universities() {
      return this.$store.state.supplier.getSupplier;
    },
    subSubjectsType() {
      return this.$store.state.subject.getSubSubject;
    },
    campuslinks() {
      return this.$store.state.campuslink.getCampuslink;
    }
  },
  watch: {
    event: {
      handler() {
        this.event = this.formatDay("YYYY-MM-DD", this.event);
        // store old datime
        this.plan.start = this.event.plannedStartDate;
        this.plan.end = this.event.plannedEndDate;
        this.actual.start = this.event.actualStartDate;
        this.actual.end = this.event.actualEndDate;
      }
    },
    updateEventState: {
      handler() {
        this.formatDay("YYYY-MM-DD", this.event);
        if (this.updateEventState.updated === false) {
          let errMsg = this.updateEventState.data.errors[0];
          this.showToast(errMsg, "Error", "danger");
        } else if (this.updateEventState.updated === true) {
          this.showToast("Event was updated", "Success", "success");
          // close modal
          this.$bvModal.hide("modalEditEvent");
          //send data to list if change year
          this.$emit(
            "makeNewEvent",
            this.updateEventState.data.identifiedObject
          );
        }
      }
    },
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
    campuslinks: {
      handler() {
        const campuslinks = this.campuslinks.data;
        if (campuslinks) {
          this.courses = campuslinks.flatMap(campuslink => {
            return {
              value: campuslink.name,
              text: campuslink.name
            };
          });
        }
      }
    }
  }
};
</script>