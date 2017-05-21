// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './services/shared/shared.service';
@NgModule({
  imports: [
    // NG2
    CommonModule
  ],
  providers: [SharedService],
  declarations: []
})
export class SharedModule { }
