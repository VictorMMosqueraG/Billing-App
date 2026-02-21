import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceForm } from '../invoice-form/invoice-form';
import { InvoiceStore } from '../../store/invoice.store';
import { ClientStore } from '../../../clients/store/client.store';
import { InvoiceList } from '../invoice-list/invoice-list';

@Component({
  selector: 'app-invoice-page',
  imports: [MatCardModule, MatIconModule, InvoiceForm,InvoiceList],
  providers: [InvoiceStore, ClientStore],
  templateUrl: './invoice-page.html',
  styleUrl: './invoice-page.scss',
})
export class InvoicePage implements OnInit{
  readonly invoiceStore = inject(InvoiceStore);
  readonly clientStore = inject(ClientStore);

  ngOnInit(): void {
    this.clientStore.loadClients({ page: 1, pageSize: 100 });
    this.invoiceStore.loadInvoices({ page: 1, pageSize: 10 });
  }
}
