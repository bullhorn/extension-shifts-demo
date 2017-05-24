// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule, AppBridge } from 'novo-elements';
// APP
import { MatchingJobsCardComponent } from './matching-jobs-card.component';
import { MatchingJobsCardService } from './matching-jobs-card.service';
import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  { path: '', component: MatchingJobsCardComponent, pathMatch: 'full' }
];

export function setupAppBridge() {
    const bridge = new AppBridge('MatchingJobs');
    bridge.tracing = true;
    bridge.register();
    return bridge;
}

@NgModule({
  imports: [
    // NG2
    CommonModule,
    RouterModule.forChild(routes),
    NovoElementsModule,
    SharedModule
  ],
  declarations: [
    MatchingJobsCardComponent
  ],
  providers: [
    MatchingJobsCardService,
    { provide: AppBridge, useFactory: setupAppBridge }
  ]
})
export class MatchingJobsCardModule { }
