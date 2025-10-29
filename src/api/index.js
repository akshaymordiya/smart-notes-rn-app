import agent from './agent';
import { ENDPOINTS } from './endpoints';

export const signIn = (payload) => agent.post(ENDPOINTS.AUTH.SIGN_IN, payload);
export const signUp = (payload) => agent.post(ENDPOINTS.AUTH.SIGN_UP, payload);
export const verifyOtp = (payload) =>
  agent.post(ENDPOINTS.AUTH.VERIFY_OTP, payload);
export const forgotPassword = (payload) =>
  agent.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, payload);
export const resetPassword = (payload) =>
  agent.post(ENDPOINTS.AUTH.RESET_PASSWORD, payload);

export const fetchNotes = (params) => agent.get(ENDPOINTS.NOTES.BASE, params);
export const createNote = (payload) =>
  agent.post(ENDPOINTS.NOTES.BASE, payload);
export const updateNote = (id, payload) =>
  agent.put(`${ENDPOINTS.NOTES.BASE}/${id}`, payload);
export const deleteNote = (id) => agent.del(`${ENDPOINTS.NOTES.BASE}/${id}`);
export const uploadFile = (payload) => agent.post(ENDPOINTS.FILES, payload);
