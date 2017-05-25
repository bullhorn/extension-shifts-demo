import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AppBridge, CalendarEvent, CalendarEventResponse } from 'novo-elements';
import { colors } from '../../utils/utils';

@Injectable()
export class SharedService {

  constructor(private bridge: AppBridge) {
  }

  getJobOrder() {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];
    const fields = ['id', 'title', 'clientCorporation', 'clientContact', 'startDate', 'clientBillRate', 'payRate', 'salary', 'address', 'employmentType'].join();
    return this.bridge
      .httpGET(`/entity/JobOrder/${entityId}?fields=${fields}`)
      .then(response => {
        return response.data.data;
      });
  }

  getCandidate() {
    const params: any = new URLSearchParams(window.location.search).paramsMap;
    const entityId = params.get('EntityID')[0];
    const fields = ['id', 'name', 'firstName', 'lastName'].join();
    return this.bridge
      .httpGET(`/entity/Candidate/${entityId}?fields=${fields}`)
      .then(response => {
        return response.data.data;
      });
  }
}
