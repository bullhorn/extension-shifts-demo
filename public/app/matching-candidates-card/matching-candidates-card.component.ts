import { AppBridge } from 'novo-elements';
import { Component, OnInit, NgZone } from '@angular/core';
import { MatchingCandidatesCardService } from './matching-candidates-card.service';

@Component({
  selector: 'app-matching-candidates-card',
  templateUrl: './matching-candidates-card.component.html',
  styleUrls: ['./matching-candidates-card.component.scss']
})
export class MatchingCandidatesCardComponent implements OnInit {
  // refresher: EventEmitter<any> = new EventEmitter();
  candidates: Array<any> = [];

  constructor(private matches: MatchingCandidatesCardService, private bridge: AppBridge, private zone: NgZone) { }

  ngOnInit() {
    this.matches.getMatchingCandidates().subscribe((candidates: any[]) => {
      console.log('candidates', candidates);
      this.candidates = candidates;
    });
    this.bridge.addEventListener('SHIFTS.CHANGED', () => {
      this.zone.run(() => {
        this.matches.refresh();
      });
    });
  }

  notify(availabilty) {
    this.matches.notify(availabilty);
  }

  openCandidate(data) {
    this.bridge.open({
      type: 'record',
      entityType: 'Candidate',
      entityId: data.person.id
    });
  }
}
