import { Routes } from '@angular/router';

export const INVOICES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/invoice-page/invoice-page')
        .then(m => m.InvoicePage)
  }
];
