import { Injectable, EventEmitter } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';
import { PagedArrayCollection, AppBridge, CalendarEvent, CalendarEventResponse } from 'novo-elements';
import { colors } from '../shared/utils/utils';
import { SharedService } from '../shared/services/shared/shared.service';

interface Availability {
  id: number;
  dateAvailable: Date;
  person?: any;
}

@Injectable()
export class MatchingCandidatesCardService {
  private subject: EventEmitter<Availability[]> = new EventEmitter();

  constructor(private bridge: AppBridge, private shared: SharedService, private http: Http) {
  }

  getMatchingCandidates(): EventEmitter<any[]> {
    this.refresh();
    return this.subject;
  }

  refresh() {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];
    // TODO: Don't forget to set a date range.
    Promise.all([
      this.bridge.httpGET(`/entity/JobOrder/${entityId}/customObject1s?fields=id,text2,date1&count=500&where=date1>${Date.now()}`),
      this.bridge.httpGET(`/entity/JobOrder/${entityId}/submissions?fields=id,candidate,customText5&count=500&where=customText5>'${Date.now()}'`)
    ]).then(([jobdata, submissions]) => {
      const fields = 'id,text1,text2,date1,person(id,firstName,lastName,occupation,address)';
      const dates = jobdata.data.data.map((e) => e.date1);
      const query = `date1 IN (${dates.join()}) AND date1>${Date.now()} AND text2='1'`;
      this.bridge.httpGET(`/query/PersonCustomObjectInstance1?fields=${fields}&where=${query}&orderBy=date1&count=500`)
        .then((response) => {
          // Update Events to show Placements against it
          // console.log('results', events, submissions, placements);
          const results: Availability[] = [
            ...response.data.data
              .map((e) => {
                return {
                  id: e.id,
                  dateAvailable: new Date(e.date1),
                  person: e.person
                };
              }).filter((e) => {
                return !submissions.data.data.find(s => {
                  return (e.person.id === s.candidate.id && e.dateAvailable.getTime() === Number(s.customText5));
                });
              })
          ];

          this.subject.next(results);
        });
    });
  }

  notify(event: Availability) {
    this.shared.getJobOrder().then((jobOrder) => {
      try {
        const packet: any = {
          jobOrder: jobOrder,
          candidate: event.person,
          status: 'Alerted',
          source: 'AutoMatch',
          billRate: jobOrder.clientBillRate,
          payRate: jobOrder.payRate,
          salary: jobOrder.salary,
          customText5: event.dateAvailable.getTime()
        };
        return this.bridge.httpPUT(`/entity/JobSubmission`, packet);
      } catch (err) {
        console.warn('Invalid Action Attempted!!');
      }
    })
      .then((submission) => {
        console.log('submission', submission);
        return this.http.post('./email/notification', submission).toPromise();
      })
      .then(() => {
        this.refresh();
      });
  }
}
