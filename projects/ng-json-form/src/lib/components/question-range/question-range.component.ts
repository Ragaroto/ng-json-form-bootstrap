import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RangeQuestionInterface } from '../../models';

@Component({
  selector: 'lib-question-range',
  templateUrl: './question-range.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionRangeComponent {

  @Input() form: FormGroup;
  @Input() field: RangeQuestionInterface;
  @Input() touched: boolean;
  @Input() dirty: boolean;
  @Input() errors: any;

  constructor() { }

}
