const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const request = async (path, { method = 'GET', body, token } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    // DRF возвращает ошибки в виде { detail: "..." } или { field: ["..."] }
    let message = json.detail || json.error || `HTTP ${res.status}`;
    if (!json.detail && !json.error) {
      const firstKey = Object.keys(json)[0];
      if (firstKey) {
        const val = json[firstKey];
        message = Array.isArray(val) ? val.join(', ') : String(val);
      }
    }
    const error = new Error(message);
    error.status = res.status;
    error.details = json;
    throw error;
  }
  return json;
};

export const api = {
  // --- Auth ---
  register: (payload) =>
    request('/auth/register/', { method: 'POST', body: payload }),

  login: (username, password) =>
    request('/auth/login/', { method: 'POST', body: { username, password } }),

  me: (token) => request('/auth/me/', { token }),

  updateProfile: (payload, token) =>
    request('/auth/me/', { method: 'PATCH', body: payload, token }),

  // --- Services ---
  getServices: () => request('/services/'),
  getService:  (id) => request(`/services/${id}/`),

  // --- Bookings ---
  createBooking: (payload, token) =>
    request('/bookings/', { method: 'POST', body: payload, token }),

  myBookings: (token) => request('/bookings/', { token }),

  cancelBooking: (id, token) =>
    request(`/bookings/${id}/`, { method: 'PATCH', body: { status: 'cancelled' }, token }),
};