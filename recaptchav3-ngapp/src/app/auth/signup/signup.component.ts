import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import RecaptchaResponse from '../../interfaces/RecaptchaResponse'; // Import the RecaptchaResponse interface
import { RecaptchaTokenService } from 'src/app/services/recaptcha-token.service';

@Component({
  selector: 'sv-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  token?: string = '';
  formData: any = {}; // Initialize an empty object for form data
  success: boolean | undefined; // Add a property for success
  score: number | undefined;    // Add a property for score
  errorCodes: string[] = [];    // Add a property for error codes

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private recaptchaTokenService: RecaptchaTokenService) {
  }

  async ngOnInit() {
    console.log('Signup component initialized at ', new Date().toTimeString());
  }

  onSubmit() {
    console.log('Form data', this.formData);

    // Send the form data including the token to your /register endpoint
    // Replace 'your_api_endpoint' with the actual API endpoint URL
    // https://localhost:7199/signup - .NET 8
    // http://localhost:6060/signup - NodeJS TypeScrip

    const dotNetURL = 'https://localhost:7199/signup';
    const nodeJsURL = 'http://localhost:6060/signup';

    this.recaptchaTokenService.getRecaptchaToken()
      .then((token: string | undefined) => {
        if (token) {
          this.formData.recaptchaToken = token;

          this.http.post(nodeJsURL, this.formData)
            .subscribe((response: any) => {
              console.log('POST response:', response);
              const parsedResponse: RecaptchaResponse = response as RecaptchaResponse;
              console.log('Registration successful', response, parsedResponse.data.score);

              // Remove newline characters from the data property
              const parsedData = (typeof response.data === 'object') ? response.data : JSON.parse(response.data.replace(/\n/g, ''));

              // Now, parsedData contains the JSON object without newline characters
              console.log(parsedData);

              // Access the success and score properties from parsedData
              this.success = parsedData.success;
              this.score = parsedData.score;

              if (!this.success) {
                this.errorCodes = parsedData['error-codes'];
              }

              // Handle success response here
            }, (error) => {
              console.error('Registration failed', error);
              // Handle error response here
            });
        }
        console.log(`onSubmit() :: Token [${token}] generated at ${new Date().toTimeString()}`);
      });

  }

}


// // This function should make synchronous calls to the recaptchaV3Service
// async getRecaptchaToken() {
//   this.token = await this.recaptchaV3Service.execute('importantAction').toPromise();
//   this.cdr.detectChanges();
//   this.formData.recaptchaToken = this.token; // Set the token in the form
//   console.log(`getRecaptchaToken() :: Token [${this.token}] generated at ${new Date().toTimeString()}`);

// }

// async getRecaptchaTokenV2() {
//   return await this.recaptchaV3Service.execute('importantAction').toPromise();
// }


// this.getRecaptchaToken();
// console.log(`ngOnInit() :: Token [${this.token}] generated at ${new Date().toTimeString()}`);

// this.token = await this.getRecaptchaTokenV2();
// console.log(`ngOnInit() :: Token V2 [${this.token}] generated at ${new Date().toTimeString()}`);
// this.formData.recaptchaToken = this.token; // Set the token in the form

// this.token = await this.recaptchaV3Service.execute('importantAction').toPromise();
// console.log(`ngOnInit() :: Token V3 [${this.token}] generated at ${new Date().toTimeString()}`);
// this.formData.recaptchaToken = this.token; // Set the token in the form

// this.recaptchaV3Service.execute('importantAction')
//   .subscribe((token: string) => {
//     this.token = token;
//     this.formData.recaptchaToken = token; // Set the token in the form
//     console.log(`Token [${token}] generated at ${new Date().toTimeString()}`);
//   });

// console.log('Token', this.token, 'at ', new Date().toTimeString());
