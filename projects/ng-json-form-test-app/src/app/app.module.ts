import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgJsonFormModule} from 'ng-json-form';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgJsonFormModule,
    NgJsonEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
