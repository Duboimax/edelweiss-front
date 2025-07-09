import { useStrapi } from '~/composables/useStrapi'
import { useAuth } from '~/composables/useAuth'

export function useOrder() {
  const strapi = useStrapi()
  const { currentUser, getToken } = useAuth()

  // Créer une commande
  const createOrder = async (orderData: {
    products: number[],
    price: number,
    orderDate: string,
    statut: string
  }) => {
    if (!currentUser.value?.id) throw new Error('Utilisateur non connecté')
    const payload = {
      data: {
        ...orderData,
        users_permissions_user: currentUser.value.id
      }
    }
    return await strapi.post('orders', payload)
  }

  // Récupérer les commandes de l'utilisateur courant
  const fetchUserOrders = async () => {
    if (!currentUser.value?.id) throw new Error('Utilisateur non connecté')
    return await strapi.get('orders', {
      'filters[users_permissions_user][id]': currentUser.value.id,
      'populate': 'products'
    })
  }

  return {
    createOrder,
    fetchUserOrders
  }
} 