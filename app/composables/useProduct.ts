// composables/useOptimizedProducts.ts
import { useStrapi } from '~/composables/useStrapi'

interface Product {
  id: number
  productName: string
  productDescription?: string
  price: number
  slug: string
  productImage: {
    url: string
    alternativeText?: string
  }
  collection?: {
    collectionName: string
  }
}

// Cache global partagé entre tous les composants
const globalProductsCache = ref<Product[]>([])
const globalFeedbacksCache = ref<Map<number, any[]>>(new Map())
const globalIsLoading = ref(false)
const globalIsFetched = ref(false)
const globalLastFetch = ref<number>(0)

// Cache TTL : 5 minutes
const CACHE_TTL = 5 * 60 * 1000

export const useProduct = () => {
  const strapi = useStrapi()

  const isDataFresh = () => {
    return Date.now() - globalLastFetch.value < CACHE_TTL
  }

  const fetchAllProducts = async (force = false) => {
    // Si les données sont fraîches et qu'on ne force pas, on utilise le cache
    if (globalIsFetched.value && isDataFresh() && !force) {
      return globalProductsCache.value
    }

    // Si déjà en cours de chargement, on attend
    if (globalIsLoading.value) {
      return new Promise((resolve) => {
        const checkLoading = () => {
          if (!globalIsLoading.value) {
            resolve(globalProductsCache.value)
          } else {
            setTimeout(checkLoading, 100)
          }
        }
        checkLoading()
      })
    }

    try {
      globalIsLoading.value = true
      console.log('🔄 Fetching products from API...')
      
      const response = await strapi.get<{ data: Product[] }>('products', { 
        pLevel: 5,
        'pagination[pageSize]': 100 // Récupère plus de produits d'un coup
      })

      globalProductsCache.value = response.data || []
      globalIsFetched.value = true
      globalLastFetch.value = Date.now()
      
      console.log(`✅ Cached ${globalProductsCache.value.length} products`)
      return globalProductsCache.value
    } catch (error) {
      console.error('❌ Error fetching products:', error)
      return []
    } finally {
      globalIsLoading.value = false
    }
  }

  const getProductBySlug = async (slug: string): Promise<Product | null> => {
    // Essaie d'abord dans le cache
    const cachedProduct = globalProductsCache.value.find(p => p.slug === slug)
    if (cachedProduct && isDataFresh()) {
      console.log('📦 Product found in cache:', slug)
      return cachedProduct
    }

    // Si pas dans le cache, fetch spécifique
    try {
      console.log('🔄 Fetching specific product:', slug)
      const response = await strapi.get<{ data: Product[] }>('products', {
        'filters[slug][$eq]': slug,
        pLevel: 4,
      })
      
      const product = response.data?.[0] || null
      
      // Ajoute/met à jour dans le cache global
      if (product) {
        const existingIndex = globalProductsCache.value.findIndex(p => p.id === product.id)
        if (existingIndex >= 0) {
          globalProductsCache.value[existingIndex] = product
        } else {
          globalProductsCache.value.push(product)
        }
      }
      
      return product
    } catch (error) {
      console.error('❌ Error fetching product by slug:', error)
      return null
    }
  }

  const getRandomProducts = (count: number, excludeSlug?: string): Product[] => {
    if (!globalProductsCache.value.length) return []
    
    const filtered = excludeSlug 
      ? globalProductsCache.value.filter(p => p.slug !== excludeSlug)
      : globalProductsCache.value
    
    return filtered
      .sort(() => 0.5 - Math.random())
      .slice(0, count)
  }

  const getFeaturedProducts = (count: number = 8): Product[] => {
    if (!globalProductsCache.value.length) return []
    return globalProductsCache.value.slice(0, count)
  }

  // Cache pour les feedbacks par produit
  const getProductFeedbacks = async (productId: number) => {
    const cacheKey = productId
    
    // Vérifie le cache
    if (globalFeedbacksCache.value.has(cacheKey)) {
      console.log('📦 Feedbacks found in cache for product:', productId)
      return globalFeedbacksCache.value.get(cacheKey) || []
    }

    try {
      console.log('🔄 Fetching feedbacks for product:', productId)
      const response = await strapi.get<{ data: any[] }>('feedbacks', {
        'filters[product][id]': productId,
        'sort': 'feedDate:desc',
      })

      const feedbacks = (response.data || []).map(fb => ({
        id: fb.id,
        feedback: fb.feedback,
        feedDate: fb.feedDate,
        stars: fb.stars ?? 0,
      }))

      // Met en cache
      globalFeedbacksCache.value.set(cacheKey, feedbacks)
      
      return feedbacks
    } catch (error) {
      console.error('❌ Error fetching feedbacks:', error)
      return []
    }
  }

  const invalidateCache = () => {
    globalProductsCache.value = []
    globalFeedbacksCache.value.clear()
    globalIsFetched.value = false
    globalLastFetch.value = 0
    console.log('🗑️ Cache invalidated')
  }

  const refreshProducts = () => {
    return fetchAllProducts(true)
  }

  return {
    // État
    products: readonly(globalProductsCache),
    isLoading: readonly(globalIsLoading),
    isFetched: readonly(globalIsFetched),
    
    // Méthodes
    fetchAllProducts,
    getProductBySlug,
    getRandomProducts,
    getFeaturedProducts,
    getProductFeedbacks,
    invalidateCache,
    refreshProducts,
    
    // Utils
    isDataFresh
  }
}