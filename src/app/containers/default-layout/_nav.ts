import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: ''
    }
  },
  {
    name: 'Manage Users',
    url: '/manage-users',
    iconComponent: { name: 'cil-user' }, // Use cil-user icon for Manage Users
    badge: {
      color: 'primary',
      text: ''
    }
  },
  {
    name: 'Settings',
    url: '/settings',
    iconComponent: { name: 'cil-settings' }, // Use cil-settings icon for Settings
    badge: {
      color: 'primary',
      text: ''
    }
  },
  {
    name: 'Book Catalog',
    url: '/book-management',
    iconComponent: { name: 'cilBasket'}, // Use cil-book icon for Book Catalog
    badge: {
      color: 'primary',
      text: ''
    }
  },
  {
    name: 'Borrow & Return Books',
    url: '/borrow-return-books',
    iconComponent: { name: 'cilEnvelopeOpen' }, // Use cil-library icon for Borrow & Return Books
    badge: {
      color: 'primary',
      text: ''
    }
  },
  {
    name: 'Fine Management',
    url: '/manage-fine',
    iconComponent: { name: 'cilCreditCard' }, // Use cil-money icon for Fine Management
    badge: {
      color: 'primary',
      text: ''
    }
  },
  {
    name: 'Report',
    url: '/report',
    iconComponent: { name: 'cil-chart-pie' }, // Use cil-chart-pie icon for Report
    badge: {
      color: 'primary',
      text: ''
    }
  }
];
