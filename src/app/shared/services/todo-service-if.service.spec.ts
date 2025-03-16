import { TestBed } from '@angular/core/testing';

import { TodoServiceIFService } from './todo-service-if.service';

describe('TodoServiceIFService', () => {
  let service: TodoServiceIFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoServiceIFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
