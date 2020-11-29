import { QuestionBase, QuestionBaseInterface } from './question-base';
import { QuestionsEnum } from './question.enum';

export interface RadioQuestionInterface extends QuestionBaseInterface {
  options?: { key?: number | string, value?: any, [kkey: string]: any }[];
  trackKey?: string;
  viewValue?: string;
  value?: any;
}

export class RadioQuestion extends QuestionBase<string>{
    readonly controlType = QuestionsEnum.RADIO;
    options: { key?: number | string, value?: any, [kkey: string]: any }[] = [];
    trackKey = 'id';
    viewValue = 'label';
    value: any;

    constructor(options: RadioQuestionInterface = {}) {
        super(options);
        this.options = options.options || [];
        this.trackKey = options.trackKey || 'id';
        this.viewValue = options.viewValue || 'label';
        this.value = options.value || '';
    }
}
