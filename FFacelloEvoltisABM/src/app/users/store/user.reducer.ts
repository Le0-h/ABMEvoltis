import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as UserActions from './user.actions';

export interface UserState {
  users: User[];
  selectedUserId: number | null;
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  selectedUserId: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.createUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.updateUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => (u.id === user.id ? user : u)),
    loading: false
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.deleteUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
    loading: false
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId
  }))
);