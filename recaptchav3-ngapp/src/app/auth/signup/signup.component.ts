import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'sv-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  token: string = '';
  formData: any = {}; // Initialize an empty object for form data

  constructor(private recaptchaV3Service: ReCaptchaV3Service, private http: HttpClient) {
  }

  ngOnInit() {
    console.log('Signup component initialized!');

    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token: string) => {
        this.token = token;
        console.log(`Token [${token}] generated`);
      });
  }

  onSubmit() {

    console.log('Form data', this.formData);
    
    // Send the form data including the token to your /register endpoint
    // Replace 'your_api_endpoint' with the actual API endpoint URL
    this.http.post('your_api_endpoint/register', this.formData)
      .subscribe((response) => {
        console.log('Registration successful', response);
        // Handle success response here
      }, (error) => {
        console.error('Registration failed', error);
        // Handle error response here
      });
  }

}
