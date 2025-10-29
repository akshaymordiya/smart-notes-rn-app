import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notesReducer from '../features/notes/notesSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
});
