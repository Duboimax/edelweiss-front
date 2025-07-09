export const useAuth = () => {
  // Types pour les réponses Strapi Auth
  interface StrapiAuthResponse {
    jwt: string
    user: {
      id: number
      username: string
      email: string
      provider: string
      confirmed: boolean
      blocked: boolean
      createdAt: string
      updatedAt: string
      firstName?: string
      lastName?: string
    }
  }

  interface LoginCredentials {
    identifier: string
    password: string
  }

  interface RegisterCredentials {
    username: string
    email: string
    password: string
    firstName: string  // ✅ CORRECTION: firstName (pas fistname)
    lastName: string   // ✅ CORRECTION: lastName (pas lastname)
  }

  interface UpdateUserData {
    email?: string
    username?: string
    firstName?: string
    lastName?: string
  }

  // Cookies réactifs Nuxt
  const jwtCookie = useCookie<string | null>('jwt', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
    secure: true
  })

  const userCookie = useCookie<any>('user', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
    secure: true
  })

  const login = async (credentials: LoginCredentials): Promise<StrapiAuthResponse> => {
    try {
      const strapi = useStrapi()
      const response = await strapi.post<StrapiAuthResponse>('auth/local', credentials)
      
      jwtCookie.value = response.jwt
      userCookie.value = response.user

      return response
    } catch (error: any) {
      console.error('Login error:', error)
      const errorMessage = error?.data?.error?.message || 
                          error?.message || 
                          'Identifiants invalides'
      throw new Error(errorMessage)
    }
  }

  const register = async (credentials: RegisterCredentials): Promise<StrapiAuthResponse> => {
    try {
      const strapi = useStrapi()
      const response = await strapi.post<StrapiAuthResponse>('auth/local/register', credentials)
      
      jwtCookie.value = response.jwt
      userCookie.value = response.user

      return response
    } catch (error: any) {
      console.error('Register error:', error)
      const errorMessage = error?.data?.error?.message || 
                          error?.message || 
                          'Erreur lors de l\'inscription'
      throw new Error(errorMessage)
    }
  }

  const updateUser = async (userData: UpdateUserData) => {
    try {
      const strapi = useStrapi()
      const currentUserId = userCookie.value?.id
      
      if (!currentUserId) {
        throw new Error('Aucun utilisateur connecté')
      }

      const response = await strapi.put<any>(`users/${currentUserId}`, userData)
      
      userCookie.value = response
      
      return response
    } catch (error: any) {
      console.error('Update user error:', error)
      const errorMessage = error?.data?.error?.message || 
                          error?.message || 
                          'Erreur lors de la mise à jour'
      throw new Error(errorMessage)
    }
  }

  const logout = () => {
    jwtCookie.value = null
    userCookie.value = null
    navigateTo('/')
  }

  const isLoggedIn = computed(() => {
    return !!jwtCookie.value
  })

  const currentUser = computed(() => {
    return userCookie.value
  })

  const getToken = () => {
    return jwtCookie.value
  }

  return {
    login,
    register,
    updateUser,
    logout,
    isLoggedIn: readonly(isLoggedIn),
    currentUser: readonly(currentUser),
    getToken
  }
}