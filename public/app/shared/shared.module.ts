// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsService } from './services/shifts/shifts.service';
@NgModule({
  imports: [
    // NG2
    CommonModule
  ],
  providers: [ShiftsService],
  declarations: []
})
export class SharedModule { }
