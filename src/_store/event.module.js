import { eventService } from "../_service"

export const event = {
    namespaced: true,
    state: {
        events: [],
        event: {},
        eventsCalendar: [],
        getEvent: { loading: false },
        cancelEvent: { loading: false },
        getEventById: { loading: false },
        updateEvent: { updating: false },
        eventRecent: {
            state: { loading: false },
            data: []
        },
        eventsMonth: {
            state: { loading: false }
        },
        eventsWeek: {
            state: { loading: false }
        },
        createEventFromManual: {
            state: { loading: false },
            data: {}
        },
        loadAllCourseCode: {
            state: { loading: false },
            data: []
        }
    },
    mutations: {
        /**
         * 
         * @param {*} state 
         */
        getEventRequest(state) {
            state.getEvent = { loading: true }
            state.events = [];
        },
        getEventSuccess(state, events) {
            state.getEvent = { loaded: true }
            state.events = events;
        },
        getEventFailure(state) {
            state.getEvent = { loaded: false }
        },

        /**
         * 
         * @param {*} state 
         */
        cancelEventRequest(state) {
            state.cancelEvent = { loading: true }
        },
        cancelEventSuccess(state) {
            state.cancelEvent = { success: true }
        },
        cancelEventFailure(state, status) {
            state.cancelEvent = { success: false, status: status }
        },

        /**
         * 
         * @param {*} state 
         */
        getEventByIdRequest(state) {
            state.getEventById = { loading: true }
        },
        getEventByIdSuccess(state, event) {
            state.getEventById = { loaded: true };
            state.event = event;
        },
        getEventByIdFailure(state) {
            state.getEventById = { loaded: false }
        },

        /**
         * 
         * @param {*} state 
         */
        updateEventRequest(state) {
            state.updateEvent = { updating: true }
        },
        updateEventSuccess(state, event) {
            state.updateEvent = { updated: true, data: event }
        },
        updateEventFailure(state, error) {
            state.updateEvent = { updated: false, data: error }
        },

        /**
         * 
         * @param {*} state 
         */
        eventRecentRequest(state) {
            state.eventRecent = {
                state: { loading: true }
            }
        },
        eventRecentSuccess(state, eventRecent) {
            state.eventRecent = {
                state: { loaded: true },
                data: eventRecent
            }
        },
        eventRecentFailure(state) {
            state.eventRecent = {
                state: { loaded: false }
            }
        },

        /**
         * 
         * @param {*} state 
         */
        eventsMonthRequest(state) {
            state.eventsMonth = {
                state: { loading: true }
            }
        },
        eventsMonthSuccess(state, events) {
            state.eventsMonth = {
                state: { loaded: true },
            }
            state.eventsCalendar = events;
        },
        eventsMonthFailure(state) {
            state.eventsMonth = {
                state: { loaded: false }
            }
        },

        /**
         * 
         * @param {*} state 
         */
        eventsWeekRequest(state) {
            state.eventsWeek = {
                state: { loading: true }
            }
        },
        eventsWeekSuccess(state, events) {
            state.eventsWeek = {
                state: { loaded: true }
            }
            state.eventsCalendar = events;
        },
        eventsWeekFailure(state) {
            state.eventsWeek = {
                state: { loaded: false }
            }
        },

        /**
         * 
         * @param {*} state 
         */
        createEventFromManualRequest(state) {
            state.createEventFromManual = {
                state: { loading: true }
            }
        },
        createEventFromManualSuccess(state, data) {
            state.createEventFromManual = {
                state: { success: true },
                data: data
            }
        },
        createEventFromManualFailure(state, error) {
            state.createEventFromManual = {
                state: { success: false },
                data: error
            }
        },

        /**
         * 
         * @param {*} state 
         */
        loadAllCourseCodeRequest(state) {
            state.loadAllCourseCode = {
                state: { loading: true }
            }
        },
        loadAllCourseCodeSuccess(state, data) {
            state.loadAllCourseCode = {
                state: { loaded: true },
                data: data
            }
        },
        loadAllCourseCodeFalure(state, error) {
            state.loadAllCourseCode = {
                state: { loaded: false },
                data: error
            }
        },
    },
    actions: {
        getEvent({ commit }, pageNumber) {
            commit("getEventRequest");
            eventService.getEventList(pageNumber).then(success => {
                let events = success.body;
                commit("getEventSuccess", events);
            }, error => {
                commit("getEventFailure");
                // eslint-disable-next-line no-console
                console.error(error);
            })
        },

        getEventById({ commit }, eventId) {
            commit("getEventByIdRequest");
            eventService.getEventById(eventId).then(success => {
                commit("getEventByIdSuccess", success.body);
            }, error => {
                commit("getEventByIdFailure");
                // eslint-disable-next-line 
                console.log(error);
            });
        },

        cancelEvent({ commit }, eventIds) {
            commit("cancelEventRequest");
            eventService.cancelEvent(eventIds).then(() => {
                commit("cancelEventSuccess");
            }, error => {
                commit("cancelEventFailure", error.status);
                // eslint-disable-next-line no-console
                console.error(error);
            });
        },

        updateEvent({ commit }, event) {
            commit("updateEventRequest");
            eventService.updateEvent(event).then(success => {

                if (success.body.status === "200") {
                    commit("updateEventSuccess", success.body);
                } else {
                    commit("updateEventFailure", success.body);
                }
            }, error => {
                commit("updateEventFailure", error.body);

            })
        },

        eventRecent({ commit }) {
            commit("eventRecentRequest");
            eventService.eventRecent().then(success => {
                commit("eventRecentSuccess", success.body);
            }, error => {
                commit("eventRecentFailure");
                // eslint-disable-next-line no-console
                console.log(error);
            })
        },

        eventsMonth({ commit }, { year, month }) {
            commit("eventsMonthRequest");
            eventService.getEventsMonth(year, month).then(success => {
                commit("eventsMonthSuccess", success.body);
            }, () => {
                commit("eventsMonthFailure");
            })
        },

        eventsWeek({ commit }, { startDate, endDate }) {
            commit("eventsWeekRequest");
            eventService.getEventsWeek(startDate, endDate).then(success => {
                commit("eventsWeekSuccess", success.body);
            }, () => {
                commit("eventsWeekFailure");
            })
        },

        createEventFromManual({ commit }, { event }) {
            commit("createEventFromManualRequest");
            eventService.createEventFromManual(event).then(success => {
                if (success.body.status === "200") {
                    commit("createEventFromManualSuccess", success.body);
                } else {
                    commit("createEventFromManualFailure", success.body);
                }
            }, error => {
                commit("createEventFromManualFailure", error);
                // eslint-disable-next-line no-console
                console.log(error);
            })
        },

        loadAllCourseCode({ commit }) {
            commit("loadAllCourseCodeRequest");
            eventService.loadAllCourseCode().then(success => {
                commit("loadAllCourseCodeSuccess", success.body);
            }, error => {
                commit("loadAllCourseCodeFailure", error.body)
            })
        },
    }
}