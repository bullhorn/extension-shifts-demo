import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matching-candidates-card',
  templateUrl: './matching-candidates-card.component.html',
  styleUrls: ['./matching-candidates-card.component.scss']
})
export class MatchingCandidatesCardComponent implements OnInit {

  candidates: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.candidates = [{
      firstName: 'Steph',
      lastName: 'Curry',
      company: 'Wells Fargo',
      location: 'Golden State, CA'
    }, {
      firstName: 'Lebron',
      lastName: 'James',
      company: 'Amazon',
      location: 'Cleveland, OH'
    }, {
      firstName: 'Derrick',
      lastName: 'Rose',
      company: 'Walmart',
      location: 'Chicago, IL'
    }];
  }

  openCandidate(candidate) {
      /*
      AppBridge.openRecord({
          entityType: 'Candidate',
          entityId: candidate.id
      });
      */
  }


}
