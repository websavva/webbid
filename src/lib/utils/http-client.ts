import axios from 'redaxios'

export const httpClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,

  fetch(url, options = {}) {
    return fetch(url, {
      credentials: 'include',
      cache: 'no-cache',
      ...options,
    })
  }
});


