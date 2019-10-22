import { async, TestBed } from '@angular/core/testing';
import { ApiDataAccessModule } from './api-data-access.module';

describe('ApiDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApiDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ApiDataAccessModule).toBeDefined();
  });
});
