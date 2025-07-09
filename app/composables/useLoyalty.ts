// composables/useLoyalty.ts
import { useStrapi } from '~/composables/useStrapi'
import { useAuth } from '~/composables/useAuth'
import { useOrder } from '~/composables/useOrder'

export const useLoyalty = () => {
  const strapi = useStrapi()
  const { currentUser } = useAuth()
  const { fetchUserOrders } = useOrder()

  // Types adaptés à ta structure
  interface LoyaltyPoint {
    id: number
    points: number
    createdAt: string
    order?: any
  }

  interface LoyaltyReward {
    id: number
    title: string
    value: string
    code: string
    status: string
    createdAt: string
    usedAt?: string
  }

  interface LoyaltyData {
    currentPoints: number
    earnedFromOrders: number
    pointsFromLoyalty: number
    loyaltyHistory: LoyaltyPoint[]
    orders: any[]
  }

  // Calculer les points basés sur les commandes
  const calculateLoyaltyPoints = async (): Promise<LoyaltyData> => {
    try {
      if (!currentUser.value?.id) {
        throw new Error('Utilisateur non connecté')
      }

      const [ordersResponse, loyaltyPointsResponse] = await Promise.all([
        fetchUserOrders(),
        strapi.get<{ data: LoyaltyPoint[] }>('loyalty-points', {
          'filters[user][id][$eq]': currentUser.value.id,
          'populate[order]': 'true',
          'sort[0]': 'createdAt:desc'
        })
      ])
      
      const orders = ordersResponse.data || []
      const loyaltyPoints = loyaltyPointsResponse.data || []
      
      // Calculer points gagnés depuis les commandes
      const earnedFromOrders = orders.reduce((total: number, order: any) => {
        return total + Math.floor(order.price || 0)
      }, 0)
      
      // Calculer points depuis la table loyalty-points
      const pointsFromLoyalty = loyaltyPoints.reduce((total: number, point: LoyaltyPoint) => {
        return total + point.points
      }, 0)
      
      // Le total actuel est la somme des deux
      const currentPoints = earnedFromOrders + pointsFromLoyalty
      
      return {
        currentPoints: Math.max(currentPoints, 0),
        earnedFromOrders,
        pointsFromLoyalty,
        loyaltyHistory: loyaltyPoints,
        orders
      }
    } catch (error) {
      console.error('Erreur calcul points:', error)
      return {
        currentPoints: 0,
        earnedFromOrders: 0,
        pointsFromLoyalty: 0,
        loyaltyHistory: [],
        orders: []
      }
    }
  }

  // Ajouter des points (adapté à ta structure)
  const addLoyaltyPoints = async (points: number, orderId?: number) => {
    try {
      if (!currentUser.value?.id) {
        throw new Error('Utilisateur non connecté')
      }

      console.log('Envoi à Strapi:', {
        user: currentUser.value.id,
        order: orderId || null,
        points
      })

      const response = await strapi.post<{ data: LoyaltyPoint }>('loyalty-points', {
        data: {
          user: currentUser.value.id,
          order: orderId || null,
          points
        }
      })
      return response
    } catch (error) {
      console.error('Erreur ajout points:', error)
      throw error
    }
  }

  // Dépenser des points (points négatifs)
  const spendLoyaltyPoints = async (points: number) => {
    return await addLoyaltyPoints(-points)
  }

  // Récupérer l'historique des récompenses
  const getRewardsHistory = async (): Promise<LoyaltyReward[]> => {
    try {
      if (!currentUser.value?.id) {
        return []
      }

      const response = await strapi.get<{ data: LoyaltyReward[] }>('loyalty-rewards', {
        'filters[user][id][$eq]': currentUser.value.id,
        'sort[0]': 'createdAt:desc'
      })
      return response.data || []
    } catch (error) {
      console.error('Erreur récupération récompenses:', error)
      return []
    }
  }

  // Créer une récompense (status en texte libre)
  const createReward = async (title: string, value: string, code: string) => {
    try {
      if (!currentUser.value?.id) {
        throw new Error('Utilisateur non connecté')
      }

      const response = await strapi.post<{ data: LoyaltyReward }>('loyalty-rewards', {
        data: {
          user: currentUser.value.id,
          title,
          value,
          code,
          statut: 'available'
        }
      })
      return response
    } catch (error) {
      console.error('Erreur création récompense:', error)
      throw error
    }
  }

  // Marquer une récompense comme utilisée
  const useReward = async (rewardId: number) => {
    try {
      const response = await strapi.put<{ data: LoyaltyReward }>(`loyalty-rewards/${rewardId}`, {
        data: {
          statut: 'used',
          usedAt: new Date().toISOString()
        }
      })
      return response
    } catch (error) {
      console.error('Erreur utilisation récompense:', error)
      throw error
    }
  }

  // Générer code promo
  const generatePromoCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = 'EDELWEISS'
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Ajouter des points automatiquement après une commande
  const addPointsForOrder = async (orderId: number, orderTotal: number) => {
    const points = Math.floor(orderTotal)
    await addLoyaltyPoints(points, orderId)
  }

  // Calculer les points du mois en cours
  const calculateMonthlyPoints = (orders: any[]): number => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    return orders.reduce((total: number, order: any) => {
      const orderDate = new Date(order.orderDate)
      if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
        return total + Math.floor(order.price || 0)
      }
      return total
    }, 0)
  }

  return {
    calculateLoyaltyPoints,
    addLoyaltyPoints,
    spendLoyaltyPoints,
    getRewardsHistory,
    createReward,
    useReward,
    generatePromoCode,
    addPointsForOrder,
    calculateMonthlyPoints
  }
}