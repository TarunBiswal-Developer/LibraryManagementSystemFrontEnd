import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  userName: string | undefined; // Variable to hold the username

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService,
    private jwtHelper: JwtHelperService // Inject JwtHelperService
  ) {
    super();
  }

  ngOnInit(): void {
    const token = this.authService.currentUserValue?.token;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']; // Adjust this based on your token structure
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
