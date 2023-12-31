import { Component, OnInit } from '@angular/core';
import { SignUpService } from 'src/app/services/sign-up.service';

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

  constructor(private signUpService: SignUpService) {
  }

  async ngOnInit() {
    console.log('Signup component initialized at ', new Date().toTimeString());
  }

  onSubmit() {
    console.log('Form data', this.formData);

    this.signUpService.signup(this.formData).subscribe(({ success, data, error }) => {
      if (success) {
        this.onSignupSuccess(data);
      } else {
        this.onSignupError(error);
      }
    });
  }

  onSignupError(error: any) {
    this.success = false;
    this.score = -1;

    console.error('Registration failed', error);
  }

  onSignupSuccess(parsedData: any) {
    this.success = parsedData.success;
    this.score = parsedData.score;
  }

}

// const dotNetURL = 'https://localhost:7199/signup';
//     const nodeJsURL = 'http://localhost:6060/signup';

// this.recaptchaTokenService.getRecaptchaToken();

// this.recaptchaTokenService.token$.pipe(first())
// .subscribe((token: string | undefined) => {

//   if (token) {
//     this.formData.recaptchaToken = token;

//     // Never do this in production! Component should only render UI
//     // Service should handle the API calls
//     this.http.post(nodeJsURL, this.formData)
//       .subscribe({
//         next: (response: any) => {
//           console.log('POST response:', response);
//           const parsedResponse: RecaptchaResponse = response as RecaptchaResponse;
//           console.log('Registration successful', response, parsedResponse.data.score);

//           // Remove newline characters from the data property
//           const parsedData = (typeof response.data === 'object') ? response.data : JSON.parse(response.data.replace(/\n/g, ''));

//           // Now, parsedData contains the JSON object without newline characters
//           console.log(parsedData);

//           // Access the success and score properties from parsedData
//           this.success = parsedData.success;
//           this.score = parsedData.score;

//           if (!this.success) {
//             this.errorCodes = parsedData['error-codes'];
//           }
//         },
//         error: (error) => {
//           console.error('Registration failed', error);
//           // Handle error response here
//         }
//       });
//   }
//   console.log(`onSubmit() :: Token [${token}] generated at ${new Date().toTimeString()}`);
// });


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
