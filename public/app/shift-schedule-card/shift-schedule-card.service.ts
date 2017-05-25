import { Injectable, EventEmitter } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { PagedArrayCollection, AppBridge, CalendarEvent, CalendarEventResponse } from 'novo-elements';
import { colors } from '../shared/utils/utils';

@Injectable()
export class ShiftScheduleCardService {
  private subject: EventEmitter<CalendarEvent[]> = new EventEmitter();

  constructor(private bridge: AppBridge) { }

  getShiftsNeeded(): EventEmitter<CalendarEvent[]> {
    // get http
    // save to candidate shifts field.
    /*PersonCustomObjectInstance1?
    text1: ?,  // name
    text2: ?, // status
    date1: date  // date of event,
    candidate: ?
    */
    this.refresh();
    return this.subject;
  }

  refresh() {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];
    // TODO: Don't forget to set a date range.
    Promise.all([
      this.bridge.httpGET(`/entity/JobOrder/${entityId}/customObject1s?fields=id,text1,text2,date1&count=500`),
      this.bridge.httpGET(`/query/JobSubmission?fields=jobOrder(id,title,startDate)&where=jobOrder.id=${entityId}`),
      this.bridge.httpGET(`/query/Placement?fields=dateBegin,jobOrder(id,title)&where=jobOrder.id=${entityId}`)
    ]).then(([events, submissions, placements]) => {
      // Update Events to show Placements against it
      console.log('results', events, submissions, placements);

      const results = [
        ...events.data.data.map((e) => {
          return {
            id: e.id,
            start: new Date(e.date1),
            title: e.text1,
            response: Number(e.text2),
            color: colors.green,
            type: 'shift'
          };
        }), /*
              ...submissions.data.data.map((s) => {
                return {
                    id: s.id,
                    start: new Date(s.jobOrder.startDate),
                    title: s.jobOrder.title,
                    response: 'pending',
                    color: colors.green,
                    type: 'submission'
                };
              }),*/
        ...placements.data.data.map((p) => {
          return {
            id: p.id,
            start: new Date(p.dateBegin),
            title: p.jobOrder.title,
            color: colors.blue,
            response: 1,
            type: 'placement'
          };
        })
      ];

      this.subject.next(results);
    });
  }

  add(evt: CalendarEvent) {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];

    this.bridge.httpPOST(`/entity/JobOrder/${entityId}`, {
      customObject1s: [{
        text1: evt.title,
        text2: evt.response,
        date1: evt.start.setUTCHours(12, 0, 0, 0)
      }]
    }).then(() => this.refresh());
  }

  update(evt: CalendarEvent | any) {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];

    this.bridge.httpPOST(`/entity/JobOrder/${entityId}`, {
      customObject1s: [{
        id: evt.id,
        text1: evt.title,
        text2: evt.response
      }]
    }).then(() => this.refresh());
  }

  remove(evt: CalendarEvent | any) {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];
    this.bridge.httpDELETE(`/entity/JobOrder/${entityId}/customObject1s/${evt.id}`).then(() => this.refresh());
  }
}
