import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from './../shared-material.module';
import { OtherComponent } from './other.component';

@NgModule({
  declarations: [OtherComponent],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [
    OtherComponent,
  ]
})
export class OtherModule { }

