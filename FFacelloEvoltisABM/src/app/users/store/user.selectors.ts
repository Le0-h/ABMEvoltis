import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { UserFeatureState } from './index';

// Primero seleccionamos el feature state completo
export const selectUserFeature = createFeatureSelector<UserFeatureState>('users');

// Luego seleccionamos el state específico de usuario
export const selectUserState = createSelector(
  selectUserFeature,
  (state: UserFeatureState) => state.users
);

// Ahora seleccionamos el array de usuarios desde el estado
export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectSelectedUserId = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectAllUsers,
  selectSelectedUserId,
  (users, selectedId) => users.find(user => user.id === selectedId) || null
);


