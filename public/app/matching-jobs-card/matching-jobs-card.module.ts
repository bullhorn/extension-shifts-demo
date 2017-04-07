// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule } from 'novo-elements';
// APP
import { SharedModule } from '../shared/shared.module';
import { MatchingJobsCardComponent } from './matching-jobs-card.component';

export const routes: Routes = [
  { path: '', component: MatchingJobsCardComponent, pathMatch: 'full' }
];

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
  ]
})
export class MatchingJobsCardModule { }
