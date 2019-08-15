import { request } from "../_helper"

export const eventService = {
    getEventList,
    getEventById,
    cancelEvent,
    updateEvent,
    eventRecent,
    getEventsMonth,
    getEventsWeek
}

/**
 * Get a event list from database 
 * @param {int} pageNumber Page number to send to get list on paginate
 */
function getEventList(pageNumber) {
    return request.get(`events/${pageNumber}`);
}

/**
 * 
 * @param {*} eventId
 */
function getEventById(eventId) {
    return request.get(`event?eventId=${eventId}`);
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
    return request.patch(`event?${url}`);
}

/**
 * 
 * @param {*} event 
 */
function updateEvent(event) {
    return request.put('events', event);
}

/**
 * 
 */
function eventRecent() {
    return request.get("events/recent");
}

function getEventsMonth(year, month) {
    return request.get(`events-month/${year}/${month}`);
}

function getEventsWeek(startDate, endDate) {
    return request.get(`events-week/${startDate}/${endDate}`);
}