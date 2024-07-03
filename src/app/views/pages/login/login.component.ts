import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  apiData: any;
  loading = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  loginUser(username: string, password: string) {
    this.loading = true;
    this.authService.login(username, password).subscribe(
      (response: any) => {
       // console.log('Login response:', response);
        this.apiData = response;
        if (this.authService.isAuthenticated()) {
          const token = this.authService.currentUserValue?.token;
          if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if (userRole === 'Librarian' || userRole === 'Student' || userRole === 'Member') {
              this.router.navigate(['/dashboard']);
            } else {
              this.errorMessage = 'Invalid user role.';
            }
          } else {
            this.errorMessage = 'Authentication failed.';
          }
        } else {
          this.errorMessage = 'User not authenticated.';
        }

        this.loading = false;
      },
      (error: HttpErrorResponse) => {
       // console.error('Login error:', error);
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = 'Network error: Please check your internet connection.';
        } else {
          if (error.status === 400) {
            this.errorMessage = 'Invalid credentials. Please try again.';
          } else {
            this.errorMessage = 'Network error: Please check your internet connection.';
          }
        }
        this.loading = false;
      }
    );
  }
}
