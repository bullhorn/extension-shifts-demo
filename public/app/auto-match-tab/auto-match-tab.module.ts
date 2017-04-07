// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule } from 'novo-elements';
// APP
import { SharedModule } from '../shared/shared.module';
import { AutoMatchTabComponent } from './auto-match-tab.component';

export const routes: Routes = [
  { path: '', component: AutoMatchTabComponent, pathMatch: 'full' }
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
    AutoMatchTabComponent
  ]
})
export class AutoMatchTabModule { }
