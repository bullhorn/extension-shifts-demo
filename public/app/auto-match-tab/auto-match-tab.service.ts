import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { PagedArrayCollection, AppBridge } from 'novo-elements';
import { TableData } from './auto-match-tab.data';

@Injectable()
export class AutoMatchTabService {
  private bridge: AppBridge= new AppBridge('AutoMatchTab');

  constructor() {
      this.bridge.register();
  }

  getMatches() {
      const params: any = new URLSearchParams(window.location.search);
      const fields = ['id', 'name', 'occupation', 'dateAdded', 'workAuthorized', 'mobile', 'email', 'salary', 'hourlyRate', 'userIntegrations(externalSystem,externalUserKey){externalSystem=\'Commercial\'},shifts'].join();
      const query = `isDeleted:0 AND NOT jobResponses.jobOrder.id:${params.EntityID}`;
      return this.bridge
            .httpGET(`/search/Candidate?fields=${fields}&count=20&query=${query}`)
            .then( response => {
                console.log('response', response);
                return response;
            });
  }
}