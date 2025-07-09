<template>
  <div class="flex min-h-screen flex-col">
    <div class="container mx-auto px-4 max-w-5xl mt-8">
      <Breadcrumb :items="[
        { label: 'Accueil', to: '/' },
        { label: 'Inscription', to: null }
      ]" />
    </div>

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
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full mb-4 shadow-lg">
                <Icon name="lucide:user-plus" class="h-8 w-8 text-white" />
              </div>
              <h1 class="font-serif text-3xl font-medium text-[#2a2a22] mb-2">Rejoignez-nous !</h1>
              <p class="text-[#5a5a52] leading-relaxed">Créez votre compte pour découvrir nos produits exclusifs</p>
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

            <!-- Message de succès -->
            <div 
              v-if="successMessage" 
              class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg text-green-700"
            >
              <div class="flex items-center">
                <Icon name="lucide:check-circle" class="h-5 w-5 mr-2" />
                <span class="text-sm">{{ successMessage }}</span>
              </div>
            </div>

            <!-- Formulaire avec animations -->
            <form @submit.prevent="handleRegister" class="space-y-6">
              <!-- Nom et prénom sur la même ligne -->
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="firstName" class="text-sm font-medium text-[#2a2a22] flex items-center">
                    <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    v-model="registerForm.firstName"
                    type="text"
                    class="w-full rounded-lg border border-[#e6e2d7] bg-white/50 px-4 py-3 focus:border-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#2a2a22]/20 transition-all duration-200 placeholder:text-[#5a5a52]/60"
                    placeholder="John"
                    required
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="lastName" class="text-sm font-medium text-[#2a2a22] flex items-center">
                    <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                    Nom
                  </label>
                  <input
                    id="lastName"
                    v-model="registerForm.lastName"
                    type="text"
                    class="w-full rounded-lg border border-[#e6e2d7] bg-white/50 px-4 py-3 focus:border-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#2a2a22]/20 transition-all duration-200 placeholder:text-[#5a5a52]/60"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-[#2a2a22] flex items-center">
                  <Icon name="lucide:mail" class="h-4 w-4 mr-2" />
                  Adresse email
                </label>
                <div class="relative">
                  <input
                    id="email"
                    v-model="registerForm.email"
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

              <!-- Mot de passe -->
              <div class="space-y-2">
                <label for="password" class="text-sm font-medium text-[#2a2a22] flex items-center">
                  <Icon name="lucide:lock" class="h-4 w-4 mr-2" />
                  Mot de passe
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="registerForm.password"
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
                <!-- Indicateur de force du mot de passe -->
                <div class="mt-2">
                  <div class="flex space-x-1">
                    <div 
                      v-for="i in 4" 
                      :key="i"
                      class="flex-1 h-2 rounded-full transition-all duration-200"
                      :class="getPasswordStrengthClass(i)"
                    ></div>
                  </div>
                  <p class="text-xs text-[#5a5a52] mt-1">{{ passwordStrengthText }}</p>
                </div>
              </div>

              <!-- Bouton d'inscription avec animation -->
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full bg-gradient-to-r cursor-pointer from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Inscription...
                </span>
                <span v-else class="flex items-center justify-center">
                  <Icon name="lucide:user-plus" class="h-5 w-5 mr-2" />
                  Créer mon compte
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

            <!-- Lien de connexion stylé -->
            <div class="text-center">
              <p class="text-[#5a5a52] mb-4">Déjà membre ?</p>
              <NuxtLink 
                to="/login" 
                class="inline-flex items-center cursor-pointer justify-center w-full border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Icon name="lucide:log-in" class="h-5 w-5 mr-2" />
                Se connecter
              </NuxtLink>
            </div>
          </div>

          <!-- Informations supplémentaires -->
          <div class="mt-8 text-center">
            <div class="flex items-center justify-center space-x-6 text-sm text-[#5a5a52]">
              <div class="flex items-center">
                <Icon name="lucide:gift" class="h-4 w-4 mr-1" />
                <span>Offres exclusives</span>
              </div>
              <div class="flex items-center">
                <Icon name="lucide:truck" class="h-4 w-4 mr-1" />
                <span>Livraison gratuite</span>
              </div>
              <div class="flex items-center">
                <Icon name="lucide:star" class="h-4 w-4 mr-1" />
                <span>Points fidélité</span>
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
  username: ''
})

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showPassword = ref(false)

// Calculer la force du mot de passe
const passwordStrength = computed(() => {
  const password = registerForm.password
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return strength
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return 'Saisissez un mot de passe'
  if (strength === 1) return 'Faible'
  if (strength === 2) return 'Moyen'
  if (strength === 3) return 'Fort'
  return 'Très fort'
})

const getPasswordStrengthClass = (index: number) => {
  const strength = passwordStrength.value
  if (index <= strength) {
    if (strength === 1) return 'bg-red-400'
    if (strength === 2) return 'bg-yellow-400'
    if (strength === 3) return 'bg-blue-400'
    if (strength === 4) return 'bg-green-400'
  }
  return 'bg-gray-200'
}

const handleRegister = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Générer le username à partir de l'email
    registerForm.username = registerForm.email.split('@')[0] + '_' + Date.now()
    
    await register(registerForm)
    
    successMessage.value = 'Compte créé avec succès ! Redirection...'
    
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 1500)
    
  } catch (error: any) {
    errorMessage.value = error.message || 'Erreur lors de l\'inscription'
    console.error('Register failed:', error)
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