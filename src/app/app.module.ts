import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OtherModule } from './other/other.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedMaterialModule } from './shared-material.module';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    OtherModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
