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

// Cache global pour la wishlist
const globalWishlistItems = ref<WishlistItem[]>([])
const globalWishlistLoading = ref(false)
const globalWishlistFetched = ref(false)
const globalWishlistLastFetch = ref<number>(0)

// Cache TTL : 2 minutes pour la wishlist (plus courte car données plus sensibles)
const WISHLIST_CACHE_TTL = 2 * 60 * 1000

export const useWishlist = () => {
  const strapi = useStrapi()
  const { currentUser } = useAuth()

  const isWishlistDataFresh = () => {
    return Date.now() - globalWishlistLastFetch.value < WISHLIST_CACHE_TTL
  }

  const fetchWishlist = async (force = false) => {
    try {
      if (!currentUser.value?.id) {
        globalWishlistItems.value = []
        return []
      }

      // Si les données sont fraîches et qu'on ne force pas
      if (globalWishlistFetched.value && isWishlistDataFresh() && !force) {
        console.log('📦 Wishlist found in cache')
        return globalWishlistItems.value
      }

      // Si déjà en cours de chargement
      if (globalWishlistLoading.value) {
        return new Promise((resolve) => {
          const checkLoading = () => {
            if (!globalWishlistLoading.value) {
              resolve(globalWishlistItems.value)
            } else {
              setTimeout(checkLoading, 100)
            }
          }
          checkLoading()
        })
      }

      globalWishlistLoading.value = true
      console.log('🔄 Fetching wishlist from API...')
      
      const response = await strapi.get<{ data: WishlistItem[] }>('wishlists', {
        'filters[user][id][$eq]': currentUser.value.id,
        'populate[products][populate]': 'productImage',
        'sort[0]': 'createdAt:desc'
      })

      globalWishlistItems.value = response.data || []
      globalWishlistFetched.value = true
      globalWishlistLastFetch.value = Date.now()
      
      console.log(`✅ Cached ${globalWishlistItems.value.length} wishlist items`)
      return globalWishlistItems.value
    } catch (error) {
      console.error('❌ Error fetching wishlist:', error)
      globalWishlistItems.value = []
      return []
    } finally {
      globalWishlistLoading.value = false
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

      // Refresh uniquement la wishlist, pas tout
      await fetchWishlist(true)
      
    } catch (error) {
      console.error('❌ Error adding to wishlist:', error)
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

      // Supprime directement du cache local au lieu de re-fetch
      const index = globalWishlistItems.value.findIndex(item => item.id === wishlistItem.id)
      if (index >= 0) {
        globalWishlistItems.value.splice(index, 1)
      }
      
    } catch (error) {
      console.error('❌ Error removing from wishlist:', error)
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
      globalWishlistFetched.value = false
      
    } catch (error) {
      console.error('❌ Error clearing wishlist:', error)
      throw error
    }
  }

  const wishlistCount = computed(() => {
    return globalWishlistItems.value.reduce((count, item) => count + item.products.length, 0)
  })

  const invalidateWishlistCache = () => {
    globalWishlistItems.value = []
    globalWishlistFetched.value = false
    globalWishlistLastFetch.value = 0
    console.log('🗑️ Wishlist cache invalidated')
  }

  // Auto-fetch seulement si pas encore fetché et utilisateur connecté
  if (currentUser.value?.id && !globalWishlistFetched.value) {
    fetchWishlist()
  }

  // Watch pour clear le cache quand l'utilisateur change
  watch(() => currentUser.value?.id, (newUserId, oldUserId) => {
    if (newUserId !== oldUserId) {
      invalidateWishlistCache()
      if (newUserId) {
        fetchWishlist()
      }
    }
  })

  return {
    wishlistItems: readonly(globalWishlistItems),
    isLoading: readonly(globalWishlistLoading),
    wishlistCount,
    fetchWishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    invalidateWishlistCache,
    isWishlistDataFresh
  }
}
