// composables/useWishlist.ts
import { useStrapi } from '~/composables/useStrapi'
import { useAuth } from '~/composables/useAuth'

interface WishlistItem {
  id: number
  user: number
  documentId: string,
  products: {
    id: number
    productName: string
    price: number
    slug: string
    productImage?: {
      url: string
      alternativeText?: string
    }
  }[]
  createdAt: string
}

const globalWishlistItems = ref<WishlistItem[]>([])
const globalIsLoading = ref(false)

export const useWishlist = () => {
  const strapi = useStrapi()
  const { currentUser } = useAuth()

  const fetchWishlist = async () => {
    try {
      if (!currentUser.value?.id) {
        globalWishlistItems.value = []
        return []
      }

      globalIsLoading.value = true
      const response = await strapi.get<{ data: WishlistItem[] }>('wishlists', {
        'filters[user][id][$eq]': currentUser.value.id,
        'populate[products][populate]': 'productImage',
        'sort[0]': 'createdAt:desc'
      })

      globalWishlistItems.value = response.data || []
      return globalWishlistItems.value
    } catch (error) {
      console.error('Erreur récupération wishlist:', error)
      globalWishlistItems.value = []
      return []
    } finally {
      globalIsLoading.value = false
    }
  }

  const isInWishlist = (productId: number): boolean => {
    return globalWishlistItems.value.some(item => 
      item.products.some(product => product.id === productId)
    )
  }

  const addToWishlist = async (productId: number) => {
    try {
      if (!currentUser.value?.id) {
        throw new Error('Utilisateur non connecté')
      }

      if (isInWishlist(productId)) {
        console.log('Produit déjà dans la wishlist')
        return
      }

      await strapi.post('wishlists', {
        data: {
          user: currentUser.value.id,
          products: [productId]
        }
      })

      await fetchWishlist()
      
    } catch (error) {
      console.error('Erreur ajout wishlist:', error)
      throw error
    }
  }

  const removeFromWishlist = async (productId: number) => {
    try {
      if (!currentUser.value?.id) {
        throw new Error('Utilisateur non connecté')
      }

      const wishlistItem = globalWishlistItems.value.find(item => 
        item.products.some(product => product.id === productId)
      )
      
      if (!wishlistItem) {
        return
      }

      await strapi.delete(`wishlists/${wishlistItem.documentId}`)

      await fetchWishlist()
      
    } catch (error) {
      console.error('💥 Erreur suppression wishlist:', error)
      throw error
    }
  }

  const toggleWishlist = async (productId: number) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId)
    } else {
      await addToWishlist(productId)
    }
  }

  const clearWishlist = async () => {
    try {
      if (!currentUser.value?.id) {
        throw new Error('Utilisateur non connecté')
      }

      const deletePromises = globalWishlistItems.value.map(item => 
        strapi.delete(`wishlists/${item.documentId}`)
      )
      
      await Promise.all(deletePromises)
      globalWishlistItems.value = []
      
    } catch (error) {
      console.error('Erreur vidage wishlist:', error)
      throw error
    }
  }

  const wishlistCount = computed(() => {
    return globalWishlistItems.value.reduce((count, item) => count + item.products.length, 0)
  })

  if (currentUser.value?.id && globalWishlistItems.value.length === 0) {
    fetchWishlist()
  }

  watch(() => currentUser.value?.id, (newUserId) => {
    if (newUserId) {
      fetchWishlist()
    } else {
      globalWishlistItems.value = []
    }
  })

  return {
    wishlistItems: readonly(globalWishlistItems),
    isLoading: readonly(globalIsLoading),
    wishlistCount,
    fetchWishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist
  }
}