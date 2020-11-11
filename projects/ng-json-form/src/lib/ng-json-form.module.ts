import { NgModule } from '@angular/core';
import { NgJsonFormComponent } from './ng-json-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionTextboxComponent } from './components/question-textbox/question-textbox.component';
import { QuestionDropdownComponent } from './components/question-dropdown/question-dropdown.component';
import { QuestionTextareaComponent } from './components/question-textarea/question-textarea.component';
import { QuestionRangeComponent } from './components/question-range/question-range.component';
import { QuestionCheckboxComponent } from './components/quesiton-checkbox/question-checkbox.component';
import { QuestionRadioComponent } from './components/question-radio/question-radio.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';

@NgModule({
  declarations: [
    NgJsonFormComponent,
    QuestionTextboxComponent,
    QuestionDropdownComponent,
    QuestionTextareaComponent,
    QuestionRangeComponent,
    QuestionCheckboxComponent,
    QuestionRadioComponent,
    ValidationMessagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NgJsonFormComponent]
})
export class NgJsonFormModule { }
