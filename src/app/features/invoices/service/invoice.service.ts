import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../../core/models/response/api.response';
import { PaginationParams } from '../../../core/models/response/pagination.params';
import { PaginatedResponse } from '../../../core/models/response/pagination.response';
import { ApiUrl, CreateInvoiceRequest, Invoice } from '../../../core';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/${ApiUrl.Invoice}`;


  getAll(params: PaginationParams): Observable<PaginatedResponse<Invoice[]>> {
    const httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);
    return this.http.get<PaginatedResponse<Invoice[]>>(this.baseUrl, {
      params: httpParams,
    });
  }

  create(body: CreateInvoiceRequest): Observable<ApiResponse<Invoice>> {
    return this.http.post<ApiResponse<Invoice>>(this.baseUrl, body);
  }
}
