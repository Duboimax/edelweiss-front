import { ref, computed, watch } from 'vue'

export interface CartProduct {
  id: number
  productName: string
  price: number
  slug: string
  productImage: {
    url: string
    alternativeText?: string
  }
  quantity: number
}

const cart = ref<CartProduct[]>([])

// Charger depuis localStorage au démarrage
if (process.client) {
  const saved = localStorage.getItem('cart')
  if (saved) cart.value = JSON.parse(saved)
}

// Sauvegarder à chaque modification
watch(cart, (val) => {
  if (process.client) {
    localStorage.setItem('cart', JSON.stringify(val))
  }
}, { deep: true })

export function useCart() {
  const addToCart = (product: Omit<CartProduct, 'quantity'>, qty = 1) => {
    const existing = cart.value.find(p => p.id === product.id)
    if (existing) {
      existing.quantity += qty
    } else {
      cart.value.push({ ...product, quantity: qty })
    }
  }

  const removeFromCart = (id: number) => {
    cart.value = cart.value.filter(p => p.id !== id)
  }

  const updateQuantity = (id: number, qty: number) => {
    const item = cart.value.find(p => p.id === id)
    if (item && qty > 0) item.quantity = qty
    if (item && qty <= 0) removeFromCart(id)
  }

  const clearCart = () => {
    cart.value = []
  }

  const total = computed(() =>
    cart.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
  )

  const count = computed(() =>
    cart.value.reduce((sum, p) => sum + p.quantity, 0)
  )

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    count
  }
} 