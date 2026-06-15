const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return res.json();
}

// Auth
export const authApi = {
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  me: (token: string) =>
    request('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Products
export const productsApi = {
  getAll: (params?: {
    category?: string;
    sort?: string;
    search?: string;
    sale?: boolean;
  }) => {
    const query = new URLSearchParams(params as any).toString();
    return request(`/products${query ? `?${query}` : ''}`);
  },

  getOne: (slug: string) => request(`/products/${slug}`),
};

// Categories
export const categoriesApi = {
  getAll: () => request('/categories'),
  getOne: (slug: string) => request(`/categories/${slug}`),
};