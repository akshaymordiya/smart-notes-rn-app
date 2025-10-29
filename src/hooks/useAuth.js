import { useAppDispatch, useAppSelector } from './useRedux';
import {
  signInThunk,
  signOutThunk,
  signUpThunk,
} from '../features/auth/authThunks';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, loading, error } = useAppSelector((s) => s.auth);

  return {
    user,
    token,
    loading,
    error,
    signIn: (email, password) => dispatch(signInThunk({ email, password })),
    signUp: (email, password, name) =>
      dispatch(signUpThunk({ email, password, name })),
    signOut: () => dispatch(signOutThunk()),
  };
}
