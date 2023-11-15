import { TestBed } from '@angular/core/testing';

import { RecaptchaTokenService } from './recaptcha-token.service';

describe('RecaptchaTokenService', () => {
  let service: RecaptchaTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecaptchaTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
