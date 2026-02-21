import { inject, computed } from '@angular/core';
import {
  signalStore, withState, withMethods, withComputed,
  patchState
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';

import { ClientService } from '../services/client.service';
import { ApiResponse, Client, CreateClientRequest, PaginatedResponse, PaginationParams } from '../../../core';
import { ClientState } from './interfaces/IclientState';


const initialState: ClientState = {
  clients: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  saving: false,
  error: null,
  saved: false
};

export const ClientStore = signalStore(
  withState(initialState),
  withComputed(({ total, page, pageSize, clients }) => ({
    totalPages: computed(() => Math.ceil(total() / pageSize())),
    hasNext: computed(() => page() < Math.ceil(total() / pageSize())),
    hasPrevious: computed(() => page() > 1),
    isEmpty: computed(() => clients().length === 0)
  })),

  withMethods((store, service = inject(ClientService)) => ({
    loadClients: rxMethod<PaginationParams>(
      pipe(
        tap(params => patchState(store, { loading: true, error: null, page: params.page })),
        switchMap(params =>
          service.getAll(params).pipe(
            tap((res: PaginatedResponse<Client[]>) =>
              patchState(store, { clients: res.results, total: res.total, loading: false })
            ),
            catchError((err: { message: string }) => {
              patchState(store, { error: err.message, loading: false });
              return EMPTY;
            })
          )
        )
      )
    ),

    createClient: rxMethod<CreateClientRequest>(
      pipe(
        tap(() => patchState(store, { saving: true, error: null, saved: false })),
        switchMap(body =>
          service.create(body).pipe(
            tap((res: ApiResponse<Client>) =>
              patchState(store, {
                clients: [res.results, ...store.clients()],
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

    resetSaved: () => patchState(store, { saved: false, error: null })
  }))
);
