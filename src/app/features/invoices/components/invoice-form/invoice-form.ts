import { Component, inject, effect, input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../../../core';
import { InvoiceStore } from '../../store/invoice.store';

@Component({
  selector: 'app-invoice-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss',
})
export class InvoiceForm {
  clients = input<Client[]>([]);

  private fb = inject(FormBuilder);
  readonly store = inject(InvoiceStore);

  form = this.fb.group({
    client_id: ['', [Validators.required]],
    invoice_number: ['', [Validators.required]],
    amount: [null as number | null, [Validators.required, Validators.min(1)]],
    due_date: [null as Date | null, [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      if (this.store.saved()) {
        this.form.reset();
        this.store.resetSaved();
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    this.store.createInvoice({
      client_id: raw.client_id!,
      invoice_number: raw.invoice_number!,
      amount: raw.amount!,
      due_date: (raw.due_date as Date).toISOString(),
      description: raw.description!,
    });
  }
}
