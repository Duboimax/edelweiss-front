<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f9f7f2] via-[#faf8f5] to-[#f5f2e9] relative overflow-hidden">
    <!-- Décoration d'arrière-plan sophistiquée -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-[#FFB6B0]/8 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2a2a22]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/3 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
    </div>

    <div class="flex min-h-screen items-center justify-center px-4 py-12 relative z-10">
      <div class="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        
        <!-- Section d'accueil - Style HomeSection -->
        <div class="hidden lg:block space-y-8">
          <div class="space-y-6">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full shadow-xl">
              <Icon name="lucide:sparkles" class="h-10 w-10 text-white" />
            </div>
            <h1 class="font-serif text-4xl md:text-5xl font-bold text-[#2a2a22] leading-tight">
              Rejoignez la famille
              <span class="text-[#FFB6B0]">Audelweiss</span>
            </h1>
            <p class="text-lg md:text-xl text-[#5a5a52] max-w-lg leading-relaxed">
              Créez votre compte et découvrez un monde de produits exclusifs et d'expériences uniques
            </p>
          </div>
          
          <!-- Avantages -->
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center shadow-md">
                <Icon name="lucide:gift" class="h-6 w-6 text-[#2a2a22]" />
              </div>
              <span class="text-[#5a5a52] font-medium">Offres membres exclusives</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center shadow-md">
                <Icon name="lucide:truck" class="h-6 w-6 text-[#2a2a22]" />
              </div>
              <span class="text-[#5a5a52] font-medium">Livraison gratuite</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center shadow-md">
                <Icon name="lucide:star" class="h-6 w-6 text-[#2a2a22]" />
              </div>
              <span class="text-[#5a5a52] font-medium">Programme de fidélité</span>
            </div>
          </div>
        </div>

        <!-- Formulaire d'inscription -->
        <div class="w-full max-w-md mx-auto lg:mx-0">
          <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-[#e6e2d7] hover:shadow-3xl transition-all duration-500">
            
            <!-- Header -->
            <div class="text-center mb-10">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full mb-6 shadow-lg">
                <Icon name="lucide:user-plus" class="h-8 w-8 text-white" />
              </div>
              <h2 class="font-serif text-3xl font-bold text-[#2a2a22] mb-2">Inscription</h2>
              <p class="text-[#5a5a52] text-lg">Créez votre compte en quelques clics</p>
            </div>

            <!-- Messages -->
            <div 
              v-if="errorMessage" 
              class="mb-8 p-4 bg-red-50/80 border border-red-200 rounded-2xl text-red-700 animate-fade-in"
            >
              <div class="flex items-center">
                <Icon name="lucide:alert-circle" class="h-5 w-5 mr-3 flex-shrink-0" />
                <span class="text-sm">{{ errorMessage }}</span>
              </div>
            </div>

            <div 
              v-if="successMessage" 
              class="mb-8 p-4 bg-green-50/80 border border-green-200 rounded-2xl text-green-700 animate-fade-in"
            >
              <div class="flex items-center">
                <Icon name="lucide:check-circle" class="h-5 w-5 mr-3 flex-shrink-0" />
                <span class="text-sm">{{ successMessage }}</span>
              </div>
            </div>

            <!-- Formulaire -->
            <form @submit.prevent="handleRegister" class="space-y-6">
              <!-- Nom et prénom -->
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-3">
                  <label for="firstName" class="text-sm font-semibold text-[#2a2a22] flex items-center">
                    <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    v-model="registerForm.firstName"
                    type="text"
                    class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/70 px-4 py-3 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                    placeholder="John"
                    required
                  />
                </div>
                
                <div class="space-y-3">
                  <label for="lastName" class="text-sm font-semibold text-[#2a2a22] flex items-center">
                    <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                    Nom
                  </label>
                  <input
                    id="lastName"
                    v-model="registerForm.lastName"
                    type="text"
                    class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/70 px-4 py-3 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-3">
                <label for="email" class="text-sm font-semibold text-[#2a2a22] flex items-center">
                  <Icon name="lucide:mail" class="h-4 w-4 mr-2" />
                  Adresse email
                </label>
                <div class="relative group">
                  <input
                    id="email"
                    v-model="registerForm.email"
                    type="email"
                    class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/70 px-6 py-4 text-lg focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                    placeholder="votre@email.com"
                    required
                  />
                  <div class="absolute inset-y-0 right-4 flex items-center">
                    <Icon name="lucide:at-sign" class="h-5 w-5 text-[#5a5a52]/40 group-focus-within:text-[#FFB6B0] transition-colors" />
                  </div>
                </div>
              </div>

              <!-- Mot de passe -->
              <div class="space-y-3">
                <label for="password" class="text-sm font-semibold text-[#2a2a22] flex items-center">
                  <Icon name="lucide:lock" class="h-4 w-4 mr-2" />
                  Mot de passe
                </label>
                <div class="relative group">
                  <input
                    id="password"
                    v-model="registerForm.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/70 px-6 py-4 pr-14 text-lg focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-4 cursor-pointer flex items-center text-[#5a5a52]/60 hover:text-[#2a2a22] transition-colors"
                  >
                    <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="h-5 w-5" />
                  </button>
                </div>
                
                <!-- Indicateur de force du mot de passe -->
                <div class="mt-3">
                  <div class="flex space-x-1">
                    <div 
                      v-for="i in 4" 
                      :key="i"
                      class="flex-1 h-2 rounded-full transition-all duration-300"
                      :class="getPasswordStrengthClass(i)"
                    ></div>
                  </div>
                  <p class="text-xs text-[#5a5a52] mt-2 font-medium">{{ passwordStrengthText }}</p>
                </div>
              </div>

              <!-- Bouton d'inscription -->
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full bg-gradient-to-r cursor-pointer from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Inscription...
                </span>
                <span v-else class="flex items-center justify-center ">
                  <Icon name="lucide:arrow-right" class="h-6 w-6 mr-2" />
                  Créer mon compte
                </span>
              </button>
            </form>

            <!-- Divider -->
            <div class="relative my-10">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-[#e6e2d7]"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-white px-6 text-[#5a5a52] font-medium">ou</span>
              </div>
            </div>

            <!-- Lien de connexion -->
            <div class="text-center">
              <p class="text-[#5a5a52] text-lg mb-6">Déjà membre ?</p>
              <NuxtLink 
                to="/login" 
                class="inline-flex items-center justify-center w-full border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <Icon name="lucide:log-in" class="h-6 w-6 mr-2" />
                Se connecter
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

    const data = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    }

    await register(data)
    
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
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Effet de focus personnalisé */
input:focus {
  transform: translateY(-2px);
}

/* Animation subtile pour les icônes */
.group:hover .lucide-at-sign {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>