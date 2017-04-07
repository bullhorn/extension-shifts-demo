import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matching-jobs-card',
  templateUrl: './matching-jobs-card.component.html',
  styleUrls: ['./matching-jobs-card.component.scss']
})
export class MatchingJobsCardComponent implements OnInit {

  jobs: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.jobs = [{
      title: 'Direct Care Nurse',
      company: 'Mass General Hospital',
      location: 'Boston, MA'
    }, {
      title: 'Anesthesiologist Assistant',
      company: 'Tufts Medical Center',
      location: 'Boston, MA'
    }, {
      title: 'Healthcare Technician',
      company: 'Beth Israel Deaconess Medical Center',
      location: 'Boston, MA'
    }];
  }

  openJobOrder(job) {
      /*
      AppBridge.openRecord({
          entityType: 'JobOrder',
          entityId: job.id
      });
      */
  }
}
