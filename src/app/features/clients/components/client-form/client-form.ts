import { Component, inject, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientStore } from '../../store/client.store';

@Component({
  selector: 'app-client-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss',
})
export class ClientForm {
  private fb = inject(FormBuilder);
  readonly store = inject(ClientStore);

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    document_number: ['', [Validators.required]],
    phone: ['', [Validators.required]],
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
    this.store.createClient(this.form.getRawValue() as any);
  }
}
