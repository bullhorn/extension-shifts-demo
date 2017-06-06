import { Component, OnInit, NgZone } from '@angular/core';
import { AppBridge } from 'novo-elements';
import { MatchingJobsCardService } from './matching-jobs-card.service';

@Component({
  selector: 'app-matching-jobs-card',
  templateUrl: './matching-jobs-card.component.html',
  styleUrls: ['./matching-jobs-card.component.scss']
})
export class MatchingJobsCardComponent implements OnInit {
  // refresher: EventEmitter<any> = new EventEmitter();
  jobs: Array<any> = [];

  constructor(private matches: MatchingJobsCardService, private bridge: AppBridge, private zone: NgZone) { }

  ngOnInit() {
    this.matches.getMatchingJobs().subscribe((jobs: any[]) => {
      console.log('jobs', jobs);
      this.jobs = jobs;
    });
    this.bridge.addEventListener('AVAILABILITY.CHANGED', () => {
      this.zone.run(() => {
        this.matches.refresh();
      });
    });
  }

  notify(shift) {
    this.matches.notify(shift);
  }

  openJobOrder(data) {
    this.bridge.open({
      type: 'record',
      entityType: 'JobOrder',
      entityId: data.jobOrder.id
    });
  }
}
