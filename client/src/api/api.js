const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const getHeaders = (auth = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('adminToken');
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const request = async (url, options = {}) => {
  const res = await fetch(`${API_BASE}${url}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const api = {
  verifyToken: () => request('/auth/me', { headers: getHeaders(true) }),
  getSettings: () => request('/settings'),
  getServices: () => request('/services'),
  getGallery: () => request('/gallery'),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    }),

  updateSettings: (data) =>
    request('/settings', {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),

  createService: (data) =>
    request('/services', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),

  updateService: (id, data) =>
    request(`/services/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),

  deleteService: (id) =>
    request(`/services/${id}`, { method: 'DELETE', headers: getHeaders(true) }),

  createGallery: (data) =>
    request('/gallery', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),

  updateGallery: (id, data) =>
    request(`/gallery/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),

  deleteGallery: (id) =>
    request(`/gallery/${id}`, { method: 'DELETE', headers: getHeaders(true) }),
};
