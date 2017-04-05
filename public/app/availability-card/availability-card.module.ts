// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// APP
import { AvailabilityCardComponent } from './availability-card.component';
import { NovoElementsModule } from 'novo-elements';

export const routes: Routes = [
  { path: '', component: AvailabilityCardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    // NG2
    CommonModule,
    RouterModule.forChild(routes),
    NovoElementsModule
  ],
  declarations: [
    AvailabilityCardComponent
  ]
})
export class AvailabilityCardModule { }
