<template>
  <div class="calendar-show position-relative">
    <div class="mb-3 d-flex">
      <div class="d-flex align-items-stretch flex-fill">
        <b-dropdown
          pill
          id="dropdown-CalendarView"
          text="View as"
          variant="outline-dark"
          class="m-md-2"
        >
          <b-dropdown-item :active="options.view === 'week'" @click="changeView('week')">
            <font-awesome-icon icon="th-large" class="mr-3" />View as Week
          </b-dropdown-item>
          <b-dropdown-item :active="options.view === 'month'" @click="changeView('month')">
            <font-awesome-icon icon="th" class="mr-3" />View as Month
          </b-dropdown-item>
        </b-dropdown>

        <div class="align-self-center ml-3">
          <b-button @click="calPrev" variant="outline-dark" pill>
            <font-awesome-icon icon="chevron-left" />
          </b-button>
        </div>
        <div @click="calNext" class="align-self-center ml-3">
          <b-button variant="outline-dark" pill>
            <font-awesome-icon icon="chevron-right" />
          </b-button>
        </div>
        <div class="align-self-center ml-3">
          <span ref="renderText" class="h3"></span>
        </div>
      </div>
    </div>
    <div
      v-if="loading"
      class="d-flex fixed-bottom sticky-top position-absolute justify-content-center align-items-center"
    >
      <b-spinner variant="dark" label="Loading..."></b-spinner>
    </div>
    <calendar
      :view="options.view"
      :calendars="calendarList"
      :schedules="schedules"
      :taskView="false"
      :disableClick="true"
      :disableDblClick="true"
      :isReadOnly="true"
      :scheduleView="true"
      :usageStatistics="false"
      @mounted="onMounted"
      ref="calendar"
      style="height: 550px;"
    />
    <div class="text-muted my-2 d-none">
      <font-awesome-icon icon="lightbulb" />&nbsp;Double click in calendar to create new event.
    </div>
    <div class="heper d-flex mt-3 border-top">
      <span class="badge badge-primary m-2">Planning</span>
      <span class="badge badge-success m-2">On-going</span>
    </div>
  </div>
</template>

<script>
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import Calendar from "@toast-ui/vue-calendar/src/Calendar.vue";

export default {
  components: {
    calendar: Calendar
  },
  mounted() {
    this.onMounted();
    this.getEvents();
  },
  data() {
    return {
      loading: true,
      calendar: null,
      options: {
        view: "week",
        month: {
          visibleWeeksCount: 6,
          startDayOfWeek: 1
        }
      },
      calendarList: [
        {
          id: "0",
          name: "Planning"
        }
      ],
      schedules: []
    };
  },
  computed: {
    events() {
      return this.$store.state.event.eventsCalendar;
    },
    eventsCalendarState() {
      const m = this.$store.state.event.eventsMonth.state;
      const w = this.$store.state.event.eventsWeek.state;
      return {
        m: m,
        w: w
      };
    }
  },
  watch: {
    eventsCalendarState: {
      immediate: true,
      handler() {
        this.schedules = [];
        this.events.forEach(event => {
          if (
            event.eventStatus !== "Finish" &&
            event.eventStatus !== "Cancel"
          ) {
            let a = {
              id: event.eventId,
              calendarId: event.eventId,
              title: event.courseCode,
              category: "time",
              dueDateClass: "",
              color: "#f8f9fa",
              bgColor: this.getColor(event.eventStatus),
              borderColor: "#343a40",
              start: this.getDate(event, "start"),
              end: this.getDate(event, "end")
            };
            this.schedules.push(a);
          }
        });
        this.loading =
          this.eventsCalendarState.m.loading ||
          this.eventsCalendarState.w.loading;
      }
    }
  },
  methods: {
    onMounted() {
      this.calendar = this.$refs.calendar.calendarInstance;
      this.calRenderText();
      this.loading = false;
    },
    calNext() {
      this.calendar.next();
      this.calRenderText();
      this.getEvents();
    },
    calPrev() {
      this.calendar.prev();
      this.calRenderText();
      this.getEvents();
    },
    calRenderText() {
      const renderText = this.$refs.renderText;
      //const options = this.calendar.getOptions();
      const html = [];

      if (this.options.view === "month") {
        const time = this.calendar.getDate().getTime();
        html.push(this.formatDate(time, "YYYY.MM"));
      } else {
        const startTime = this.calendar.getDateRangeStart().getTime();
        const endTime = this.calendar.getDateRangeEnd().getTime();
        html.push(this.formatDate(startTime, "YYYY.MM.DD"));
        html.push(" ~ ");
        html.push(this.formatDate(endTime, "MM.DD"));
      }
      renderText.innerHTML = html.join("");
    },
    getColor(status) {
      let result = "";
      switch (status) {
        case "Done":
          result += "#ffc107";
          break;
        case "Cancel":
          result += "#dc3545";
          break;
        case "On-going":
          result += "#28a745";
          break;
        default:
          // Planning
          result += "#007bff";
      }
      return result;
    },
    changeView(type) {
      this.options.view = type;
      this.calRenderText();
      this.getEvents();
    },
    getDate(event, time) {
      if (time === "start") {
        return this.formatDate(event.actualStartDate, "");
      } else {
        return this.formatDate(event.actualEndDate, "");
      }
    },
    getEvents() {
      if (this.options.view === "month") {
        const year = this.formatDate(this.calendar.getDate().getTime(), "YYYY");
        const month = this.formatDate(this.calendar.getDate().getTime(), "MM");
        this.$store.dispatch("event/eventsMonth", { year, month });
      } else {
        const startDate = this.formatDate(
          this.calendar.getDateRangeStart().getTime(),
          "YYYY-MM-DD"
        );
        const endDate = this.formatDate(
          this.calendar.getDateRangeEnd().getTime(),
          "YYYY-MM-DD"
        );
        this.$store.dispatch("event/eventsWeek", { startDate, endDate });
      }
    }
  }
};
</script>
