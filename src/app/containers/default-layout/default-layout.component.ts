import { Component } from '@angular/core';
import { navItems } from './_nav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  userRole: string = '';
  navItems: any[] = [];

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole() || '';
    this.navItems = this.filterNavItemsByRole(this.userRole);
  }

  private filterNavItemsByRole(role: string): any[] {
    return navItems.filter((item) => {
      const itemName = item.name || '';
      switch (role) {
        case 'Librarian':
          return [
            'Manage Users',
            'Book Catalog',
            'Fine Management',
            'Borrow & Return Books',
            'Settings',
            'Report',
          ].includes(itemName);
        case 'Student':
          return ['Book Catalog', 'Report'].includes(itemName);
        case 'Member':
          return ['Book Catalog', 'Report'].includes(itemName);
        default:
          return false;
      }
    });
  }
}
