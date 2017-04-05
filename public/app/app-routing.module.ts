// NG2
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full'},
  { path: 'todo', loadChildren: './todo-card/todo-card.module#TodoCardModule' },
  { path: 'availability', loadChildren: './availability-card/availability-card.module#AvailabilityCardModule' },
  { path: 'shifts', loadChildren: './shift-schedule-card/shift-schedule-card.module#ShiftScheduleCardModule' }
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
