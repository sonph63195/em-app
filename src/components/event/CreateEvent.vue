<template>
  <b-modal id="modal-createEvent" size="lg" title="Create New Event" ok-title="Save">
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
              <label for="site">Site:</label>
              <b-form-select id="site" v-model="site.selected" :options="site.options"></b-form-select>
            </div>
            <div class="form-group">
              <label for="year">Year:</label>
              <b-form-select id="year" v-model="year.selected" :options="year.options"></b-form-select>
            </div>
            <div class="form-group">
              <label for="course">Course Name:</label>
              <b-form-select
                id="course"
                v-model="course.selected"
                :options="course.options"
                :disabled="campuslinks.state.loaded !== true"
              ></b-form-select>
            </div>
            <div class="form-group">
              <label for="supplier">Supplier/Partner:</label>
              <b-form-select
                id="supplier"
                v-model="supplier.selected"
                :options="supplier.options"
                :disabled="universities.state.loaded !== true"
              ></b-form-select>
            </div>
          </div>
          <div class="col-12">
            <div class="d-flex">
              <div class="flex-fill pr-2">
                <div class="form-group">
                  <label for="subject">Subject Type:</label>
                  <b-form-select id="subject" v-model="subject.selected" :options="subject.options"></b-form-select>
                </div>
              </div>
              <div class="flex-fill pl-2">
                <div class="form-group">
                  <label for="subSubject">Sub-Subject Type:</label>
                  <b-form-select
                    id="subSubject"
                    v-model="subSubject.selected"
                    :options="subSubject.options"
                    :disabled="subSubjects.state.loaded !== true"
                  ></b-form-select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label for="format">Format Type:</label>
              <b-form-select id="format" v-model="format.selected" :options="format.options"></b-form-select>
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
                  <b-form-input id="planStartDate" type="date"></b-form-input>
                </div>
              </div>
              <div class="flex-fill pl-2">
                <div class="form-group">
                  <label for="planEndDate">Plan end date:</label>
                  <b-form-input id="planEndDate" type="date"></b-form-input>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="d-flex">
              <div class="flex-fill pr-2">
                <div class="form-group">
                  <label for="planLearningTime">Plan learning time: (hrs)</label>
                  <b-form-input id="planLearningTime" type="number"></b-form-input>
                </div>
              </div>
              <div class="flex-fill pl-2">
                <div class="form-group">
                  <label for="planNumberStudents">Plan number of Students:</label>
                  <b-form-input id="planNumberStudents" type="number"></b-form-input>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="d-flex">
              <div class="flex-fill pr-2">
                <div class="form-group">
                  <label for="planExprese">Plan Exprese:</label>
                  <b-form-input id="planExprese" type="text"></b-form-input>
                </div>
              </div>
              <div class="flex-fill pl-2">
                <div class="form-group">
                  <label for="budget">Budget:</label>
                  <b-form-input id="budget" type="text"></b-form-input>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label for="note">Note:</label>
              <b-form-textarea id="note" v-model="note" placeholder="Enter something..." size="lg"></b-form-textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
  </b-modal>
</template>
<script>
export default {
  mounted() {
    this.getSupplier();
    this.getSubSubjectType();
    this.getCampuslink();
  },
  data() {
    return {
      site: {
        selected: "HCM",
        options: [
          { value: "HCM", text: "HCM - Ho Chi Minh City" },
          { value: "HN", text: "HN - Ha Noi City" },
          { value: "DN", text: "DN - Da Nang City" }
        ]
      },
      year: {
        selected: "2019",
        options: [
          { value: "2019", text: "2019" },
          { value: "2020", text: "2020" },
          { value: "2021", text: "2021" }
        ]
      },
      course: {
        selected: "FSOFT TOUR",
        options: []
      },
      supplier: {
        selected: "ĐH FPT",
        options: []
      },
      subject: {
        selected: "IT Technical",
        options: [{ value: "IT Technical", text: "IT Technical" }]
      },
      subSubject: {
        selected: "NET",
        options: []
      },
      format: {
        selected: "Blended",
        options: [
          { value: "Blended", text: "Blended" },
          { value: "Offline", text: "Offline" }
        ]
      },
      note: ""
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
    }
  },
  methods: {
    getSupplier() {
      this.$store.dispatch("supplier/getSupplier");
    },
    getSubSubjectType() {
      this.$store.dispatch("subject/getSubSubject");
    },
    getCampuslink() {
      this.$store.dispatch("campuslink/getCampuslink");
    }
  },
  watch: {
    universities: {
      immediate: false,
      handler() {
        const universities = this.universities.data;
        if (universities) {
          this.supplier.options = universities.flatMap(university => {
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
          this.subSubject.options = subSubjects.flatMap(subSubject => {
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
          this.course.options = campuslinks.flatMap(campuslink => {
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