<template>
  <div class="flex flex-col">
    <section class="py-12 md:py-16 bg-[#f9f7f2] flex-1 flex items-center justify-center">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-md space-y-6 bg-[#f5f2e9] p-8 border border-[#e6e2d7]">
          <div class="text-center">
            <h1 class="font-serif text-2xl font-medium text-[#2a2a22]">Se connecter</h1>
            <p class="mt-2 text-sm text-[#5a5a52]">Bienvenue à nouveau. Veuillez saisir vos informations pour continuer.</p>
          </div>

          <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium text-[#2a2a22]">
                Email
              </label>
              <input
                id="email"
                v-model="loginForm.email"
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
                v-model="loginForm.password"
                type="password"
                class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                placeholder="Entrer votre mot de passe"
                required
              />
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full bg-[#2a2a22] hover:bg-[#3a3a32] text-white rounded-none px-6 py-3 transition-colors disabled:opacity-50"
            >
              {{ isSubmitting ? 'Connexion...' : 'Se connecter' }}
            </button>
          </form>

          <div class="text-center text-sm">
            <p class="text-[#5a5a52]">
              Vous n&apos;avez pas de compte ?
              <NuxtLink to="/register" class="font-medium text-[#2a2a22] hover:underline">
                S&apos;enregistrer
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
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