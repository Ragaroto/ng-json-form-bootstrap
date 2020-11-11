import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  QuestionTextboxTypes, TextboxQuestionInterface
} from '../../models';

@Component({
  selector: 'lib-question-textbox',
  templateUrl: './question-textbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionTextboxComponent {

  @Input() form: FormGroup;
  @Input() field: TextboxQuestionInterface;
  @Input() idSalt: string;
  @Input() touched: boolean;
  @Input() dirty: boolean;
  @Input() errors: any;

  public textTypes = QuestionTextboxTypes;
  public regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor() { }

}
