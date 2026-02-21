import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { InvoiceStore } from '../../store/invoice.store';
import { InvoiceStatusDialog } from '../invoice-status-dialog/invoice-status-dialog';
import { Invoice } from '../../../../core';

@Component({
  selector: 'app-invoice-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.scss',
})
export class InvoiceList {
  readonly store = inject(InvoiceStore);
  private dialog = inject(MatDialog);

  displayedColumns = ['invoice_number', 'amount', 'due_date', 'status', 'description', 'actions'];

  onPageChange(event: PageEvent): void {
    this.store.loadInvoices({ page: event.pageIndex + 1, pageSize: event.pageSize });
  }

  openStatusDialog(invoice: Invoice): void {
    const ref = this.dialog.open(InvoiceStatusDialog, {
      width: '400px',
      data: { invoice },
    });

    ref.afterClosed().subscribe((newStatus: string | undefined) => {
      if (newStatus && newStatus !== invoice.status) {
        this.store.updateStatus({ id: invoice.id, status: newStatus });
      }
    });
  }
}
