import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  {
    path: 'clients',
    loadChildren: () =>
      import('./features/clients/clients.routes').then(m => m.CLIENTS_ROUTES)
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./features/invoices/invoice.routes').then(m => m.INVOICES_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  }
];
