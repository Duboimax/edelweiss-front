<template>
  <div class="flex min-h-screen flex-col">
    <section class="py-12 md:py-16 bg-[#f9f7f2] flex-1 flex items-center justify-center">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-md space-y-6 bg-[#f5f2e9] p-8 border border-[#e6e2d7]">
          <div class="text-center">
            <h1 class="font-serif text-2xl font-medium text-[#2a2a22]">Créer un compte</h1>
            <p class="mt-2 text-sm text-[#5a5a52]">Rejoignez-nous pour accéder à des offres exclusives et suivre vos commandes.</p>
          </div>

          <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="first-name" class="text-sm font-medium text-[#2a2a22]">
                  Prénom
                </label>
                <input
                  id="first-name"
                  v-model="registerForm.firstName"
                  class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                  placeholder="Entrer votre prénom"
                  required
                />
              </div>

              <div class="space-y-2">
                <label for="last-name" class="text-sm font-medium text-[#2a2a22]">
                 Nom 
                </label>
                <input
                  id="last-name"
                  v-model="registerForm.lastName"
                  class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                  placeholder="Entrer votre nom"
                  required
                />
              </div>
            </div>

            <div class="space-y-2">
              <label for="email" class="text-sm font-medium text-[#2a2a22]">
                Email
              </label>
              <input
                id="email"
                v-model="registerForm.email"
                type="email"
                class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                placeholder="Entrer votre email"
                required
              />
            </div>

            <div class="space-y-2">
              <label for="password" class="text-sm font-medium text-[#2a2a22]">
                Mot de passe
              </label>
              <input
                id="password"
                v-model="registerForm.password"
                type="password"
                class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                placeholder="Créer un mot de passe"
                required
              />
              <p class="text-xs text-[#5a5a52]">Le mot de passe doit contenir au moins 8 caractères</p>
            </div>

            <div class="space-y-2">
              <label for="confirm-password" class="text-sm font-medium text-[#2a2a22]">
                Confirmer le mot de passe
              </label>
              <input
                id="confirm-password"
                v-model="registerForm.confirmPassword"
                type="password"
                class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                placeholder="Confirmer votre mot de passe"
                required
              />
              <p v-if="passwordMismatch" class="text-xs text-red-500">Les mots de passe ne correspondent pas</p>
            </div>

            <div class="flex items-start space-x-2">
              <input 
                id="terms" 
                v-model="registerForm.acceptTerms"
                type="checkbox" 
                class="h-4 w-4 mt-1 border-[#e6e2d7] bg-transparent" 
                required 
              />
              <label for="terms" class="text-xs text-[#5a5a52]">
                J&apos;accepte les
                <NuxtLink to="/terms" class="text-[#2a2a22] hover:underline">
                  CGV
                </NuxtLink>
                et la
                <NuxtLink to="/privacy" class="text-[#2a2a22] hover:underline">
                  Politique de confidentialité
                </NuxtLink>
              </label>
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting || passwordMismatch || !registerForm.acceptTerms"
              class="w-full bg-[#2a2a22] hover:bg-[#3a3a32] text-white rounded-none px-6 py-3 transition-colors disabled:opacity-50"
            >
              {{ isSubmitting ? 'Création du compte...' : 'Créer un compte' }}
            </button>
          </form>

          <div class="text-center text-sm">
            <p class="text-[#5a5a52]">
              Vous avez déjà un compte ?
              <NuxtLink to="/login" class="font-medium text-[#2a2a22] hover:underline">
                Se connecter
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
useHead({
  title: 'Inscription - Audelweiss',
  meta: [
    { name: 'description', content: 'Créez votre compte Audelweiss' }
  ]
})

const { register } = useAuth()

const registerForm = reactive({
  firstName: '',    
  lastName: '',     
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const isSubmitting = ref(false)
const errorMessage = ref('')

const passwordMismatch = computed(() => {
  return registerForm.password !== registerForm.confirmPassword && registerForm.confirmPassword !== ''
})

const handleRegister = async () => {
  if (passwordMismatch.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas'
    return
  }

  if (registerForm.password.length < 8) {
    errorMessage.value = 'Le mot de passe doit contenir au moins 8 caractères'
    return
  }

  if (!registerForm.acceptTerms) {
    errorMessage.value = 'Vous devez accepter les conditions d&apos;utilisation'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    const username = `${registerForm.firstName.toLowerCase()}_${registerForm.lastName.toLowerCase()}`
    
    await register({
      username,
      email: registerForm.email,
      password: registerForm.password
    })
    
    await navigateTo('/login')
    
  } catch (error: any) {
    errorMessage.value = error.message || 'Erreur lors de l&apos;inscription'
    console.error('Register failed:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>