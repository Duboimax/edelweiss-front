// composables/useStats.ts
import { useStrapi } from '~/composables/useStrapi'
import { useAuth } from '~/composables/useAuth'
import { useOrder } from '~/composables/useOrder'

export const useStats = () => {
  const strapi = useStrapi()
  const { currentUser } = useAuth()
  const { fetchUserOrders } = useOrder()

  // Interface pour les statistiques
  interface UserStats {
    totalOrders: number
    totalSpent: number
    wishlistItems: number
    averageOrderValue: number
    lastOrderDate: string | null
    mostOrderedProduct: string | null
  }

  // Récupérer les statistiques complètes de l'utilisateur
  const getUserStats = async (): Promise<UserStats> => {
    try {
      if (!currentUser.value?.id) {
        throw new Error('Utilisateur non connecté')
      }

      // Récupérer les commandes
      const ordersResponse = await fetchUserOrders()
      const orders = ordersResponse.data || []

      // Calculer les statistiques des commandes
      const totalOrders = orders.length
      const totalSpent = orders.reduce((sum: number, order: any) => {
        return sum + (order.price || 0)
      }, 0)

      const averageOrderValue = totalOrders > 0 ? Math.round(totalSpent / totalOrders) : 0

      // Trouver la date de la dernière commande
      const lastOrderDate = orders.length > 0 
        ? new Date(Math.max(...orders.map((order: any) => new Date(order.orderDate).getTime())))
        : null

      // Récupérer la wishlist
      let wishlistItems = 0
      try {
        const wishlistResponse = await strapi.get('wishlists', {
          'filters[user][id][$eq]': currentUser.value.id,
          'populate': 'products'
        })
        // Compter tous les produits dans toutes les wishlists
        wishlistItems = wishlistResponse.data?.reduce((count: number, item: any) => {
          return count + (item.products?.length || 0)
        }, 0) || 0
      } catch (error) {
        // Si la table wishlist n'existe pas, on met 0
        console.log('Wishlist non disponible')
        wishlistItems = 0
      }

      // Calculer le produit le plus commandé
      const productCounts: { [key: string]: number } = {}
      orders.forEach((order: any) => {
        if (order.products && Array.isArray(order.products)) {
          order.products.forEach((product: any) => {
            const productName = product.productName || product.name
            if (productName) {
              productCounts[productName] = (productCounts[productName] || 0) + 1
            }
          })
        }
      })

      const mostOrderedProduct = Object.keys(productCounts).length > 0
        ? Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b)
        : null

      return {
        totalOrders,
        totalSpent: Math.round(totalSpent),
        wishlistItems,
        averageOrderValue,
        lastOrderDate: lastOrderDate ? lastOrderDate.toLocaleDateString('fr-FR') : null,
        mostOrderedProduct
      }

    } catch (error) {
      console.error('Erreur récupération statistiques:', error)
      return {
        totalOrders: 0,
        totalSpent: 0,
        wishlistItems: 0,
        averageOrderValue: 0,
        lastOrderDate: null,
        mostOrderedProduct: null
      }
    }
  }

  // Récupérer les statistiques du mois en cours
  const getMonthlyStats = async () => {
    try {
      if (!currentUser.value?.id) {
        throw new Error('Utilisateur non connecté')
      }

      const ordersResponse = await fetchUserOrders()
      const orders = ordersResponse.data || []

      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()

      const monthlyOrders = orders.filter((order: any) => {
        const orderDate = new Date(order.orderDate)
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear
      })

      const monthlySpent = monthlyOrders.reduce((sum: number, order: any) => {
        return sum + (order.price || 0)
      }, 0)

      return {
        monthlyOrders: monthlyOrders.length,
        monthlySpent: Math.round(monthlySpent)
      }

    } catch (error) {
      console.error('Erreur statistiques mensuelles:', error)
      return {
        monthlyOrders: 0,
        monthlySpent: 0
      }
    }
  }

  // Récupérer les statistiques par statut de commande
  const getOrdersByStatus = async () => {
    try {
      if (!currentUser.value?.id) {
        throw new Error('Utilisateur non connecté')
      }

      const ordersResponse = await fetchUserOrders()
      const orders = ordersResponse.data || []

      const statusCounts = orders.reduce((acc: any, order: any) => {
        const status = order.statut || 'Inconnue'
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {})

      return statusCounts

    } catch (error) {
      console.error('Erreur statistiques par statut:', error)
      return {}
    }
  }

  return {
    getUserStats,
    getMonthlyStats,
    getOrdersByStatus
  }
}