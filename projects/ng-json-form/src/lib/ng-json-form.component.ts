import { ChangeDetectionStrategy, ChangeDetectorRef, Component,
    EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { DynamicFormField, QuestionBaseInterface } from './models/question-base';
import { CheckboxQuestionInterface } from './models/question-checkbox';
import { DropdownQuestionInterface } from './models/question-dropdown';
import { RangeQuestionInterface } from './models/question-range';
import { TextareaQuestionInterface } from './models/question-textarea';
import { QuestionTextboxTypes, TextboxQuestionInterface } from './models/question-textbox';
import { QuestionsEnum } from './models/question.enum';
import { DynamicFormService } from './services/dynamic-form.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-json-form',
  templateUrl: 'ng-json-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgJsonFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input() settings: { galleryFirst: boolean } = {  galleryFirst: false };
  @Input() questions: DynamicFormField | any;
  @Input() debugMode = false;
  @Output() formChanged: EventEmitter<{value: any, valid: boolean}> = new EventEmitter();
  @Output() fieldChanged: EventEmitter<{field: any, value: any}> = new EventEmitter();

  public inputEnum = QuestionsEnum;
  public form: FormGroup;
  public localQuestion: Array< TextboxQuestionInterface
    | CheckboxQuestionInterface
    | DropdownQuestionInterface
    | TextareaQuestionInterface
    | RangeQuestionInterface>;

  private destroy$: Subject<boolean> = new Subject();


  constructor(private fb: FormBuilder, private dynformService: DynamicFormService, private cd: ChangeDetectorRef) {
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    const questions = changes?.questions?.currentValue || null;
    this.initAll(questions);
  }

  sortFields(itens: DynamicFormField): DynamicFormField[] {
    if(Object.keys(itens).length === 0) {
      return [];
    }else {
      const x = Object.keys(itens)
        .map((key: string) => ({ ...itens[key], key } as any as DynamicFormField))
        .sort((a, b) => {
          return +(a.order > b.order) || +(a.order === b.order) - 1;
        }) as DynamicFormField[];
      return x;
    }
  }

  trackByFn(index, item): any {
    return item.key; // or item.id
  }

  ngOnInit(): void {
    this.initAll();
  }

  initAll(qst?): void {
    const questions = qst || this.questions;
    this.destroy$.next(true);
    if (!questions) { return; }
    debugger;
    this.localQuestion = this.sortFields(questions);
    this.localQuestion = this.dynformService.inputTypeConstructor(this.localQuestion);
    this.buildForm(this.localQuestion);
    this.cd.detectChanges();
    this.watchFieldsChanges();
  }

  watchFieldsChanges(): any {
    Object.keys(this.form.controls).forEach(controlKey => {
      this.form
        .get(controlKey)
        .valueChanges
        .pipe(
          takeUntil(this.destroy$),
          distinctUntilChanged(),
          map(data => {
            if (this.questions.controlType === 'questionTextbox' && this.questions.type === 'number') {
              return parseInt(data, 10);
            } else {
              return data;
            }
          }))
        .subscribe( (data) => this.dispatchChanges({[controlKey]: data}));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  dispatchChanges(opts = {}): void {
    const val = {...this.form.value, ...opts};
    this.fieldChanged.emit({ field: Object.keys(opts)[0], value: Object.values(opts)[0]});
    this.formChanged.emit({ value: val, valid: this.form.valid });
  }

  buildForm(itens: Array<QuestionBaseInterface>): void {
    const tempFields = itens.reduce((acc, field) => {
      if (field.controlType === QuestionsEnum.LIST ) {
        return this.buildList(field, acc);
      } else if (field.controlType === QuestionsEnum.CHECKBOX ) {
        return this.buildCheckboxes(field, acc);
      } else {
        return this.buildInputs(field, acc);
      }
    }, {});
    this.form = this.fb.group(tempFields);
  }

  private buildInputs( field: QuestionBaseInterface, acc: any): {[key: string]: FormControl}{
    return {
      [field.key]: new FormControl({
        value: field.value,
        disabled: field.disabled,
      }, Validators.compose([
        field.required ? Validators.required : null,
        field.min ? Validators.min(field.min) : null,
        field.max ? Validators.max(field.max) : null,
        field.minLength ? Validators.minLength(field.minLength) : null,
        field.maxLength ? Validators.maxLength(field.maxLength) : null,
      ])),
      ...acc
    };
  }

  private buildCheckboxes( field: CheckboxQuestionInterface, acc: any): {[key: string]: FormGroup}{
    return {
      [field.key]: new FormControl({
        value: field.value,
        disabled: field.disabled,
      }),
      ...acc
    };
  }

  private buildList( field: CheckboxQuestionInterface, acc: any): {[key: string]: FormGroup}{
    // Runs over each idnex
    const groupArr = field.list.map( (group, ind) => {
      // For each Group in the array list, runs over fields
      const fields = Object.keys(group).reduce( (ac, fieldKey) => {
        const subField = group[fieldKey];
        if (subField.controlType === QuestionsEnum.CHECKBOX ) {
          return this.buildCheckboxes(subField, ac);
        } else {
          return this.buildInputs(subField, ac);
        }
      }, {});
      return new FormGroup({...fields});
    });

    return {
      [field.key]: new FormArray([...groupArr]),
      ...acc
    };
  }


}
