import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AppBridge, CalendarEvent, CalendarEventResponse } from 'novo-elements';

@Injectable()
export class ShiftsService {
  private bridge: AppBridge = new AppBridge('Shifts');
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
      // Don't forget to set a date range.
      const params: any = new URLSearchParams(window.location.search);
      console.log('searching', params);
      Promise.all([
          this.bridge.httpGET(`/query/PersonCustomObjectInstance1?fields=text1,text2,date1&where=candidate.id=${params.EntityId}`),
          this.bridge.httpGET(`/query/JobSubmission?fields=dateBegin&where=candidate.id=${params.EntityId}`),
          this.bridge.httpGET(`/query/Placement?fields=dateBegin&where=candidate.id=${params.EntityId}`)
        ]).then(([events, submission, placements]) => {
            // Update Events to show Placements against it
            console.log('results', events, submission, placements);
        });
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
