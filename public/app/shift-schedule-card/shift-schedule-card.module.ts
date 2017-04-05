// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// APP
import { ShiftScheduleCardComponent } from './shift-schedule-card.component';
import { NovoElementsModule } from 'novo-elements';

export const routes: Routes = [
  { path: '', component: ShiftScheduleCardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    // NG2
    CommonModule,
    RouterModule.forChild(routes),
    NovoElementsModule
  ],
  declarations: [
    ShiftScheduleCardComponent
  ]
})
export class ShiftScheduleCardModule { }
