import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_BASE_URL } from 'api.config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage: string = '';
  password: string = '';
  repeatPassword: string = '';
  email: string = '';

  constructor(private http: HttpClient) {}

  registerLibrarian(email: string, password: string, repeatPassword: string) {
    if (email === '' || password === '' || repeatPassword === '') {
      this.errorMessage = 'Input Fields cannot be blank';
      return;
    }
    if (password !== repeatPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    // API call to create librarian
    const endpoint = `${API_BASE_URL}Librarian/createLibrarian`;
    this.http
      .post(endpoint, { email, password }, { responseType: 'text' })
      .subscribe(
        (response: string) => {
          // console.log('API Response:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response,
          }).then(() => {
            email = ' ';
            password = ' ';
            repeatPassword = ' ';
            this.errorMessage = '';
          });
        },
        (error: HttpErrorResponse) => {
          // console.error('API Error:', error);
          if (error.error && typeof error.error === 'string') {
            try {
              const parsedError = JSON.parse(error.error);
              if (Array.isArray(parsedError)) {
                const errors = parsedError
                  .map((err) => err.description)
                  .join(' ');
                this.errorMessage = errors;
              } else {
                this.errorMessage = 'An unknown error occurred.';
              }
            } catch (parseError) {
              this.errorMessage = 'User Already Exists.';
            }
          } else {
            this.errorMessage = 'Failed to register Librarian';
          }
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: this.errorMessage,
          }).then((res) => {
            email = ' ';
            password = ' ';
            repeatPassword = ' ';
            this.errorMessage = '';
          });
        }
      );
  }
}
