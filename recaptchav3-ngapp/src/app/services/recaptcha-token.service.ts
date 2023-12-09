import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaTokenService {

  token$ = new Subject<string>();

  constructor(private recaptchaV3Service: ReCaptchaV3Service) {
  }

  getRecaptchaToken(): Observable<string> {
    return this.recaptchaV3Service.execute('importantAction');
  }

}
