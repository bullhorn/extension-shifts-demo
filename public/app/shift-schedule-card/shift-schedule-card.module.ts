// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule, AppBridge } from 'novo-elements';
// APP
import { ShiftScheduleCardComponent } from './shift-schedule-card.component';
import { ShiftScheduleCardService } from './shift-schedule-card.service';

export const routes: Routes = [
  { path: '', component: ShiftScheduleCardComponent, pathMatch: 'full' }
];

export function setupAppBridge() {
    const bridge = new AppBridge('ShiftSchedule');
    bridge.tracing = true;
    bridge.register();
    return bridge;
}

@NgModule({
  imports: [
    // NG2
    CommonModule,
    RouterModule.forChild(routes),
    NovoElementsModule
  ],
  declarations: [
    ShiftScheduleCardComponent
  ],
  providers: [
    ShiftScheduleCardService,
    { provide: AppBridge, useFactory: setupAppBridge }
  ]
})
export class ShiftScheduleCardModule { }