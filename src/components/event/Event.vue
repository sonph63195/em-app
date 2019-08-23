<template>
  <div>
    <Header />
    <main class="mt-3">
      <b-container fluid>
        <section class="event position-relative">
          <b-row class="event-header">
            <b-col cols="12" class="mb-3 d-flex flex-column">
              <div class="main-action flex-1 d-flex flex-column flex-lg-row flex-lg-grow-0 w-100">
                <b-button
                  v-b-modal.modal-ImportEvent
                  variant="outline-success"
                  class="flex-0 btn-icon btn-import border-0 mb-3 mr-lg-3"
                >
                  <font-awesome-icon icon="calendar-alt" class="mr-3" />Import Event
                </b-button>
                <b-button v-b-modal.modal-createEvent variant="primary" class="flex-0 mb-3">
                  <font-awesome-icon icon="plus-circle" class="mr-3" />Create Event
                </b-button>
              </div>
              <div
                class="bg-white rounded-5 w-100 d-flex flex-1 flex-lg-grow-1 align-self-center mt-3 mt-lg-0"
              >
                <div class="checkAll flex-lg-grow-0 ml-3 align-self-center">
                  <b-form-checkbox v-model="checkedAll">All</b-form-checkbox>
                </div>
                <div class="filter flex-fill">
                  <!-- <b-dd text="Event Status" size="sm" variant="white" class="m-2">
                    <b-dropdown-form>
                      <b-form-checkbox
                        v-for="status in statuses"
                        :key="status.value"
                      >{{ status.text }}</b-form-checkbox>
                    </b-dropdown-form>
                  </b-dd>
                  <b-dd text="Subject Type" size="sm" variant="white" class="m-2">
                    <b-dropdown-form>
                      <b-form-checkbox
                        v-for="(sub_subject) in subSubject"
                        :key="sub_subject.value"
                        class="text-truncate"
                      >{{ sub_subject.text }}</b-form-checkbox>
                    </b-dropdown-form>
                  </b-dd>
                  <b-dd text="Start Date" size="sm" variant="white" class="m-2">
                    <b-dropdown-form>
                      <b-form-input type="date" />
                    </b-dropdown-form>
                  </b-dd>
                  <b-dd text="End Date" size="sm" variant="white" class="m-2">
                    <b-dropdown-form>
                      <b-form-input type="date" />
                    </b-dropdown-form>
                  </b-dd>-->
                </div>
              </div>
            </b-col>
          </b-row>

          <!-- Content -->
          <EventContent
            :checkedAll="checkedAll"
            v-on:getEvents="getEvents"
            v-on:removeEvent="removeEvent"
            ref="eventList"
          />
          <!-- End content -->

          <b-row class="fixed-bottom sticky-top mx-0 bg-white rounded-5 pt-3 border-top">
            <b-col cols="12" class>
              <div class="d-flex flex-column flex-md-row">
                <div class="flex-fill">
                  <b-button @click="showRemoveEventOnList" variant="light">
                    <font-awesome-icon icon="trash" class="mr-3" />Cancel Event
                  </b-button>
                </div>
                <div class="mt-3 mt-md-0 align-self-center">
                  <b-pagination-nav :link-gen="linkGen" :number-of-pages="pageNumber" use-router></b-pagination-nav>
                </div>
              </div>
            </b-col>
          </b-row>
        </section>
      </b-container>
    </main>

    <!-- Modal Import Event -->
    <b-modal id="modal-ImportEvent" header-border-variant="0" footer-border-variant="0">
      <template slot="modal-header" slot-scope="{ close }">
        <h5 class="modal-title" id="modalImportEventTitle">Import Event</h5>
        <b-button
          @click="close()"
          class="close"
          variant="link"
          aria-label="Close"
          data-dismiss="modal"
        >
          <span aria-hidden="true">×</span>
        </b-button>
      </template>
      <b-container fluid>
        <b-row class="border border-dashed border-3">
          <b-col cols="12" class="text-center p-0">
            <b-form class="box">
              <DragDropFile
                v-on:fileAddedEvent="fileAddedEvent"
                v-on:removedFileEvent="removedFileEvent"
              />
            </b-form>
          </b-col>
        </b-row>
        <b-row v-if="workbook && workbook.SheetNames">
          <b-col class="overflow-auto mt-3 w-100 p-0">
            <div v-if="readFile">Loading...</div>
            <h5>Choose your sheet</h5>
            <b-list-group horizontal>
              <b-list-group-item
                v-for="name in workbook.SheetNames"
                :key="name"
                href="#"
                class="flex-column align-items-start"
                @click="convertJson(name)"
              >
                <span>{{name}}</span>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-container>
      <template slot="modal-footer" slot-scope="{ cancel }">
        <div class="d-flex justify-content-center w-100">
          <b-button @click="cancel()" variant="light">Cancel</b-button>
          <b-button @click="processImport" variant="success" class="shadow ml-3">Import</b-button>
        </div>
      </template>
    </b-modal>

    <!-- Modal Create Event -->
    <CreateEvent />

    <!-- Modal Confirm before remove -->
    <PopupMessage
      id="removeEvents"
      type="warning"
      ref="modalRemoveEvents"
      v-on:action="removeEventList"
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
  </div>
</template>

<script>
import Header from "../header/Header";
import EventContent from "./EventContent";
import DragDropFile from "../utils/DragDropFile";
import PopupMessage from "../utils/PopupMessage";
import CreateEvent from "./CreateEvent";

import { PopupMixin, ToastMixin } from "../mixins";

export default {
  components: {
    Header,
    EventContent,
    DragDropFile,
    PopupMessage,
    CreateEvent
  },
  mixins: [PopupMixin, ToastMixin],
  data() {
    return {
      checkedAll: false,
      file: null,
      statuses: [
        { value: "Active", text: "Active" },
        { value: "Finish", text: "Finish" },
        { value: "On-going", text: "On-going" },
        { value: "Cancel", text: "Cancel" }
      ],
      course: [],
      subSubject: [],
      eventsRemove: null,
      pageNumber: 1
    };
  },
  created() {
    // When component was created, just get page number, default page number = 1. and redirect page to page=1
    // After that will call event list with page number.
    let pageNumber = this.$route.params.page;
    this.getEvents(pageNumber);
    // some params
    this.getSupplier();
    this.getSubSubjectType();
    this.getCampuslink();
    this.getEventStatus();
  },
  watch: {
    cancelEventState: {
      handler() {
        //let eventIds = this.eventsRemove.flatMap(event => event.eventId);
        if (this.cancelEventState.success) {
          this.checkedAll = false;
          this.eventsRemove.forEach(event => {
            event.eventStatus = "Cancel";
            event.isChosen = this.checkedAll;
          });
        } else if (this.cancelEventState.success === false) {
          // show error
          this.showToast(
            "Cannot cancel event. Please try again",
            "Error",
            "danger"
          );
          return;
        }
        // close confirm popup
        this.hidePopup("modalRemoveEvents", "removeEvents");
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
    eventStatus: {
      handler() {
        let num = 1;
        if (this.eventStatus) {
          Object.values(this.eventStatus).forEach(el => (num += el));
          this.pageNumber = Math.floor(num / 10);
          if (num % 10 !== 0) this.pageNumber += 1;
        }
      }
    }
  },
  computed: {
    /**
     * Get read file state
     */
    readFile() {
      return this.$store.state.file.status.reading;
    },

    /**
     * get Workbook from file store
     */
    workbook() {
      return this.$store.state.file.workbook;
    },

    /**
     * get data was converted into JSON from file store
     */
    dataJsonRequest() {
      return this.$store.state.file.data;
    },

    /**
     *
     */
    cancelEventState() {
      return this.$store.state.event.cancelEvent;
    },

    /**
     *
     */
    subSubjects() {
      return this.$store.state.subject.getSubSubject;
    },
    eventStatus() {
      return this.$store.state.home.eventStatus.data;
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
    },
    /**
     * Get All number of event
     */
    getEventStatus() {
      this.$store.dispatch("home/getEventStatus");
    },
    /**
     * File added Event when user drag or choose a file
     */
    fileAddedEvent() {
      const dropzone = document.getElementById("dropzone").dropzone;
      this.file = dropzone.files[0];
      if (this.file !== null) {
        this.readExcelFile();
      }
    },

    /**
     * processImport is called request to send data to server
     */
    processImport() {
      // const dropzone = document.getElementById("dropzone").dropzone;
      // this.file = dropzone.files[0];
      //console.log(dropzone.getQueuedFiles());
    },

    /**
     * removedFileEvent is called when remove file from dragzone
     *
     * @param object {file, error, xhr}
     */
    removedFileEvent(param) {
      this.file = null;
      const { dispatch } = this.$store;
      dispatch("file/removeFile");
      // eslint-disable-next-line
      console.log(param.error);
    },

    /**
     * Read file excel
     */
    readExcelFile() {
      const { dispatch } = this.$store;
      dispatch("file/readingFile", this.file);
    },

    /**
     * When file was read. User choose sheet that convert data into object to send it to server (after validate).
     *
     * @param String sheetName
     */
    convertJson(sheetName) {
      // find worksheet by sheetName in workbook(was read in excel file).
      let worksheet = this.workbook.Sheets[sheetName];
      // send worksheet to service throught file store
      const { dispatch } = this.$store;
      dispatch("file/convertJson", worksheet);
    },

    /**
     * This method will open Confirm Modal(id="modalPopUp") by click to "Remove Select All" button
     * And get the events list is chosen, that list will be assigned for eventsRemove
     *
     * @returns void
     */
    showRemoveEventOnList() {
      this.eventsRemove = this.$refs.eventList.events.filter(
        event => event.isChosen
      );
      if (this.eventsRemove.length <= 0) return;
      // open confirm pop up
      //this.$refs.modalRemoveEvents.$bvModal.show("removeEvents");
      this.showPopup("modalRemoveEvents", "removeEvents");
    },

    /**
     * This method is called by Event-content component, and parameter is an array that has only one element that is event object(JSON)
     * need to remove (change status into Cancel). And then show Confirm Modal(id="modalPopUp") for confirm before remove.
     *
     * @param Array events list
     */
    removeEvent(events) {
      this.eventsRemove = events;
      if (this.removeEvent.length <= 0) return;
      // show confirm pop up
      this.showPopup("modalRemoveEvents", "removeEvents");
    },

    /**
     *
     */
    removeEventList() {
      // eslint-disable-next-line
      //console.log(this.eventsRemove);
      let eventIds = this.eventsRemove.flatMap(event => event.eventId);
      this.$store.dispatch("event/cancelEvent", eventIds);
    },

    /**
     * This method will call a store action (event store), to get data event list from database. Each page response
     * 10 elements.
     *
     * @param int pageNumber
     */
    getEvents(pageNumber) {
      this.$store.dispatch("event/getEvent", pageNumber);
    },

    /**
     * This method will set pageNumber and push page in address bar
     *
     * @param int number - a number in pagination
     */
    paginPage(pageNum) {
      this.$router.push(this.linkGen(pageNum));
    },

    /**
     *
     */
    linkGen(pageNum) {
      return {
        name: "eventPage",
        params: { page: pageNum }
      };
    }
  }
};
</script>
