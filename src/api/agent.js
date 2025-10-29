import axios from 'axios';
import { API_BASE_URL, USE_MOCKS } from '../config';
import { mockAgent } from '../mocks/mockServer';
import { store } from '../app/store';

let api = null;

function createAxios() {
  const instance = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });
  instance.interceptors.request.use((cfg) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      cfg.headers = cfg.headers || {};
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  });
  return instance;
}

const realAgent = {
  get: (url, params) => (api ||= createAxios()).get(url, { params }),
  post: (url, body) => (api ||= createAxios()).post(url, body),
  put: (url, body) => (api ||= createAxios()).put(url, body),
  del: (url) => (api ||= createAxios()).delete(url),
};

const agent = USE_MOCKS ? mockAgent : realAgent;
export default agent;
