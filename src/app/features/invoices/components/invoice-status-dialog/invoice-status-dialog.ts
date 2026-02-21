import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Invoice } from '../../../../core';

@Component({
  selector: 'app-invoice-status-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './invoice-status-dialog.html',
})
export class InvoiceStatusDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<InvoiceStatusDialog>);
  data: { invoice: Invoice } = inject(MAT_DIALOG_DATA);

  statuses = ['pendiente', 'primerrecordatorio', 'segundorecordatorio', 'desactivado', 'pagado'];

  form = this.fb.group({
    new_status: [this.data.invoice.status, [Validators.required]],
  });

  confirm(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.getRawValue().new_status);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
