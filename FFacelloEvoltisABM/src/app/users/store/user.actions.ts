import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

// Load Single User
export const loadUser = createAction(
  '[User] Load User',
  props<{ id: number }>()
);
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);

export const createUser = createAction(
  '[User] Create User',
  props<{ user: User }>()
);
export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: User }>()
);
export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: number }>()
);
export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);

export const selectUser = createAction(
  '[User] Select User',
  props<{ userId: number | null }>()
);