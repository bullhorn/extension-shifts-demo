import { Injectable, EventEmitter } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';
import { PagedArrayCollection, AppBridge, CalendarEvent, CalendarEventResponse } from 'novo-elements';
import { colors } from '../shared/utils/utils';
import { SharedService } from '../shared/services/shared/shared.service';

interface Shift {
    id: number;
    shiftDate: Date;
    jobOrder?: any;
}

@Injectable()
export class MatchingJobsCardService {
    private subject: EventEmitter<Shift[]> = new EventEmitter();

    constructor(private bridge: AppBridge, private shared: SharedService, private http: Http) {}

    getMatchingJobs(): EventEmitter<Shift[]> {
        this.refresh();
        return this.subject;
    }

    refresh() {
        const params: any = new URLSearchParams(window.location.search).paramsMap;
        const entityId = params.get('EntityID')[0];
        // TODO: Don't forget to set a date range.
        Promise.all([
            this.bridge.httpGET(`/entity/Candidate/${entityId}/customObject1s?fields=id,text2,date1&count=500&where=date1>${Date.now()}`),
            this.bridge.httpGET(`/entity/Candidate/${entityId}/submissions?fields=id,candidate,customText5&count=500&where=customText5>'${Date.now()}'`)
        ]).then(([candidates, submissions]) => {
            const fields = 'id,text1,text2,date1,jobOrder(id,title,clientCorporation,clientContact,address,status,clientBillRate,payRate,salary)';
            const dates = candidates.data.data.map((e) => e.date1);
            const query = `date1 IN (${dates.join()}) AND date1>${Date.now()} AND text2='0'`;
            this.bridge.httpGET(`/query/JobOrderCustomObjectInstance1?fields=${fields}&where=${query}&orderBy=date1&count=500`)
                .then((response) => {
                    // Update Events to show Placements against it
                    // console.log('results', events, submissions, placements);
                    const results: Shift[] = [
                        ...response.data.data.map((e) => {
                            return {
                                id: e.id,
                                shiftDate: new Date(e.date1),
                                jobOrder: e.jobOrder
                            };
                        })
                    ];
                    this.subject.next(results);
                });
        });
    }

    notify(event: Shift) {
        this.shared.getCandidate().then((candidate) => {
            try {
                const packet: any = {
                    jobOrder: event.jobOrder,
                    candidate: candidate,
                    status: 'Alerted',
                    source: 'AutoMatch',
                    billRate: event.jobOrder.clientBillRate,
                    payRate: event.jobOrder.payRate,
                    salary: event.jobOrder.salary,
                    customText5: event.shiftDate.getTime()
                };
                return this.bridge
                .httpPUT(`/entity/JobSubmission`, packet);
            } catch (err) {
                console.warn('Invalid Action Attempted!!');
            }
        })
        .then((submission) => {
            // send email
            return this.http.post('./email/notification', submission).toPromise();
        })
        .then(() => {
            this.refresh();
        });
    };
}
