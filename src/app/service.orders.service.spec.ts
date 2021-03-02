import { TestBed } from '@angular/core/testing';

import { Service.OrdersService } from './service.orders.service';

describe('Service.OrdersService', () => {
  let service: Service.OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service.OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
