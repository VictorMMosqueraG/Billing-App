import { inject, computed } from '@angular/core';
import {
  signalStore, withState, withMethods, withComputed,
  patchState
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';
import { ApiResponse, CreateInvoiceRequest, Invoice, PaginatedResponse, PaginationParams } from '../../../core';
import { InvoiceState } from './interfaces/IinvoiceState';
import { InvoiceService } from '../service/invoice.service';

const initialState: InvoiceState = {
  invoices: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  saving: false,
  error: null,
  saved: false
};

export const InvoiceStore = signalStore(
  withState(initialState),
  withComputed(({ total, page, pageSize, invoices }) => ({
    totalPages: computed(() => Math.ceil(total() / pageSize())),
    hasNext: computed(() => page() < Math.ceil(total() / pageSize())),
    hasPrevious: computed(() => page() > 1),
    isEmpty: computed(() => invoices().length === 0)
  })),
  withMethods((store, service = inject(InvoiceService)) => ({

    loadInvoices: rxMethod<PaginationParams>(
      pipe(
        tap(params => patchState(store, { loading: true, error: null, page: params.page })),
        switchMap(params =>
          service.getAll(params).pipe(
            tap((res: PaginatedResponse<Invoice[]>) =>
              patchState(store, { invoices: res.results, total: res.total, loading: false })
            ),
            catchError((err: { message: string }) => {
              patchState(store, { error: err.message, loading: false });
              return EMPTY;
            })
          )
        )
      )
    ),

    createInvoice: rxMethod<CreateInvoiceRequest>(
      pipe(
        tap(() => patchState(store, { saving: true, error: null, saved: false })),
        switchMap(body =>
          service.create(body).pipe(
            tap((res: ApiResponse<Invoice>) =>
              patchState(store, {
                invoices: [res.results, ...store.invoices()],
                total: store.total() + 1,
                saving: false,
                saved: true
              })
            ),
            catchError((err: { message: string }) => {
              patchState(store, { error: err.message, saving: false });
              return EMPTY;
            })
          )
        )
      )
    ),

    updateStatus: rxMethod<{ id: string; status: string }>(
      pipe(
        tap(() => patchState(store, { saving: true, error: null })),
        switchMap(({ id, status }) =>
          service.updateStatus(id, status).pipe(
            tap(() =>
              patchState(store, {
                invoices: store.invoices().map(inv =>
                  inv.id === id ? { ...inv, status } : inv
                ),
                saving: false,
                saved: true,
              })
            ),
            catchError((err: { message: string }) => {
              patchState(store, { error: err.message, saving: false });
              return EMPTY;
            })
          )
        )
      )
    ),


    resetSaved: () => patchState(store, { saved: false, error: null })
  }))


);
