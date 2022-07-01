import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OtherModule } from './other/other.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { SharedMaterialModule } from './shared-material.module';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    SimpleDialogComponent
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
