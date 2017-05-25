import { Component, OnInit } from '@angular/core';
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

  constructor(private matches: MatchingJobsCardService, private bridge: AppBridge) { }

  ngOnInit() {
    this.matches.getMatchingJobs().subscribe((jobs: any[]) => {
      console.log('jobs', jobs);
      this.jobs = jobs;
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
