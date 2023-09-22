import { Component, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'sv-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  token: string = '';

  constructor(private recaptchaV3Service: ReCaptchaV3Service) {
  }

  ngOnInit() {
    console.log('App component initialized!');

    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token: string) => {
        this.token = token;
        console.log(`Token [${token}] generated`);
      });
  }

}
