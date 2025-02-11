import { TestBed } from '@angular/core/testing';

import { MaterialRestService } from './material-rest.service';

describe('MaterialRestService', () => {
  let service: MaterialRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
