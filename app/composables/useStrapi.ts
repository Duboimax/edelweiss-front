// composables/useStrapi.ts
export const useStrapi = () => {
  const config = useRuntimeConfig()
  
  const baseURL = config.public.strapiUrl || 'https://edelweiss-back-production.up.railway.app'
  const token = config.strapiToken || 'e647c2f006b9c96c5f5699c1f6237996b314b38c9c981dea62f24b1b8ce266f06f48b4289eb249bb804528d190fb122236f45aa31158efb2129c510b994724267d09651d3bcc673a6531d386120277897405c5be115d9d20ea0dc8bdf88fe8d2f17b13a3362ff5a9e7885579dadb7125836a044eae3d4944e5587992e5587459'

  const strapiClient = {
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
      try {
        const url = `${baseURL}/api/${endpoint}`
        
        const headers: any = {
          'Content-Type': 'application/json',
        }
        
        if (token) {
          headers.Authorization = `Bearer ${token}`
        }

        return await $fetch<T>(url, {
          method: 'GET',
          headers,
          query: params, // Utiliser query au lieu de construire manuellement l'URL
        })
      } catch (error) {
        console.error(`Erreur lors de la requête GET ${endpoint}:`, error)
        throw error
      }
    },

    async post<T>(endpoint: string, data: any): Promise<T> {
      try {
        const headers: any = {
          'Content-Type': 'application/json',
        }
        
        if (token) {
          headers.Authorization = `Bearer ${token}`
        }

        return await $fetch<T>(`${baseURL}/api/${endpoint}`, {
          method: 'POST',
          headers,
          body: data, // Pas besoin de JSON.stringify, $fetch le fait automatiquement
        })
      } catch (error) {
        console.error(`Erreur lors de la requête POST ${endpoint}:`, error)
        throw error
      }
    },

    async put<T>(endpoint: string, data: any): Promise<T> {
      try {
        const headers: any = {
          'Content-Type': 'application/json',
        }
        
        if (token) {
          headers.Authorization = `Bearer ${token}`
        }

        return await $fetch<T>(`${baseURL}/api/${endpoint}`, {
          method: 'PUT',
          headers,
          body: data,
        })
      } catch (error) {
        console.error(`Erreur lors de la requête PUT ${endpoint}:`, error)
        throw error
      }
    },

    async delete<T>(endpoint: string): Promise<T> {
      try {
        const headers: any = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }

        return await $fetch<T>(`${baseURL}/api/${endpoint}`, {
          method: 'DELETE',
          headers,
        })
      } catch (error) {
        console.error(`Erreur lors de la requête DELETE ${endpoint}:`, error)
        throw error
      }
    },
  }

  return strapiClient
}