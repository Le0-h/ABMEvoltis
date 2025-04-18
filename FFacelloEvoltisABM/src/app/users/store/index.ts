import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './user.reducer';

export interface UserFeatureState {
  users: fromUser.UserState;
}

export const reducers: ActionReducerMap<UserFeatureState> = {
  users: fromUser.userReducer,
};