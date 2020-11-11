import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    CheckboxQuestionInterface,
    DropdownQuestionInterface,
  QuestionTextboxTypes, RangeQuestionInterface, TextareaQuestionInterface, TextboxQuestionInterface
} from '../../models';
import { RadioQuestionInterface } from '../../models/question-radio';

@Component({
  selector: 'lib-validation-messages',
  templateUrl: './validation-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessagesComponent {

  @Input() shouldShow: boolean;
  @Input() errors: any;
  @Input() field: TextboxQuestionInterface| CheckboxQuestionInterface | DropdownQuestionInterface| TextareaQuestionInterface
  | RadioQuestionInterface
  | RangeQuestionInterface;

  constructor() { }

}
