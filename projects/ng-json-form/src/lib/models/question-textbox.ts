import { QuestionBaseInterface, QuestionBase } from './question-base';
import { QuestionsEnum } from './question.enum';

export enum QuestionTextboxTypes {
    'text' = 'text',
    'password' = 'password',
    'email' = 'email',
    'number' = 'number',
    'search' = 'search',
    'tel' = 'tel',
    'file' = 'file',
    'image' = 'image',
    'url' = 'url'
}

export interface TextboxQuestionInterface extends QuestionBaseInterface {
    type?: string | QuestionTextboxTypes;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp | string;
}

export class TextboxQuestion extends QuestionBase<string> {
    controlType =  QuestionsEnum.TEXTBOX;
    type: string | QuestionTextboxTypes;
    minLength: number;
    maxLength: number;
    pattern?: RegExp | string;

    constructor(options: TextboxQuestionInterface = {}) {
        super(options);
        this.type = options.type || QuestionTextboxTypes.text;
        this.minLength = options.minLength || null;
        this.maxLength = options.maxLength || null;
        this.pattern = options.pattern || null;
        this.value = options.value || null;
    }
}
