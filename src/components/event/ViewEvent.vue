<template>
  <b-modal :id="id" :ref="id" :title="event.courseCode" size="lg" ok-only>
    <div>
      <div class="section section-Info">
        <div class="section-header mb-2">
          <div class="section-title flex-shrink-1 mr-3">Information</div>
          <div class="line flex-fill align-middle">
            <div class="border"></div>
          </div>
        </div>
        <div class="section-content row">
          <div class="col-12 mb-3">
            <span class="captionSubtitle">Event status</span>
            <h4>
              <span class="badge" :class="eventStatusColor(event.eventStatus)">{{event.eventStatus}}</span>
            </h4>
          </div>
          <div class="col-12 col-md-6">
            <span class="captionSubtitle">Course Name</span>
            <h4 class="font-weight-normal">{{event.courseName}}</h4>
          </div>
          <div class="col-12 col-md-6">
            <span class="captionSubtitle">Supplier/Partner</span>
            <h4 class="font-weight-normal">{{event.supplier}}</h4>
          </div>
          <div class="col-12 col-md-6">
            <span class="captionSubtitle">Subject Type</span>
            <h4 class="font-weight-normal">{{event.subjectType}}</h4>
          </div>
          <div class="col-12 col-md-6">
            <span class="captionSubtitle">Sub-Subject Type</span>
            <h4 class="font-weight-normal">{{event.subSubjectType}}</h4>
          </div>
          <div class="col-12">
            <span class="captionSubtitle">Format Type</span>
            <h4 class="font-weight-normal">{{event.formatType}}</h4>
          </div>
        </div>
      </div>
      <div class="section section-Plan-Actual mt-5">
        <div class="section-header">
          <div class="section-title flex-shrink-1 mr-3">Plan and Actual</div>
          <div class="line flex-fill align-middle">
            <div class="border"></div>
          </div>
        </div>
        <div class="section-content">
          <table class="w-100 table table-striped">
            <thead>
              <tr class="captionSubtitle">
                <td class="border-0"></td>
                <td class="text-center border-0">Plan</td>
                <td class="text-center border-0">Actual</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="captionSubtitle">Start Date</td>
                <td class="p-1 text-center">{{ formatDate(event.plannedStartDate, "DD-MMM-YYYY") }}</td>
                <td class="text-center">{{ formatDate(event.actualStartDate, "DD-MMM-YYYY") }}</td>
              </tr>
              <tr class="border-top">
                <td class="captionSubtitle">End Date</td>
                <td class="text-center">{{ formatDate(event.plannedEndDate, "DD-MMM-YYYY") }}</td>
                <td class="text-center">{{ formatDate(event.actualEndDate, "DD-MMM-YYYY") }}</td>
              </tr>
              <tr class="border-top">
                <td class="captionSubtitle">Exprese</td>
                <td class="text-center">{{event.plannedExpense}}</td>
                <td class="text-center">{{event.actualExpense}}</td>
              </tr>
              <tr class="border-top">
                <td class="captionSubtitle">NUMBER OF STUDENTS</td>
                <td class="text-center">{{event.plannedNumberOfStudents}}</td>
                <td class="text-center"></td>
              </tr>
              <tr class="border-top">
                <td class="captionSubtitle">Number of Enrolled Students</td>
                <td class="text-center"></td>
                <td class="text-center">{{event.actualNumberOfEnrolled}}</td>
              </tr>
              <tr class="border-top">
                <td class="captionSubtitle">Learning Time</td>
                <td class="text-center"></td>
                <td class="text-center">{{event.actualLearningTime}}</td>
              </tr>
              <tr class="border-top">
                <td class="captionSubtitle">Number of Traineese</td>
                <td class="text-center"></td>
                <td class="text-center">{{event.actualNumberOfTrainees}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="section section-Others mt-5">
        <div class="section-header mb-2">
          <div class="section-title flex-shrink-1 mr-3">Training Information</div>
          <div class="line flex-fill align-middle">
            <div class="border"></div>
          </div>
        </div>
        <div class="section-content row">
          <div class="col-12">
            <span class="captionSubtitle">Feedback</span>
            <h4>{{event.trainingFeedback}}</h4>
          </div>
          <div class="col-12">
            <span class="captionSubtitle">Content</span>
            <p>{{event.trainingFeedbackContent}}</p>
          </div>
          <div class="col-12">
            <span class="captionSubtitle">Teacher</span>
            <h4>{{event.trainingFeedbackTeacher}}</h4>
          </div>
          <div class="col-12">
            <span class="captionSubtitle">Orgainization</span>
            <h4>{{event.trainingFeedbackOrganization}}</h4>
          </div>
          <div class="col-12">
            <span class="captionSubtitle">Note</span>
            <p>{{ event.note }}</p>
          </div>
        </div>
      </div>
      <div class="text-right">
        <b-button variant="outline-primary" :to="`/event-info/eventId=${event.eventId}`">See more</b-button>
      </div>
    </div>
    <template slot="modal-footer" slot-scope="{ cancel }">
      <div class="d-flex justify-content-center w-100">
        <b-button @click="cancel()" variant="light">Close</b-button>
        <b-button @click="showEditFromView" variant="success" class="shadow ml-3">Edit event</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ToastMixin, EventStatusMixin } from "../mixins";

export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      default: "modalViewEvent"
    }
  },
  mixins: [ToastMixin, EventStatusMixin],
  methods: {
    showEditFromView() {
      this.$emit("showEditFromView", this.event);
    }
  }
};
</script>