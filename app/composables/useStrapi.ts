// composables/useStrapi.ts
export const useStrapi = () => {
  const config = useRuntimeConfig()
  
  const baseURL = config.public.strapiUrl || 'http://localhost:1337'
  const token = config.strapiToken

  const strapiClient = {
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
      const query = params ? new URLSearchParams(params).toString() : ''
      const url = `${baseURL}/api/${endpoint}${query ? `?${query}` : ''}`
      
      const headers: any = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      return await $fetch<T>(url, {
        method: 'GET',
        headers,
      })
    },

    async post<T>(endpoint: string, data: any): Promise<T> {
      const headers: any = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      return await $fetch<T>(`${baseURL}/api/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
    },

    async put<T>(endpoint: string, data: any): Promise<T> {
      const headers: any = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      return await $fetch<T>(`${baseURL}/api/${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      })
    },

    async delete<T>(endpoint: string): Promise<T> {
      const headers: any = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      return await $fetch<T>(`${baseURL}/api/${endpoint}`, {
        method: 'DELETE',
        headers,
      })
    },
  }

  return strapiClient
}