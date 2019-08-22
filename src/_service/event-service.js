import { request, authHeader } from "../_helper"

export const eventService = {
    getEventList,
    getEventById,
    cancelEvent,
    updateEvent,
    eventRecent,
    getEventsMonth,
    getEventsWeek,
    createEventFromManual,
    loadAllCourseCode
}

/**
 * Get a event list from database 
 * @param {int} pageNumber Page number to send to get list on paginate
 */
function getEventList(pageNumber) {
    return request.get(`events/${pageNumber}`, authHeader.get());
}

/**
 * 
 * @param {*} eventId
 */
function getEventById(eventId) {
    return request.get(`event?eventId=${eventId}`, authHeader.get());
}

/**
 *  
 * @param {Array} eventIds 
 */
function cancelEvent(eventIds) {
    let url = "";
    eventIds.forEach(id => {
        url += `eventId=${id}&`
    });
    return request.patch(`events?${url}`, null, authHeader.get());
}

/**
 * 
 * @param {*} event 
 */
function updateEvent(event) {
    return request.put('events', event, authHeader.get());
}

/**
 * 
 */
function eventRecent() {
    return request.get("events/recent", authHeader.get());
}

/**
 * 
 * @param {*} year 
 * @param {*} month 
 */
function getEventsMonth(year, month) {
    return request.get(`events-month/${year}/${month}`, authHeader.get());
}

/**
 * 
 * @param {*} startDate 
 * @param {*} endDate 
 */
function getEventsWeek(startDate, endDate) {
    return request.get(`events-week/${startDate}/${endDate}`, authHeader.get());
}

/**
 * 
 * @param {*} event 
 */
function createEventFromManual(event) {
    return request.post(`event`, event, authHeader.get());
}

function loadAllCourseCode() {
    return request.get(`courses-code`, authHeader.get());
}
