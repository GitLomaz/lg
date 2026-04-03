// Secure fetch wrapper with credentials support
const fetchWithCredentials = async (url: string, options: RequestInit = {}) => {
  const config: RequestInit = {
    ...options,
    credentials: 'include', // Include cookies for authentication
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  // Throw error for non-2xx responses (similar to axios behavior)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

// Helper methods for common HTTP operations
export const http = {
  get: async (url: string, options: RequestInit = {}) => {
    const response = await fetchWithCredentials(url, {
      ...options,
      method: 'GET',
    });
    return response.json();
  },

  post: async (url: string, data?: any, options: RequestInit = {}) => {
    const response = await fetchWithCredentials(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  put: async (url: string, data?: any, options: RequestInit = {}) => {
    const response = await fetchWithCredentials(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  delete: async (url: string, options: RequestInit = {}) => {
    const response = await fetchWithCredentials(url, {
      ...options,
      method: 'DELETE',
    });
    return response.json();
  },
};

export default http;
