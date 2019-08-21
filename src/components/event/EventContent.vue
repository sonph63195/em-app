<template>
  <b-row>
    <b-col v-if="getEventLoading.loading" cols="12">
      <div class="bg-white rounded-5 mb-3 p-3 text-center">
        <b-spinner style="width: 3rem; height: 3rem;" label="Loading"></b-spinner>
      </div>
    </b-col>

    <b-col cols="12">
      <b-card
        no-body
        v-for="event in events"
        :key="event.eventId"
        :id="event.eventId"
        class="border-0 mb-3"
      >
        <div class="d-block d-lg-flex align-self-stretch align-items-center">
          <div class="d-lg-flex course-code flex-fill">
            <div class="align-self-lg-center pl-3">
              <b-form-checkbox
                v-model="event.isChosen"
                :disabled="eventIsDoneOrCancel(event.eventStatus)"
              />
            </div>
            <div class="flex-fill p-3">
              <span class="captionSubtitle">Course code</span>
              <div class="title text-truncate">{{ event.courseCode }}</div>
              <span class="badge mt-2" :class="eventStatusColor(event.eventStatus)">
                <h5 class="mb-0">{{ event.eventStatus }}</h5>
              </span>
            </div>
          </div>
          <div class="d-block px-3 pb-3 time">
            <table class="w-100">
              <tr class="captionSubtitle">
                <td></td>
                <td class="text-center">Plan</td>
                <td class="text-center">Actual</td>
              </tr>
              <tr>
                <td class="captionSubtitle">Start</td>
                <td class="p-1 text-center">{{ formatDate(event.plannedStartDate, "DD-MMM-YYYY") }}</td>
                <td class="p-1 text-center">{{ formatDate(event.actualStartDate, "DD-MMM-YYYY") }}</td>
              </tr>
              <tr class="border-top">
                <td class="captionSubtitle">End</td>
                <td class="p-1 text-center">{{ formatDate(event.plannedEndDate, "DD-MMM-YYYY") }}</td>
                <td class="p-1 text-center">{{ formatDate(event.actualEndDate, "DD-MMM-YYYY") }}</td>
              </tr>
            </table>
          </div>
          <div class="d-block px-3 pb-3">
            <div>
              <span class="captionSubtitle">Course name</span>
              <div>{{ event.courseName }}</div>
            </div>
            <div>
              <span class="captionSubtitle">Sub-subject Type</span>
              <div class="text-wrap">{{ event.subSubjectType }}</div>
            </div>
          </div>
          <div class="d-block px-3 pb-3 site-supplier">
            <div>
              <span class="captionSubtitle">site</span>
              <div>{{ event.site }}</div>
            </div>
            <div>
              <span class="captionSubtitle">SUPPLIER</span>
              <div class="text-wrap">{{ event.supplier }}</div>
            </div>
          </div>
          <div class="event-action mt-3 mt-lg-0 mr-0 mr-lg-3">
            <div>
              <div class="d-flex flex-lg-column">
                <div class="d-flex flex-fill">
                  <div class="flex-fill">
                    <b-button
                      v-b-tooltip.hover
                      title="View event's info"
                      @click="viewEventInfo(event)"
                      variant="light"
                      block
                    >
                      <font-awesome-icon icon="eye" />
                    </b-button>
                  </div>
                  <div class="flex-fill">
                    <b-button
                      v-b-tooltip.hover
                      title="Edit event's info"
                      @click="editEvent(event)"
                      variant="light"
                      block
                    >
                      <font-awesome-icon icon="edit" />
                    </b-button>
                  </div>
                  <div class="flex-fill">
                    <b-button
                      @click="showCandidateList(event)"
                      v-b-tooltip.hover
                      title="View candidate list"
                      variant="light"
                      block
                    >
                      <font-awesome-icon icon="users" />
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-card>
    </b-col>
    <EditEvent id="modalEditEvent" ref="popupEditEvent" :event="currentEvent" />
    <ViewEvent
      id="modalViewEvent"
      ref="popupViewEvent"
      v-on:showEditFromView="editEvent"
      :event="currentEvent"
    />
    <EventCandidateList
      v-bind:eventId="candidateList.eventId"
      v-bind:courseCode="candidateList.courseCode"
      v-bind:actualNumberOfTrainees="candidateList.actualNumberOfTrainees"
    />
  </b-row>
</template>


<script>
import EventCandidateList from "./EventCandidateList";
import EditEvent from "./EditEvent";
import ViewEvent from "./ViewEvent";
import { EventStatusMixin, PopupMixin } from "../mixins";

/* eslint-disable */
export default {
  props: {
    checkedAll: Boolean
  },
  components: {
    EditEvent,
    ViewEvent,
    EventCandidateList
  },
  mixins: [EventStatusMixin, PopupMixin],
  data() {
    return {
      currentEvent: {},
      candidateList: {
        eventId: "",
        courseCode: "",
        actualNumberOfTrainees: ""
      }
    };
  },
  computed: {
    getEventLoading() {
      let storeEvent = this.$store.state.event;
      let load = {
        loading: storeEvent.getEvent.loading,
        loaded: storeEvent.getEvent.loaded
      };
      return load;
    },
    events() {
      return this.$store.state.event.events;
    }
  },
  watch: {
    checkedAll: {
      handler() {
        this.events
          .filter(
            event =>
              event.eventStatus !== "Done" && event.eventStatus !== "Cancel"
          )
          .forEach(event => {
            event.isChosen = this.checkedAll;
          });
      }
    }
  },
  methods: {
    /**
     *
     */
    viewEventInfo(event) {
      this.currentEvent = event;
      this.$bvModal.show("modalViewEvent");
    },
    editEvent(event) {
      this.currentEvent = event;
      this.$bvModal.show("modalEditEvent");
    },
    showCandidateList(event) {
      this.candidateList.eventId = event.eventId;
      this.candidateList.actualNumberOfTrainees = event.actualNumberOfTrainees;
      this.candidateList.courseCode = event.courseCode;
      //
      this.$bvModal.show("candidateList");
    }
  }
};
</script>
