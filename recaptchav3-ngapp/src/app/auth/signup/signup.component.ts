import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { ReCaptchaV3Service } from 'ng-recaptcha';
import RecaptchaResponse from '../../interfaces/RecaptchaResponse'; // Import the RecaptchaResponse interface

@Component({
  selector: 'sv-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  token: string = '';
  formData: any = {}; // Initialize an empty object for form data
  success: boolean | undefined; // Add a property for success
  score: number | undefined;    // Add a property for score

  constructor(private recaptchaV3Service: ReCaptchaV3Service, private http: HttpClient, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log('Signup component initialized!');

    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token: string) => {
        this.token = token;
        this.formData.recaptchaToken = token; // Set the token in the form
        console.log(`Token [${token}] generated`);
      });
  }

  onSubmit() {

    console.log('Form data', this.formData);

    // Send the form data including the token to your /register endpoint
    // Replace 'your_api_endpoint' with the actual API endpoint URL
    this.http.post('https://localhost:7199/signup', this.formData)
      .subscribe((response: any) => {
        console.log('POST response:', response);
        const parsedResponse: RecaptchaResponse = response as RecaptchaResponse;
        console.log('Registration successful', response, parsedResponse.data.score);

        // Remove newline characters from the data property
        const parsedData = JSON.parse(response.data.replace(/\n/g, ''));

        // Now, parsedData contains the JSON object without newline characters
        console.log(parsedData);

        // Access the success and score properties from parsedData
        this.success = parsedData.success;
        this.score = parsedData.score;

        // Manually trigger change detection
        // this.cdr.detectChanges();

        // Handle success response here
      }, (error) => {
        console.error('Registration failed', error);
        // Handle error response here
      });

  }

}
