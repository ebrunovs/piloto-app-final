import { TestBed } from '@angular/core/testing';

import { TodoServiceIF } from './todo-service-if.service';

describe('TodoServiceIF', () => {
  let service: TodoServiceIF;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoServiceIF);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
