import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { InvoiceSummary, ProcessRemindersResult } from '../../../core/models/dashboard';
import { ApiUrl } from '../../../core';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;



  getSummary(): Observable<InvoiceSummary> {
    return this.http
      .get<{ results: InvoiceSummary; message: string }>(`${this.baseUrl}/${ApiUrl.Invoice}/${ApiUrl.Summary}`)
      .pipe(map(r => r.results));
  }

  processReminders(): Observable<ProcessRemindersResult> {
    return this.http
      .post<{ results: ProcessRemindersResult; message: string }>(`${this.baseUrl}/${ApiUrl.Billing}/${ApiUrl.ProcessReminders}`, {})
      .pipe(map(r => r.results));
  }
}
