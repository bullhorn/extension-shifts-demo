// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule, AppBridge } from 'novo-elements';
// APP
import { MatchingCandidatesCardComponent } from './matching-candidates-card.component';
import { MatchingCandidatesCardService } from './matching-candidates-card.service';
import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  { path: '', component: MatchingCandidatesCardComponent, pathMatch: 'full' }
];

export function setupAppBridge() {
    const bridge = new AppBridge('MatchingCandidates');
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
    MatchingCandidatesCardComponent
  ],
  providers: [
    MatchingCandidatesCardService,
    { provide: AppBridge, useFactory: setupAppBridge }
  ]
})
export class MatchingCandidatesCardModule { }
