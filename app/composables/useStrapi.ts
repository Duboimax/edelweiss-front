export const useStrapi = () => {
  const config = useRuntimeConfig()
  
  const baseURL = config.public.strapiUrl || 'https://edelweiss-back-production.up.railway.app'
  const strapiToken = 'e647c2f006b9c96c5f5699c1f6237996b314b38c9c981dea62f24b1b8ce266f06f48b4289eb249bb804528d190fb122236f45aa31158efb2129c510b994724267d09651d3bcc673a6531d386120277897405c5be115d9d20ea0dc8bdf88fe8d2f17b13a3362ff5a9e7885579dadb7125836a044eae3d4944e5587992e5587459'
  
  const getAuthToken = () => {
    const jwtCookie = useCookie<string | null>('jwt')
    return jwtCookie.value
  }

  const strapiClient = {
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
      const query = params ? new URLSearchParams(params).toString() : ''
      const url = `${baseURL}/api/${endpoint}${query ? `?${query}` : ''}`
      
      const headers: any = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${strapiToken}`
      }
      
      const token = getAuthToken()
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

      return await $fetch<T>(`${baseURL}/api/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
    },

    async put<T>(endpoint: string, data: any): Promise<T> {
      const headers: any = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${strapiToken}`
      }
      
      // const token = getAuthToken()
      // if (token) {
      //   headers.Authorization = `Bearer ${token}`
      // }

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
      
      const token = getAuthToken()
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