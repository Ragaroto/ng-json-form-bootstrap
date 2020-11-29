import { Observable } from 'rxjs';
import { QuestionBase, QuestionBaseInterface } from './question-base';
import { QuestionsEnum } from './question.enum';

export interface DropdownQuestionInterface extends QuestionBaseInterface {
    // tslint:disable-next-line:max-line-length
    options?: Observable<{ key?: number | string, value?: any, [kkey: string]: any }[]> | { key?: number | string, value?: any, [kkey: string]: any }[];
    trackKey?: string;
    viewValue?: string;
}

export class DropdownQuestion extends QuestionBase<string> {
    readonly controlType = QuestionsEnum.DROPDOWN;
    // tslint:disable-next-line:max-line-length
    options: Observable<{ key?: number | string, value?: any, [kkey: string]: any }[]> | { key?: number | string, value?: any, [kkey: string]: any }[];
    trackKey = 'key';
    viewValue = 'value';

    constructor(options: DropdownQuestionInterface = {}) {
        super(options);
        this.options = options.options || [];
        this.trackKey = options.trackKey || 'key';
        this.viewValue = options.viewValue || 'value';
    }
}
