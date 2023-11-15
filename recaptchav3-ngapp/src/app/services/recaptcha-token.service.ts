import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaTokenService {

  constructor(private recaptchaV3Service: ReCaptchaV3Service) {
  }

  async getRecaptchaToken() {
    return this.recaptchaV3Service.execute('importantAction').toPromise();
  }

}
