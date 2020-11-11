import { Component, OnDestroy, ViewChild } from '@angular/core';
import { QuestionBaseInterface, QuestionsEnum } from 'ng-json-form';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { filter, map, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { questions as initialQuestions } from './questions';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    title = 'ngJsonFormTestApp';
    public ObjectKeys = Object.keys;
    public builderQuestions = {};
    public fieldSelected$: BehaviorSubject<string> = new BehaviorSubject(null);
    public selectFields: any;
    public destroy$: Subject<boolean> = new Subject();
    public questions: BehaviorSubject<{[key: string]: any}> = new BehaviorSubject({});
    public defaultSelectFields = {
        controlType: 'questionDropdown',
        label: 'Qual campo deseja Editar',
        required: false,
        trackKey: 'key',
        viewValue: 'label',
        helpText: 'Campo selecionado esta a esquerda',
        value: null,
        size: 12,
    };
    debunceRunning = false;

    public options = new JsonEditorOptions();

    constructor(){
        this.startAll();
        this.options.mode = 'code';
        this.options.mainMenuBar = false;
    }
    rawUpdateQuestion(elm) {
        if(this.debunceRunning) return;
        const questionNewValue = elm.editor.get();
        this.questions.next(questionNewValue);
        this.debunceRunning = true;
        setTimeout(()=> this.debunceRunning = false, 3000)
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    startAll(): void {
        this.questions.next(initialQuestions);
        this.selectFields = {
            fields: {
                ...this.defaultSelectFields,
                options: this.questions.pipe(
                    map(data =>  Object.keys(data).map( it => ({label: data[it].label, key: it})) )
                )
            }
        };

        this.watchFieldChange();
    }

    watchFieldChange(): void {
        combineLatest([this.fieldSelected$, this.questions]).subscribe(([field, obsQuestions]) => {
                const newData = this.buildBasicFields({...obsQuestions[field]});
                this.builderQuestions = newData;
            });
    }

        public log(event): void {
            console.log(event);
        }

        public updateQuestionValue( prop: { field: string, value: any }): void {
            // debugger;
            if (!prop.field) { return; }
            this.questions.pipe(take(1)).subscribe(ObsQuestions => {
                this.questions.next({
                    ...ObsQuestions,
                    [prop.field]: {
                        ...ObsQuestions[prop.field],
                        value: prop.value,
                    }
                });
            });
        }

        setFieldActive(field: any): void {
            if (field && field.value && field.value.fields && field.value.fields.key ) {
                this.fieldSelected$.next(field.value.fields.key);
            } else {
                this.fieldSelected$.next(null);
            }
        }

    

        updateQuestion(key: string, prop: { field: string, value: any }): void {
            if (!prop.field) { return; }
            this.questions.pipe(take(1)).subscribe(ObsQuestions => {
                let newVal = {
                    ...ObsQuestions[key],
                    [prop.field]: prop.value,
                };
                if(prop.field === 'type') {
                    newVal.value = null;
                }
                this.questions.next({
                    ...ObsQuestions,
                    [key]: newVal
                });
            });
        }

        updateOption(key: string, index: number, elm, event): void {
            if (!key) { return; }
            try {
                const optionValue = elm.editor.get();
                this.questions.pipe(take(1)).subscribe(ObsQuestions => {
                    let newOptions = [ ...(ObsQuestions[key]?.options || [] ) ]
                        newOptions[index] = optionValue;
                    const temp = {
                        ...ObsQuestions,
                        [key]: {
                            ...ObsQuestions[key],
                            options: newOptions,
                        }
                    }
                    this.questions.next(temp);
                });
            } catch (error) {
                alert(error);
            }

            
            
        }

        addOption(key: string): void {
            if (!key) { return; }
            this.questions.pipe(take(1)).subscribe(ObsQuestions => {
                this.questions.next({
                    ...ObsQuestions,
                    [key]: {
                        ...ObsQuestions[key],
                        options: [...(ObsQuestions[key].options || []), {}],
                    }
                });
            });
        }

        removeOption(key: string, index: number): void {
            if (!key) { return; }
            this.questions.pipe(take(1)).subscribe(ObsQuestions => {
                let newOptions = [ ...(ObsQuestions[key]?.options || [] ) ]
                    newOptions.splice(index, 1)
                const temp = {
                    ...ObsQuestions,
                    [key]: {
                        ...ObsQuestions[key],
                        options: newOptions,
                    }
                }
                this.questions.next(temp);
            });
        }

        buildBasicFields(par?: QuestionBaseInterface): any {
            const basic = {
                key: {
                    controlType: 'questionTextbox',
                    label: 'Key',
                    key: 'key',
                    maxLength: 30,
                    minLength: 1,
                    required: true,
                    order: 1,
                    size: 12,
                    type: 'text',
                    value: par?.key || null,
                    readonly: true,
                    disabled: true,
                },
                label: {
                    controlType: 'questionTextbox',
                    label: 'Label',
                    key: 'label',
                    minLength: 1,
                    maxLength: 30,
                    required: true,
                    order: 2,
                    size: 12,
                    type: 'text',
                    value: par?.label || null,
                },
                value: {
                    controlType: 'questionTextarea',
                    label: 'Value',
                    key: 'value',
                    minLength: 1,
                    maxLength: 30,
                    required: false,
                    order: 2,
                    disabled: true,
                    size: 12,
                    type: 'text',
                    value: par?.value ? JSON.stringify(par.value, null, 4) : null,
                },
                controlType: {
                    controlType: 'questionRadio',
                    label: 'Tipo de controle',
                    required: true,
                    key: 'controlType',
                    trackKey: 'value',
                    viewValue: 'label',
                    order: 3,
                    value: par?.controlType || null,
                    size: 12,
                    options: [
                        {label: 'CHECKBOX', value: 'questionCheckbox'},
                        {label: 'RADIO', value: 'questionRadio'},
                        {label: 'DROPDOWN', value: 'questionDropdown'},
                        {label: 'RANGE', value: 'questionRange'},
                        {label: 'TEXTAREA', value: 'questionTextarea'},
                        {label: 'TEXTBOX', value: 'questionTextbox'},
                    ],
                },
                helpText: {
                    controlType: 'questionTextarea',
                    label: 'Help Text',
                    key: 'helpText',
                    maxLength: 120,
                    minLength: 1,
                    required: false,
                    order: 4,
                    size: 12,
                    type: 'text',
                    value: par?.helpText || null,
                },
                size: {
                    key: 'size',
                    controlType: 'questionRange',
                    step: 1,
                    min: 0,
                    order: 5,
                    max: 12,
                    size: 12,
                    value: par?.size || null,
                    required: false,
                    label: 'Size',
                },
                required: {
                    key: 'required',
                    controlType: 'questionCheckbox',
                    label: 'Required',
                    order: 6,
                    size: 4,
                    required: false,
                    value: par?.required || null,
                },
                disabled: {
                    key: 'disabled',
                    controlType: 'questionCheckbox',
                    label: 'Disabled',
                    required: false,
                    order: 6,
                    size: 4,
                    value: par?.disabled || null,
                },
                readonly: {
                    key: 'readonly',
                    controlType: 'questionCheckbox',
                    label: 'Read Only',
                    required: false,
                    order: 6,
                    size: 4,
                    value: par?.readonly || null,
                },
                order: {
                    key: 'order',
                    controlType: 'questionTextbox',
                    label: 'Order',
                    maxLength: 100,
                    minLength: 1,
                    required: false,
                    order: 3,
                    size: 6,
                    type: 'number',
                    value: par?.order || null,
                },
                placeholder: {
                    key: 'placeholder',
                    controlType: 'questionTextbox',
                    label: 'Placeholder',
                    maxLength: 100,
                    minLength: 1,
                    required: false,
                    order: 3,
                    size: 6,
                    type: 'string',
                    value: par?.placeholder || null,
                }
            };

            if (par && par.controlType === QuestionsEnum.RADIO) {
                return { ...basic, ...this.buildRadioQuestion(par) };
            } else if (par && par.controlType === QuestionsEnum.TEXTBOX) {
                return { ...basic, ...this.buildTextboxQuestion(par) };
            } else {
                return basic;
            }
        }


        buildTextboxQuestion(par?): any {
            return {
                type: {
                    controlType: 'questionRadio',
                    label: 'Input-Type',
                    required: true,
                    key: 'type',
                    trackKey: 'value',
                    viewValue: 'label',
                    order: 2,
                    value: par?.type || null,
                    size: 12,
                    options: [
                        { label: 'Text', value:'text'},
                        { label: 'Password', value:'password'},
                        { label: 'Email', value:'email'},
                        { label: 'Number', value:'number'},
                        { label: 'Search', value:'search'},
                        { label: 'Tel', value:'tel'},
                        { label: 'File', value:'file'},
                        { label: 'Image', value:'image'},
                        { label: 'URL', value:'url'}
                    ],
                }
            };
        }

        buildRadioQuestion(par?): any {
            const fields = {
                trackKey: {
                    controlType: 'questionRadio',
                    label: 'Track Key',
                    required: true,
                    key: 'trackKey',
                    trackKey: 'value',
                    viewValue: 'label',
                    order: 3,
                    value: par?.trackKey || null,
                    size: 6,
                    options: this.getOptionsAsKeyValueOptions(par),
                },
                viewValue: {
                    controlType: 'questionRadio',
                    label: 'View Value',
                    required: true,
                    key: 'viewValue',
                    trackKey: 'value',
                    viewValue: 'label',
                    order: 3,
                    value: par?.viewValue || null,
                    size: 6,
                    options: this.getOptionsAsKeyValueOptions(par),
                }
            };
            return fields;
        }

    private getOptionsAsKeyValueOptions(par: any) {
        if (!par || !par.options || par.options.length === 0) return [];
        return Object.keys(par.options[0]).map(k => ({ value: k, label: k }));
    }


}
