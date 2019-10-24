import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@ngx-sm/flux';

export const getState = createFeatureSelector<AppState>('state');
export const getTitle = createSelector(getState, state => state.title);
export const getLoading = createSelector(getState, state => state.loading);
export const getQuantity = createSelector(getState, state => state.order.quantity);
export const getError = createSelector(getState, state => state.error);

