import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signUp } from '../../api';

export const signInThunk = createAsyncThunk('auth/signIn', async (payload) => {
  const res = await signIn(payload);
  return res.data;
});

export const signUpThunk = createAsyncThunk('auth/signUp', async (payload) => {
  const res = await signUp(payload);
  return res.data;
});

export const signOutThunk = createAsyncThunk('auth/signOut', async () => true);
