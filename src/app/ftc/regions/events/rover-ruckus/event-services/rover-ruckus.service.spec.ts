import { TestBed, inject } from '@angular/core/testing';

import { RoverRuckusService } from './rover-ruckus.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoverRuckusService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([RoverRuckusService], (service: RoverRuckusService) => {
    expect(service).toBeTruthy();
  }));
});
