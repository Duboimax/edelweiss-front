import Stripe from 'stripe'
import { defineEventHandler, readBody } from 'h3'
const stripe = new Stripe(process.env.NUXT_STRIPE_SECRET || 'sk....', {})

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event)
    // body: { products: [{id, name, price, quantity}], userId, ... }
    const { products, userId } = body
    if (!products || !Array.isArray(products) || !userId) {
      return { error: 'Invalid payload' }
    }
    const line_items = products.map((p: { productName: string; price: number; quantity?: number }) => ({
      price_data: {
        currency: 'eur',
        product_data: { name: p.productName },
        unit_amount: Math.round(p.price * 100),
      },
      quantity: p.quantity || 1,
    }))
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONT_URL || 'http://localhost:3000'}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONT_URL || 'http://localhost:3000'}/cart`,
      metadata: { userId: String(userId), products: JSON.stringify(products) },
    })
    return { url: session.url }
  }
  return { error: 'Method not allowed' }
}) 