import { Component, input } from '@angular/core';
import { ClientGroup } from '../../../../core/models/dashboard';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-by-client',
  imports: [MatTableModule, MatCardModule, MatChipsModule, MatIconModule, CurrencyPipe],
  templateUrl: './invoice-by-client.html',
  styleUrl: './invoice-by-client.scss',
})
export class InvoiceByClient {
   byClient = input<ClientGroup[]>([]);
  displayedColumns = ['client_id', 'invoice_count', 'total_amount'];
}
