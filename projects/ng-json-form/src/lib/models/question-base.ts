import { CheckboxQuestionInterface } from './question-checkbox';
import { DropdownQuestionInterface } from './question-dropdown';
import { ListQuestionInterface } from './question-list';
import { RadioQuestionInterface } from './question-radio';
import { RangeQuestionInterface } from './question-range';
import { TextareaQuestionInterface } from './question-textarea';
import { TextboxQuestionInterface } from './question-textbox';
import { QuestionsEnum } from './question.enum';

export interface QuestionBaseInterface {
        [xyz: string]: any;
        controlType?: QuestionsEnum;
        disabled?: boolean;
        helpText?: string;
        key?: string;
        label?: string;
        order?: number;
        placeholder?: string;
        readonly?: boolean;
        required?: boolean;
        size?: number;
        value?: any;
}

export class QuestionBase<T> {
    controlType: QuestionsEnum;
    disabled: boolean;
    helpText?: string;
    key: string;
    label: string;
    order: number;
    placeholder: string;
    readonly: boolean;
    required: boolean;
    size: number;
    value: T;

    constructor(options: QuestionBaseInterface = {}) {
        this.value = options.value || null;
        this.key = options.key || this.createUUID();
        this.placeholder = options.placeholder || null;
        this.size = options.size || null;
        this.label = options.label || '';
        this.helpText = options.helpText || '';
        this.required = !!options.required || false;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || QuestionsEnum.BASE;
        this.disabled = options.disabled || false;
        this.readonly = options.readonly || false;
    }

    private createUUID(): string {
      let dt = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          // tslint:disable-next-line:no-bitwise
          const r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          // tslint:disable-next-line:no-bitwise
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
  }
}
export interface DynamicFormField {
    [key: string]: TextboxQuestionInterface
    | CheckboxQuestionInterface
    | DropdownQuestionInterface
    | TextareaQuestionInterface
    | RadioQuestionInterface
    | RangeQuestionInterface
    | ListQuestionInterface;
}
