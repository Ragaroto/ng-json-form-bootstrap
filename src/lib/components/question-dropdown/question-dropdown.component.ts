import { ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isObservable } from 'rxjs';
import {DropdownQuestionInterface } from '../../models';

@Component({
    selector: 'lib-question-dropdown',
    templateUrl: './question-dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionDropdownComponent implements OnChanges {

    @Input() form: FormGroup;
    @Input() field: DropdownQuestionInterface;
    @Input() touched: boolean;
    @Input() dirty: boolean;
    @Input() errors: any;

    public isOptionsObservable: boolean;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const opts = changes?.field?.currentValue?.options;
        if (opts) {
            if (isObservable(opts)) {
                this.isOptionsObservable = true;
            } else {
                this.isOptionsObservable = false;
            }
        }
    }

    compareWithFn(key: string): any {
        return (o1, o2) => o1 && o2 ? o1[key] === o2[key] : o1 === o2;
    }

    trackByFn(index, item): any {
        return item.key; // or item.id
    }

}
