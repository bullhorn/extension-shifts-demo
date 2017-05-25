import { Injectable, EventEmitter } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { PagedArrayCollection, AppBridge } from 'novo-elements';
import { SharedService } from '../shared/services/shared/shared.service';

@Injectable()
export class AutoMatchTabService {
  // private matches: EventEmitter<any[]> = new EventEmitter();
  private notified: EventEmitter<any[]> = new EventEmitter();
  private interested: EventEmitter<any[]> = new EventEmitter();
  private confirmed: EventEmitter<any[]> = new EventEmitter();
  private rejected: EventEmitter<any[]> = new EventEmitter();

  constructor(private bridge: AppBridge, private shared: SharedService) { }

  // getMatches() {
  //     this.refreshMatches();
  //     return this.matches;
  // }
  getNotified() {
    this.refreshNotified();
    return this.notified;
  }
  getInterested() {
    this.refreshInterested();
    return this.interested;
  }
  getConfirmed() {
    this.refreshConfirmed();
    return this.confirmed;
  }
  getRejected() {
    this.refreshRejected();
    return this.rejected;
  }

  // refreshMatches() {
  //     const params: any = new URLSearchParams(window.location.search).paramsMap;
  //     const entityId = params.get('EntityID')[0];
  //     const fields = ['id', 'name', 'occupation', 'dateAdded', 'workAuthorized', 'mobile', 'email', 'salary', 'hourlyRate', 'userIntegrations(externalSystem,externalUserKey){externalSystem=\'Commercial\'},shifts'].join();
  //     const query = `isDeleted:0 AND NOT jobResponses.jobOrder.id:${entityId}`;
  //     return this.bridge
  //         .httpGET(`/search/Candidate?fields=${fields}&count=20&query=${query}`)
  //         .then(response => {
  //             this.matches.next(response.data.data);
  //             return response.data;
  //         });
  // }

  refreshNotified() {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];
    const fields = ['id', 'candidate(id,name,occupation,mobile, email)', 'payRate', 'dateAdded', 'customText5'].join();
    const query = `isDeleted:0 AND jobOrder.id:${entityId} AND status:Alerted`;
    return this.bridge
      .httpGET(`/search/JobSubmission?fields=${fields}&count=20&query=${query}`)
      .then(response => {
        const result = response.data.data.map(i => Object.assign(i.candidate, { submission: i.id, payRate: i.payRate, shiftDate: new Date(Number(i.customText5)) }));
        this.notified.next(result);
        return response.data;
      });
  }
  refreshInterested() {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];
    const fields = ['id', 'candidate(id,name,occupation,mobile)', 'payRate', 'dateAdded', 'customText5'].join();
    const query = `isDeleted:0 AND jobOrder.id:${entityId} AND status:("Interested" "New Lead")`;
    return this.bridge
      .httpGET(`/search/JobSubmission?fields=${fields}&count=20&query=${query}`)
      .then(response => {
        const result = response.data.data.map(i => Object.assign(i.candidate, { submission: i.id, payRate: i.payRate, shiftDate: new Date(Number(i.customText5)) }));
        this.interested.next(result);
        return response.data;
      });
  }
  refreshRejected() {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];
    const fields = ['id', 'candidate(id,name,occupation,mobile)', 'payRate', 'dateAdded', 'customText5'].join();
    const query = `isDeleted:0 AND jobOrder.id:${entityId} AND status:("Rejected" "Not Interested")`;
    return this.bridge
      .httpGET(`/search/JobSubmission?fields=${fields}&count=20&query=${query}`)
      .then(response => {
        const result = response.data.data.map(i => Object.assign(i.candidate, { submission: i.id, payRate: i.payRate, shiftDate: new Date(Number(i.customText5)) }));
        this.rejected.next(result);
        return response.data;
      });
  }

  refreshConfirmed() {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];
    const fields = ['id', 'candidate(id,name,occupation,mobile)', 'payRate', 'dateAdded', 'customText5'].join();
    const query = `isDeleted:0 AND jobOrder.id:${entityId} AND status:("Confirmed" "Placed")`;
    return this.bridge
      .httpGET(`/search/JobSubmission?fields=${fields}&count=20&query=${query}`)
      .then(response => {
        const result = response.data.data.map(i => Object.assign(i.candidate, { submission: i.id, payRate: i.payRate, shiftDate: new Date(Number(i.customText5)) }));
        this.confirmed.next(result);
        return response.data;
      });
  }

  confirm(submissions: any[]) {
    this.shared.getJobOrder().then((jobOrder) => {
      const placements: Array<Promise<any>> = [];
      for (const item of submissions) {
        try {
          console.log(item);
          const placement = {
            candidate: item,
            jobOrder: jobOrder,
            // clientContact: jobOrder.clientContact,
            // clientCorporation: jobOrder.clientCorporation,
            status: 'Confirmed',
            employmentType: jobOrder.employmentType,
            dateBegin: item.shiftDate.getTime(),
            dateEnd: item.shiftDate.getTime(),
            clientBillRate: jobOrder.clientBillRate,
            payRate: jobOrder.payRate,
            salary: jobOrder.salary,
          };

          placements.push(
            this.bridge.httpPUT(`/entity/Placement`, placement),
            this.bridge.httpPOST(`/entity/JobSubmission/${item.submission}`, { status: 'Placed' }),
          );
        } catch (err) {
          console.log('Invalid Action Attempted!!');
        }
      }
      return Promise.all(placements).then(([placement, submission]) => {
        return true;
      });
    })
      .then(() => {
        this.refreshInterested();
        this.refreshConfirmed();
      });
  }
}
