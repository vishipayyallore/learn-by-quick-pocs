import { Component, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'sv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'recaptchav3-ngapp';
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
