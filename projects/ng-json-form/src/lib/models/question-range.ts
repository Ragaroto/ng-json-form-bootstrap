import { QuestionBase, QuestionBaseInterface } from './question-base';
import { QuestionsEnum } from './question.enum';

export interface RangeQuestionInterface extends QuestionBaseInterface {
    step?: number;
    min?: number;
    max?: number;
    iconStart?: string;
    iconEnd?: string;
}

export class RangeQuestion extends QuestionBase<string>{
    readonly controlType = QuestionsEnum.RANGE;
    step: number;
    min: number;
    max: number;
    iconEnd: string;
    iconStart: string;

    constructor(options: RangeQuestionInterface = {}) {
        super(options);
        this.step = options.step || 1;
        this.min = options.min || 0;
        this.max = options.max || 10;
        this.iconStart = options.iconStart || null;
        this.iconEnd = options.iconEnd || null;
    }
}
