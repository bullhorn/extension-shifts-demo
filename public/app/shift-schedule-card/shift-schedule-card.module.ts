// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule } from 'novo-elements';
// APP
import { SharedModule } from '../shared/shared.module';
import { ShiftScheduleCardComponent } from './shift-schedule-card.component';

export const routes: Routes = [
  { path: '', component: ShiftScheduleCardComponent, pathMatch: 'full' }
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
    ShiftScheduleCardComponent
  ]
})
export class ShiftScheduleCardModule { }
