import { QuestionBase, QuestionBaseInterface } from './question-base';
import { QuestionsEnum } from './question.enum';

export interface CheckboxQuestionInterface extends QuestionBaseInterface {}

export class CheckboxQuestion extends QuestionBase<string>{
    readonly controlType = QuestionsEnum.CHECKBOX;

    constructor(options: CheckboxQuestionInterface = {}) {
        super(options);
        this.value = options.value || false;
    }
}
