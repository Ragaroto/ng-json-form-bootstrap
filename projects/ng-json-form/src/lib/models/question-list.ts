import { DynamicFormField, QuestionBase, QuestionBaseInterface } from './question-base';
import { QuestionsEnum } from './question.enum';

export interface ListQuestionInterface extends QuestionBaseInterface {
    list?: Array<any>;
}

export class ListQuestion extends QuestionBase<string> {
    readonly controlType = QuestionsEnum.LIST;
    list?: Array<DynamicFormField>;

    constructor(options: ListQuestionInterface = {}) {
        super(options);
        this.list = options.list || [];
    }
}
