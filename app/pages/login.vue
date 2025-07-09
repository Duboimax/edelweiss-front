<template>
  <div class="flex min-h-screen flex-col">
    <section class="py-12 md:py-16 bg-gradient-to-br from-[#f9f7f2] via-[#faf8f5] to-[#f5f2e9] flex-1 flex items-center justify-center relative overflow-hidden">
      <!-- Décoration d'arrière-plan -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#FFB6B0]/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2a2a22]/5 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="mx-auto max-w-md">
          <!-- Card principale avec animation -->
          <div class="bg-white/80 backdrop-blur-sm p-8 border border-[#e6e2d7] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            
            <!-- Header avec icône -->
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16  bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full mb-4 shadow-lg">
                <Icon name="lucide:user-circle" class="h-8 w-8 text-white" />
              </div>
              <h1 class="font-serif text-3xl font-medium text-[#2a2a22] mb-2">Bon retour !</h1>
              <p class="text-[#5a5a52] leading-relaxed">Connectez-vous pour accéder à votre espace personnel</p>
            </div>

            <!-- Message d'erreur animé -->
            <div 
              v-if="errorMessage" 
              class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-700 animate-shake"
            >
              <div class="flex items-center">
                <Icon name="lucide:alert-circle" class="h-5 w-5 mr-2" />
                <span class="text-sm">{{ errorMessage }}</span>
              </div>
            </div>

            <!-- Formulaire avec animations -->
            <form @submit.prevent="handleLogin" class="space-y-6">
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-[#2a2a22] flex items-center">
                  <Icon name="lucide:mail" class="h-4 w-4 mr-2" />
                  Adresse email
                </label>
                <div class="relative">
                  <input
                    id="email"
                    v-model="loginForm.email"
                    type="email"
                    class="w-full rounded-lg border border-[#e6e2d7] bg-white/50 px-4 py-3 focus:border-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#2a2a22]/20 transition-all duration-200 placeholder:text-[#5a5a52]/60"
                    placeholder="votre@email.com"
                    required
                  />
                  <div class="absolute inset-y-0 right-3 flex items-center">
                    <Icon name="lucide:at-sign" class="h-4 w-4 text-[#5a5a52]/40" />
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label for="password" class="text-sm font-medium text-[#2a2a22] flex items-center">
                  <Icon name="lucide:lock" class="h-4 w-4 mr-2" />
                  Mot de passe
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="loginForm.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full rounded-lg border border-[#e6e2d7] bg-white/50 px-4 py-3 pr-12 focus:border-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#2a2a22]/20 transition-all duration-200 placeholder:text-[#5a5a52]/60"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-3 flex items-center text-[#5a5a52]/60 hover:text-[#2a2a22] transition-colors"
                  >
                    <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <!-- Bouton de connexion avec animation -->
             <button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full bg-gradient-to-r cursor-pointer from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Connection...
                </span>
                <span v-else class="flex items-center justify-center">
                  <Icon name="lucide:user-plus" class="h-5 w-5 mr-2" />
                  Se connecter
                </span>
              </button>
            </form>

            <!-- Divider avec style -->
            <div class="relative my-8">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-[#e6e2d7]"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-white px-4 text-[#5a5a52]">ou</span>
              </div>
            </div>

            <!-- Lien d'inscription stylé -->
            <div class="text-center">
              <p class="text-[#5a5a52] mb-4">Nouveau sur Audelweiss ?</p>
              <NuxtLink 
                to="/register" 
                class="inline-flex items-center justify-center w-full border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Icon name="lucide:user-plus" class="h-5 w-5 mr-2" />
                Créer un compte
              </NuxtLink>
            </div>
          </div>

          <!-- Informations supplémentaires -->
          <div class="mt-8 text-center">
            <div class="flex items-center justify-center space-x-6 text-sm text-[#5a5a52]">
              <div class="flex items-center">
                <Icon name="lucide:shield-check" class="h-4 w-4 mr-1" />
                <span>Sécurisé</span>
              </div>
              <div class="flex items-center">
                <Icon name="lucide:clock" class="h-4 w-4 mr-1" />
                <span>Accès rapide</span>
              </div>
              <div class="flex items-center">
                <Icon name="lucide:heart" class="h-4 w-4 mr-1" />
                <span>Wishlist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

useHead({
  title: 'Connexion - Audelweiss',
  meta: [
    { name: 'description', content: 'Connectez-vous à votre compte Audelweiss' }
  ]
})

const { login } = useAuth()

const loginForm = reactive({
  email: '',
  password: ''
})

const isSubmitting = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    await login({
      identifier: loginForm.email,
      password: loginForm.password
    })
    
    await navigateTo('/dashboard')
    
  } catch (error: any) {
    errorMessage.value = error.message || 'Identifiants invalides'
    console.error('Login failed:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>