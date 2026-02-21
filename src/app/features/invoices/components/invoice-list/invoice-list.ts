import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { InvoiceStore } from '../../store/invoice.store';

@Component({
  selector: 'app-invoice-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.scss',
})
export class InvoiceList {
  readonly store = inject(InvoiceStore);
  displayedColumns = ['invoice_number', 'amount', 'due_date', 'status', 'description'];

  onPageChange(event: PageEvent): void {
    this.store.loadInvoices({ page: event.pageIndex + 1, pageSize: event.pageSize });
  }
}
