import { Injectable } from '@angular/core';
import { CalendarEvent, CalendarEventResponse } from 'novo-elements';

@Injectable()
export class ShiftsService {

  constructor() { }

  getCandidateAvailability(): Promise<CalendarEvent[]> {
     // get http
        // save to candidate shifts field.
        /*PersonCustomObjectInstance1?
        text1: ?,  // name
        text2: ?, // status
        date1: date  // date of event,
        candidate: ?
        */
        /*
      // Don't forget to set a date range.

      Promise.all([
          AppBridge
            .httpGET(`/query/PersonCustomObjectInstance1?fields=text1,text2,date1&where=candidate.id=${entityId}`),
          AppBridge
            .httpGET(`/query/JobSubmission?fields=dateBegin&where=candidate.id=${entityId}`),
          AppBridge
            .httpGET(`/query/Placement?fields=dateBegin&where=candidate.id=${entityId}`)
        ]).then([events,submission,placements] => {
            // Update Events to show Placements against it
        });
      */
      return Promise.resolve([]);
  }

  getShiftNeeded(): Promise<CalendarEvent[]> {
     /*
      // Don't forget to set a date range.
      AppBridge
        .httpGET(`/query/JobOrderCustomObjectInstance1?fields=text1,text2,text3,date1&where=jobOrder.id=${entityId}`)
        .then((response) => {
            this.events = response.data;
        });
      AppBridge
        .httpGET(`/query/JobSubmission?fields=dateBegin&where=jobOrder.id=${entityId}`)
        .then((response) => {
            // Update Events to show Submission against it
        });
      AppBridge
        .httpGET(`/query/Placement?fields=dateBegin&where=jobOrder.id=${entityId}`)
        .then((response) => {
            // Update Events to show Placements against it
        });
      */
      return Promise.resolve([]);
  }

}
