import { ENDPOINTS } from '../api/endpoints';
import { MockDB } from './notes.mock';

let started = false;

export const mockAgent = {
  get: async (url, opts) => {
    if (url.startsWith(ENDPOINTS.NOTES.BASE)) {
      const parts = url.split('/').filter(Boolean);
      const id = parts.length > 1 ? parts[1] : null;
      if (id) return { data: MockDB.get(id) };
      return { data: MockDB.list() };
    }
    return { data: {} };
  },
  post: async (url, body) => {
    if (url === ENDPOINTS.AUTH.SIGN_IN) {
      return {
        data: { token: 'mock-token', user: { id: 'u1', email: body.email } },
      };
    }
    if (url === ENDPOINTS.AUTH.SIGN_UP) {
      return {
        data: { token: 'mock-token', user: { id: 'u1', email: body.email } },
      };
    }
    if (url === ENDPOINTS.NOTES.BASE) {
      const note = MockDB.create(body);
      return { data: note };
    }
    if (url === ENDPOINTS.FILES) {
      return { data: { id: Date.now().toString(), ...body } };
    }
    return { data: {} };
  },
  put: async (url, body) => {
    if (url.startsWith(ENDPOINTS.NOTES.BASE)) {
      const id = url.split('/').filter(Boolean).pop();
      const updated = MockDB.update(id, body);
      return { data: updated };
    }
    return { data: {} };
  },
  del: async (url) => {
    if (url.startsWith(ENDPOINTS.NOTES.BASE)) {
      const id = url.split('/').filter(Boolean).pop();
      const ok = MockDB.delete(id);
      return { data: { ok } };
    }
    return { data: {} };
  },
};

export function startMock() {
  if (started) return;
  started = true;
}

export function stopMock() {
  started = false;
}
