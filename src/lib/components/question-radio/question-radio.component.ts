import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isObservable } from 'rxjs';
import { RangeQuestionInterface } from '../../models';

@Component({
  selector: 'lib-question-radio',
  templateUrl: './question-radio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionRadioComponent implements OnChanges {

  @Input() form: FormGroup;
  @Input() field: RangeQuestionInterface;
  @Input() touched: boolean;
  @Input() dirty: boolean;
  @Input() errors: any;

  public isOptionsObservable: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
      const opts = changes?.field?.currentValue?.options;
      if (opts) {
          if (isObservable(opts)) {
              this.isOptionsObservable = true;
          } else {
              this.isOptionsObservable = false;
          }
      }
  }

  trackByFn(index, item): any {
  return item.key; // or item.id
  }

}
