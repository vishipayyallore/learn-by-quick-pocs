import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaTokenService {

  token$ = new Subject<string>();

  constructor(private recaptchaV3Service: ReCaptchaV3Service) {
  }

  getRecaptchaToken() {
    this.recaptchaV3Service.execute('importantAction')
      .pipe(first())
      .subscribe((token) => {
        console.log(`getRecaptchaToken() :: Token [${token}] generated at ${new Date().toTimeString()}`);
        this.token$.next(token);
      });
  }

}
