<template>
  <b-modal id="modal-createEvent" size="lg" title="Create New Event">
    <div v-if="!createEventFromManual.state.loading === true">
      <section class="event-info section">
        <div class="section-header">
          <div class="section-title flex-shrink-1 mr-3">Event Info</div>
          <div class="line flex-fill align-middle">
            <div class="border"></div>
          </div>
        </div>
        <div class="section-content p-2">
          <div class="row justify-content-md-center">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="course">Course Name:</label>
                <b-form-select
                  id="course"
                  v-model="event.courseName"
                  :options="course"
                  :disabled="campuslinks.state.loaded !== true"
                ></b-form-select>
              </div>
              <div class="form-group">
                <label for="supplier">Supplier/Partner:</label>
                <b-form-select
                  id="supplier"
                  v-model="event.supplier"
                  :options="supplier"
                  :disabled="universities.state.loaded !== true"
                ></b-form-select>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex">
                <div class="flex-fill pr-2">
                  <div class="form-group">
                    <label for="subject">Subject Type:</label>
                    <b-form-select id="subject" v-model="event.subjectType" :options="subject"></b-form-select>
                  </div>
                </div>
                <div class="flex-fill pl-2">
                  <div class="form-group">
                    <label for="subSubject">Sub-Subject Type:</label>
                    <b-form-select
                      id="subSubject"
                      v-model="event.subSubjectType"
                      :options="subSubject"
                      :disabled="subSubjects.state.loaded !== true"
                    ></b-form-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="format">Format Type:</label>
                <b-form-select id="format" v-model="event.formatType" :options="format"></b-form-select>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="event-plan section">
        <div class="section-header">
          <div class="section-title flex-shrink-1 mr-3">Event Plan</div>
          <div class="line flex-fill align-middle">
            <div class="border"></div>
          </div>
        </div>
        <div class="section-content p-2">
          <div class="row justify-content-md-center">
            <div class="col-12">
              <div class="d-flex">
                <div class="flex-fill pr-2">
                  <div class="form-group">
                    <label for="planStartDate">Plan star date:</label>
                    <b-form-input v-model="event.plannedStartDate" id="planStartDate" type="date"></b-form-input>
                  </div>
                </div>
                <div class="flex-fill pl-2">
                  <div class="form-group">
                    <label for="planEndDate">Plan end date:</label>
                    <b-form-input v-model="event.plannedEndDate" id="planEndDate" type="date"></b-form-input>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="d-flex">
                <div class="flex-fill pr-2">
                  <div class="form-group">
                    <label for="planExprese">Plan Exprese:</label>
                    <b-form-input type="number" v-model="event.planExpense" id="planExprese"></b-form-input>
                  </div>
                </div>
                <div class="flex-fill pl-2">
                  <div class="form-group">
                    <label for="budget">Budget:</label>
                    <b-form-input type="number" v-model="event.budgetCode" id="budget"></b-form-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label for="note">Note:</label>
                <b-form-textarea
                  id="note"
                  v-model="event.note"
                  placeholder="Enter something..."
                  size="lg"
                ></b-form-textarea>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-if="createEventFromManual.state.loading === true">
      <div class="bg-white rounded-5 mb-3 p-3 text-center">
        <b-spinner style="width: 3rem; height: 3rem;" label="Loading"></b-spinner>
      </div>
    </div>
    <template slot="modal-footer" slot-scope="{ cancel }">
      <div class="d-flex justify-content-center w-100">
        <b-button @click="cancel()" variant="light">Cancel</b-button>
        <b-button @click="createNewEvent" variant="primary" class="shadow ml-3">Create New</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ToastMixin } from "../mixins";

export default {
  mixins: [ToastMixin],
  mounted() {},
  data() {
    return {
      event: {
        courseName: "INTERNSHIP",
        subjectType: "IT Technical",
        subSubjectType: "JAVA",
        formatType: "Blended",
        supplier: "ĐH FPT",
        plannedStartDate: this.formatDate(new Date(), "YYYY-MM-DD"),
        plannedEndDate: this.formatDate(new Date(), "YYYY-MM-DD"),
        plannedLearningTime: 320,
        actualLearningTime: 320,
        eventStatus: "Planning",
        note: "",
        budgetCode: 0,
        planExpense: 0
      },
      course: [],
      supplier: [],
      subject: [{ value: "IT Technical", text: "IT Technical" }],
      subSubject: [],
      format: [
        { value: "Blended", text: "Blended" },
        { value: "Offline", text: "Offline" }
      ]
    };
  },
  computed: {
    universities() {
      return this.$store.state.supplier.getSupplier;
    },
    subSubjects() {
      return this.$store.state.subject.getSubSubject;
    },
    campuslinks() {
      return this.$store.state.campuslink.getCampuslink;
    },
    createEventFromManual() {
      return this.$store.state.event.createEventFromManual;
    }
  },
  methods: {
    createNewEvent() {
      this.convertDate("DD-MMM-YYYY");
      const { event } = this;
      this.$store.dispatch("event/createEventFromManual", { event });
    },
    convertDate(pattern) {
      this.event.plannedStartDate = this.formatDate(
        this.event.plannedStartDate,
        pattern
      );
      this.event.plannedEndDate = this.formatDate(
        this.event.plannedEndDate,
        pattern
      );
    }
  },
  watch: {
    universities: {
      immediate: false,
      handler() {
        const universities = this.universities.data;
        if (universities) {
          this.supplier = universities.flatMap(university => {
            return {
              value: university.universityName,
              text: university.universityName
            };
          });
        }
      }
    },
    subSubjects: {
      handler() {
        const subSubjects = this.subSubjects.data;
        if (subSubjects) {
          this.subSubject = subSubjects.flatMap(subSubject => {
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
          this.course = campuslinks.flatMap(campuslink => {
            return {
              value: campuslink.name,
              text: campuslink.name
            };
          });
        }
      }
    },
    createEventFromManual: {
      handler() {
        if (this.createEventFromManual.state.success === true) {
          this.showToast("Successful", "Succes", "success");
          this.$emit(
            "addNewSuccess",
            this.createEventFromManual.data.identifiedObject
          );
        } else if (this.createEventFromManual.state.success === false) {
          let msg = this.createEventFromManual.data.errors[0];
          this.showToast(msg, "Error", "danger");
        }
        this.convertDate("YYYY-MM-DD");
      }
    }
  }
};
</script>