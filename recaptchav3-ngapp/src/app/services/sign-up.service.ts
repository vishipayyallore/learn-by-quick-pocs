import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import RecaptchaResponse from '../interfaces/RecaptchaResponse';
import { RecaptchaTokenService } from './recaptcha-token.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  // const dotNetURL = 'https://localhost:7199/signup';
  readonly NODE_JS_URL = 'http://localhost:6060/signup';

  constructor(private http: HttpClient, private recaptchaTokenService: RecaptchaTokenService) { }

  private requestSignUp<T>(formData: any): Observable<T> {
    return this.recaptchaTokenService
      .getRecaptchaToken()
      .pipe(
        switchMap((token: string, _) => {
          formData.recaptchaToken = token;

          return this.http.post<T>(this.NODE_JS_URL, formData);
        })
      );
  }

  signup(formData: any) {
    return this.requestSignUp<any>(formData).pipe(
      map((response: any) => {
        console.log('POST response:', response);
        const parsedResponse: RecaptchaResponse = response as RecaptchaResponse;
        console.log('Registration successful', response, parsedResponse.data.score);

        // Remove newline characters from the data property
        const parsedData = (typeof response.data === 'object') ? response.data : JSON.parse(response.data.replace(/\n/g, ''));

        console.log({ parsedData });

        return { success: true, data: parsedData, error: null };
      }),
      catchError((error: any) => {
        console.error('Registration failed', error);
        return of({ success: false, data: null, error });
      }
      )
    );
  }

}

// private onSignUpRequest(formData: any) {
//   this.requestSignUp<any>(formData).subscribe({
//     next: (response: any) => {
//       console.log('POST response:', response);
//       const parsedResponse: RecaptchaResponse = response as RecaptchaResponse;
//       console.log('Registration successful', response, parsedResponse.data.score);

//       // Remove newline characters from the data property
//       const parsedData = (typeof response.data === 'object') ? response.data : JSON.parse(response.data.replace(/\n/g, ''));

//       // Now, parsedData contains the JSON object without newline characters
//       console.log(parsedData);

//       this.signupParsedData$.next(parsedData);
//     },
//     error: (error) => {
//       console.error('Registration failed', error);
//       // Handle error response here
//     }
//   });
// }
