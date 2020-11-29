import { Injectable } from '@angular/core';
import { DynamicFormField } from '../models/question-base';
import { CheckboxQuestion } from '../models/question-checkbox';
import { DropdownQuestion } from '../models/question-dropdown';
import { ListQuestion } from '../models/question-list';
import { RadioQuestion } from '../models/question-radio';
import { RangeQuestion } from '../models/question-range';
import { TextareaQuestion } from '../models/question-textarea';
import { TextboxQuestion } from '../models/question-textbox';
import { QuestionsEnum } from '../models/question.enum';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  public inputTypeConstructor(arr): Array<DynamicFormField> {
    return arr.reduce((acc, question) => {
      
      if (question?.controlType === QuestionsEnum.TEXTBOX) {
        return [...acc, new TextboxQuestion(question)];
      }
      else if (question?.controlType === QuestionsEnum.TEXTAREA) {
        return [...acc, new TextareaQuestion(question)];
      }
      else if (question?.controlType === QuestionsEnum.RANGE) {
        return [...acc,new RangeQuestion(question)];
      }
      else if (question?.controlType === QuestionsEnum.RADIO) {
        return [...acc, new RadioQuestion(question)];
      }
      else if (question?.controlType === QuestionsEnum.DROPDOWN) {
        return [...acc, new DropdownQuestion(question)];
      }
      else if (question?.controlType === QuestionsEnum.CHECKBOX) {
        return [...acc, new CheckboxQuestion(question)];
      }
      else if (question?.controlType === QuestionsEnum.LIST) {
        const listPatched = [];
        for ( const subquestion of question.list) {
          listPatched.push(this.inputTypeConstructor(Object.values(subquestion)));
        }
        const newQuestionList = {...question, list: [...listPatched] };
        return [...acc, new ListQuestion(newQuestionList)];
      } else {
        if(question.controlType) {
          console.warn(
`Property invalid: "ControlType" of Question ${JSON.stringify(question)} 
Question requires one of those: 
["checkbox", "radio", "dropdown", "range", "textarea", "textbox", "list"], 
but have got: ${question.controlType};

Using Default Value: TextboxQuestion`
          )
        }
        return [...acc, new TextboxQuestion(question)];
      }

    }, []);
  }
}
