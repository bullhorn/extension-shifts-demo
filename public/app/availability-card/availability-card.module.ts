// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule, AppBridge } from 'novo-elements';
// APP
import { AvailabilityCardComponent } from './availability-card.component';
import { AvailabilityCardService } from './availability-card.service';

export const routes: Routes = [
  { path: '', component: AvailabilityCardComponent, pathMatch: 'full' }
];

const bridge = new AppBridge('Availability');
bridge.tracing = true;
bridge.register();

@NgModule({
  imports: [
    // NG2
    CommonModule,
    RouterModule.forChild(routes),
    NovoElementsModule
  ],
  declarations: [
    AvailabilityCardComponent
  ],
  providers: [
    AvailabilityCardService,
    { provide: AppBridge, useValue: bridge }
  ]
})
export class AvailabilityCardModule { }
