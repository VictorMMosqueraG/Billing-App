import { Injectable, inject }    from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }             from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, ApiUrl, Client, CreateClientRequest, PaginatedResponse, PaginationParams } from '../../../core';


@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly http    = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/${ApiUrl.Client}`;

  getAll(params: PaginationParams): Observable<PaginatedResponse<Client[]>> {
    const httpParams = new HttpParams()
      .set('page',     params.page)
      .set('pageSize', params.pageSize)
      .set('sort',     params.sort  ?? '')
      .set('order',    params.order ?? '');

    return this.http.get<PaginatedResponse<Client[]>>(this.baseUrl, { params: httpParams });
  }

  create(body: CreateClientRequest): Observable<ApiResponse<Client>> {
    return this.http.post<ApiResponse<Client>>(this.baseUrl, body);
  }
}
