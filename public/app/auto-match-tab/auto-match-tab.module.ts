// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule, AppBridge } from 'novo-elements';
// APP
import { SharedModule } from '../shared/shared.module';
import { AutoMatchTabComponent } from './auto-match-tab.component';
import { AutoMatchTabService } from './auto-match-tab.service';

export const routes: Routes = [
  { path: '', component: AutoMatchTabComponent, pathMatch: 'full' }
];

const bridge = new AppBridge('AutoMatchTab');
bridge.tracing = true;
bridge.register();

export function setupAppBridge() {
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
    AutoMatchTabComponent
  ],
  providers: [
    AutoMatchTabService,
    { provide: AppBridge, useFactory: setupAppBridge }
  ]
})
export class AutoMatchTabModule { }
