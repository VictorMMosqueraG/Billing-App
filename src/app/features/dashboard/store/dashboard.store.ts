import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';
import { DashboardState } from './interfaces/Idashboardstore';
import { DashboardService } from '../service/dashboard.service';

const initialState: DashboardState = {
  summary: null,
  remindersResult: null,
  loadingSummary: false,
  processingReminders: false,
  error: null,
};

export const DashboardStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(DashboardService)) => ({

    loadSummary: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingSummary: true, error: null })),
        switchMap(() =>
          service.getSummary().pipe(
            tap(summary => patchState(store, { summary, loadingSummary: false })),
            catchError((err: { message: string }) => {
              patchState(store, { error: err.message, loadingSummary: false });
              return EMPTY;
            })
          )
        )
      )
    ),

    processReminders: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { processingReminders: true, error: null, remindersResult: null })),
        switchMap(() =>
          service.processReminders().pipe(
            tap(remindersResult => patchState(store, { remindersResult, processingReminders: false })),
            catchError((err: { message: string }) => {
              patchState(store, { error: err.message, processingReminders: false });
              return EMPTY;
            })
          )
        )
      )
    ),

  }))
);
