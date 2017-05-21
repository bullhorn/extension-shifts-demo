import { Component, OnInit } from '@angular/core';
import { MatchingJobsCardService } from './matching-jobs-card.service';

@Component({
    selector: 'app-matching-jobs-card',
    templateUrl: './matching-jobs-card.component.html',
    styleUrls: ['./matching-jobs-card.component.scss']
})
export class MatchingJobsCardComponent implements OnInit {
    // refresher: EventEmitter<any> = new EventEmitter();
    jobs: Array<any> = [];

    constructor(private matches: MatchingJobsCardService) { }

    ngOnInit() {
        this.matches.getMatchingJobs().subscribe((jobs: any[]) => {
            console.log('jobs', jobs);
            this.jobs = jobs;
        });
    }

    notify(shift) {
        this.matches.notify(shift);
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
