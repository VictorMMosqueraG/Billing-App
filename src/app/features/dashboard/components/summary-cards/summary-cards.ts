import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { InvoiceSummary } from '../../../../core/models/dashboard';

@Component({
  selector: 'app-summary-cards',
  imports: [MatCardModule, MatIconModule, CurrencyPipe, TitleCasePipe],
  templateUrl: './summary-cards.html',
  styleUrl: './summary-cards.scss',
})
export class SummaryCards {
  summary = input<InvoiceSummary | null>(null);
}
