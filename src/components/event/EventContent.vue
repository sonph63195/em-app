<template>
  <b-row class="event-content">
    <b-col v-if="getEventLoading.loading" cols="12" class="bg-white rounded-5 mb-3 p-3 text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading"></b-spinner>
    </b-col>
    <b-col
      v-if="!getEventLoading.loaded && (!getEventLoading.loading && events.length <= 0)"
      cols="12"
      class="alert alert-info border-0 rounded-5 mb-3 p-3 text-center"
    >Oops~ It's empty. Let's get back later.</b-col>
    <b-col
      cols="12"
      v-for="(event, index) in events"
      :key="index"
      class="event-item bg-white rounded-5 flex-column flex-xl-row d-flex mb-3"
    >
      <div class="flex-fill flex-row d-flex py-3 mr-lg-3">
        <div class="event-checkbox align-self-lg-center mr-3">
          <b-form-checkbox
            v-model="event.isChosen"
            :disabled="eventIsDoneOrCancel(event.eventStatus)"
          ></b-form-checkbox>
        </div>
        <div
          class="event-title align-self-lg-center flex-grow-1 flex-column flex-sm-row flex-lg-column d-flex text-wrap"
        >
          <div class="captionSubtitle d-none d-lg-block">Course code:</div>
          <div
            class="title d-inline-block text-truncate w-100"
            v-b-tooltip.hover
            :title="event.courseCode"
          >{{ event.courseCode }}</div>
          <div class="event-status">
            <span class="badge" :class="eventStatusColor(event.eventStatus)">{{ event.eventStatus }}</span>
          </div>
        </div>
      </div>
      <div class="event-content flex-lg-row d-lg-flex">
        <div
          class="flex-1 d-flex flex-row flex-lg-column mt-lg-3 ml-md-2 mb-3 align-self-lg-center"
        >
          <div class="flex-1 w-50 w-lg-100">
            <div class="captionSubtitle text-truncate flex-0">Site:</div>
            <div class="subtitle flex-0">{{ event.site }}</div>
          </div>
          <div class="flex-1 w-50 w-lg-100">
            <div class="captionSubtitle text-truncate flex-0">Supplier/Partner:</div>
            <div class="subtitle text-wrap w-100 flex-0">{{ event.supplier }}</div>
          </div>
        </div>
        <div
          class="flex-1 d-flex flex-row flex-lg-column mt-lg-3 ml-md-2 mb-3 align-self-lg-center"
        >
          <div class="flex-1 w-50 w-lg-100">
            <div class="captionSubtitle text-truncate flex-0">Course Name:</div>
            <div class="subtitle flex-0">{{ event.courseName }}</div>
          </div>
          <div class="flex-1 w-50 w-lg-100">
            <div class="captionSubtitle text-truncate flex-0">Subject Type:</div>
            <div class="subtitle flex-0">{{ event.subjectType }}</div>
          </div>
        </div>
        <div
          class="flex-1 d-flex flex-row flex-lg-column mt-lg-3 ml-md-2 mb-3 align-self-lg-center"
        >
          <div class="flex-1 w-50 w-lg-100">
            <div class="captionSubtitle text-truncate flex-0">Planned Start date:</div>
            <div class="subtitle flex-0">{{ event.plannedStartDate }}</div>
          </div>
          <div class="flex-1 w-50 w-lg-100">
            <div class="captionSubtitle text-truncate flex-0">Planned End Date:</div>
            <div class="subtitle flex-0">{{ event.plannedEndDate }}</div>
          </div>
        </div>
        <div class="flex-1 d-flex flex-row mt-lg-3 mb-3 align-self-lg-center">
          <div class="flex-1 w-50 w-lg-100">
            <div class="captionSubtitle text-truncate text-center w-100 flex-0">Candidates:</div>
            <div class="subtitle flex-0 text-center">{{ event.actualNumberOfTrainees }}</div>
          </div>
          <div class="flex-0 w-50 align-self-center text-center">
            <div class="event-action">
              <b-button
                v-b-tooltip.hover
                title="View event's information"
                pill
                class="btn-icon m-1"
                @click="viewEventInfo(event)"
                variant="light"
              >
                <font-awesome-icon icon="eye" />
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>


<script>
import { EventStatusMixin } from "../mixins";

/* eslint-disable */
export default {
  props: {
    checkedAll: Boolean
  },
  mixins: [EventStatusMixin],
  data() {
    return {};
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
    getEvents(pageNumber) {
      this.$emit("getEvents", pageNumber);
    },

    /**
     *
     */
    removeEvent(index) {
      this.$emit("removeEvent", [this.events[index]]);
    },

    /**
     *
     */
    viewEventInfo(event) {
      // Save event in local storage
      const eventParsed = JSON.stringify(event);
      localStorage.setItem("event", eventParsed);
      this.$router.push(`/event-info/eventId=${event.eventId}`);
    }
  }
};
</script>
