import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardStore } from '../../store/dashboard.store';
import { SummaryCards } from '../summary-cards/summary-cards';
import { Messages } from '../../../../core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    SummaryCards,
  ],
  providers: [DashboardStore],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  readonly store = inject(DashboardStore);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.store.loadSummary();
  }

  onProcessReminders(): void {
    this.store.processReminders();
    setTimeout(() => {
      if (!this.store.processingReminders()) {
        this.store.loadSummary();
        this.snackBar.open(Messages.REMINDER_SUCCESS, Messages.OK, { duration: 4000 });
      }
    }, 3000);
  }
}
