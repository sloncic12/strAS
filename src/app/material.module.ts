// material.module.ts
import { NgModule } from '@angular/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {    MatNativeDateModule} from '@angular/material/core';
    
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [ MatDatepickerModule ],
})

export class MaterialModule {}