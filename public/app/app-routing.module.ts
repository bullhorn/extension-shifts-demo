// NG2
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full'},
  { path: 'todo', loadChildren: './todo-card/todo-card.module#TodoCardModule' },
  { path: 'availability', loadChildren: './availability-card/availability-card.module#AvailabilityCardModule' },
  { path: 'shifts', loadChildren: './shift-schedule-card/shift-schedule-card.module#ShiftScheduleCardModule' },
  { path: 'matching-candidates', loadChildren: './matching-candidates-card/matching-candidates-card.module#MatchingCandidatesCardModule' },
  { path: 'matching-jobs', loadChildren: './matching-jobs-card/matching-jobs-card.module#MatchingJobsCardModule' },
  { path: 'automatch', loadChildren: './auto-match-tab/auto-match-tab.module#AutoMatchTabModule' }
];

@NgModule({
  imports: [
    // NG2
    RouterModule.forRoot(routes)
  ],
  exports: [
    // NG2
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
