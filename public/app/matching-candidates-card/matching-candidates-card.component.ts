import { Component, OnInit } from '@angular/core';
import { MatchingCandidatesCardService } from './matching-candidates-card.service';

@Component({
  selector: 'app-matching-candidates-card',
  templateUrl: './matching-candidates-card.component.html',
  styleUrls: ['./matching-candidates-card.component.scss']
})
export class MatchingCandidatesCardComponent implements OnInit {
  // refresher: EventEmitter<any> = new EventEmitter();
  candidates: Array<any> = [];

  constructor(private matches: MatchingCandidatesCardService) {}

  ngOnInit() {
    this.matches.getMatchingCandidates().subscribe((candidates: any[]) => {
          console.log('candidates', candidates);
          this.candidates = candidates;
      });
  }

  notify(availabilty) {
     this.matches.notify(availabilty);
  }

  openCandidate(candidate) {
      /*
      AppBridge.openRecord({
          entityType: 'JobOrder',
          entityId: job.id
      });
      */
  }
}
