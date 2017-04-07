// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule } from 'novo-elements';
// APP
import { SharedModule } from '../shared/shared.module';
import { MatchingCandidatesCardComponent } from './matching-candidates-card.component';

export const routes: Routes = [
  { path: '', component: MatchingCandidatesCardComponent, pathMatch: 'full' }
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
    MatchingCandidatesCardComponent
  ]
})
export class MatchingCandidatesCardModule { }
