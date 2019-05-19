import { TestBed } from '@angular/core/testing';

import { PageProductsService } from './page-products.service';

describe('PageProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageProductsService = TestBed.get(PageProductsService);
    expect(service).toBeTruthy();
  });
});
