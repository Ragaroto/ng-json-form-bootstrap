import { TestBed } from '@angular/core/testing';

import { NgJsonFormService } from './ng-json-form.service';

describe('NgJsonFormService', () => {
  let service: NgJsonFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgJsonFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
