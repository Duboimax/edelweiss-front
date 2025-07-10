<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f9f7f2] via-[#faf8f5] to-[#f5f2e9] relative overflow-hidden">
    <!-- Décoration d'arrière-plan sophistiquée -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-[#FFB6B0]/6 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2a2a22]/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
    </div>

    <section class="py-16 md:py-24 relative z-10">
      <div class="container mx-auto px-4 md:px-6 max-w-7xl">
        
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full mb-8 shadow-xl">
            <Icon name="lucide:message-circle" class="h-10 w-10 text-white" />
          </div>
          <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#2a2a22] mb-6">
            Contactez-nous
          </h1>
          <p class="text-xl md:text-2xl text-[#5a5a52] max-w-3xl mx-auto leading-relaxed">
            Nous sommes là pour répondre à toutes vos questions et créer ensemble vos projets sur mesure
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-2 gap-12 items-start">
          
          <!-- Informations de contact -->
          <div class="space-y-8">
            <!-- Card principale des informations -->
            <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7] shadow-xl">
              <div class="flex items-center gap-4 mb-8">
                <div class="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-lg">
                  <Icon name="lucide:map-pin" class="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 class="font-serif text-2xl font-bold text-[#2a2a22]">Nos Coordonnées</h2>
                  <p class="text-[#5a5a52]">Plusieurs façons de nous joindre</p>
                </div>
              </div>

              <div class="space-y-6">
                <!-- Email -->
                <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5] rounded-2xl border border-[#e6e2d7]/50 hover:shadow-lg transition-all duration-300">
                  <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <Icon name="lucide:mail" class="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-[#2a2a22] mb-1">Email</h3>
                    <a href="mailto:hello@audelweiss.com" class="text-[#5a5a52] hover:text-[#FFB6B0] transition-colors cursor-pointer">
                      hello@audelweiss.com
                    </a>
                    <p class="text-xs text-[#5a5a52] mt-1">Réponse sous 24h</p>
                  </div>
                </div>

                <!-- Téléphone -->
                <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5] rounded-2xl border border-[#e6e2d7]/50 hover:shadow-lg transition-all duration-300">
                  <div class="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-md">
                    <Icon name="lucide:phone" class="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-[#2a2a22] mb-1">Téléphone</h3>
                    <a href="tel:+33123456789" class="text-[#5a5a52] hover:text-[#FFB6B0] transition-colors cursor-pointer">
                      +33 1 23 45 67 89
                    </a>
                    <p class="text-xs text-[#5a5a52] mt-1">Lun-Ven 9h-18h</p>
                  </div>
                </div>

                <!-- Adresse -->
                <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5] rounded-2xl border border-[#e6e2d7]/50 hover:shadow-lg transition-all duration-300">
                  <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-md">
                    <Icon name="lucide:map-pin" class="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-[#2a2a22] mb-1">Atelier</h3>
                    <address class="text-[#5a5a52] not-italic leading-relaxed">
                      123 rue de l'Artisan<br />
                      75001 Paris<br />
                      France
                    </address>
                  </div>
                </div>

                <!-- Horaires -->
                <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5] rounded-2xl border border-[#e6e2d7]/50 hover:shadow-lg transition-all duration-300">
                  <div class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                    <Icon name="lucide:clock" class="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-[#2a2a22] mb-2">Horaires d'ouverture</h3>
                    <div class="space-y-1 text-sm">
                      <div class="flex justify-between">
                        <span class="text-[#5a5a52]">Lundi - Vendredi</span>
                        <span class="text-[#2a2a22] font-medium">9h - 18h</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-[#5a5a52]">Samedi</span>
                        <span class="text-[#2a2a22] font-medium">10h - 16h</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-[#5a5a52]">Dimanche</span>
                        <span class="text-red-500 font-medium">Fermé</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card services -->
            <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl">
              <h3 class="font-serif text-lg font-bold text-[#2a2a22] mb-4 flex items-center gap-2">
                <Icon name="lucide:sparkles" class="h-5 w-5 text-[#FFB6B0]" />
                Nos Services
              </h3>
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="flex items-center gap-2 text-[#5a5a52]">
                  <div class="w-2 h-2 bg-[#FFB6B0] rounded-full"></div>
                  <span>Commandes personnalisées</span>
                </div>
                <div class="flex items-center gap-2 text-[#5a5a52]">
                  <div class="w-2 h-2 bg-[#FFB6B0] rounded-full"></div>
                  <span>Suivi de commande</span>
                </div>
                <div class="flex items-center gap-2 text-[#5a5a52]">
                  <div class="w-2 h-2 bg-[#FFB6B0] rounded-full"></div>
                  <span>Partenariats</span>
                </div>
                <div class="flex items-center gap-2 text-[#5a5a52]">
                  <div class="w-2 h-2 bg-[#FFB6B0] rounded-full"></div>
                  <span>Support technique</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire de contact -->
          <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7] shadow-xl">
            <div class="flex items-center gap-4 mb-8">
              <div class="h-12 w-12 rounded-full bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] flex items-center justify-center shadow-lg">
                <Icon name="lucide:send" class="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 class="font-serif text-2xl font-bold text-[#2a2a22]">Envoyez-nous un message</h2>
                <p class="text-[#5a5a52]">Nous vous répondrons rapidement</p>
              </div>
            </div>

            <!-- Message de succès -->
            <div v-if="showSuccess" class="mb-6 p-4 bg-green-50/80 border border-green-200 rounded-2xl text-green-700 animate-fade-in">
              <div class="flex items-center">
                <Icon name="lucide:check-circle" class="h-5 w-5 mr-3 flex-shrink-0" />
                <span class="font-medium">Message envoyé avec succès ! Nous vous répondrons sous 24h.</span>
              </div>
            </div>

            <!-- Message d'erreur -->
            <div v-if="showError" class="mb-6 p-4 bg-red-50/80 border border-red-200 rounded-2xl text-red-700 animate-fade-in">
              <div class="flex items-center">
                <Icon name="lucide:alert-circle" class="h-5 w-5 mr-3 flex-shrink-0" />
                <span class="font-medium">Erreur lors de l'envoi. Veuillez réessayer.</span>
              </div>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Nom et Prénom -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label for="first-name" class="text-sm font-semibold text-[#2a2a22] flex items-center">
                    <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                    Prénom
                  </label>
                  <input 
                    id="first-name" 
                    v-model="form.firstName" 
                    class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/80 px-6 py-4 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                    placeholder="Votre prénom"
                    required
                  />
                </div>
                <div class="space-y-3">
                  <label for="last-name" class="text-sm font-semibold text-[#2a2a22] flex items-center">
                    <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                    Nom
                  </label>
                  <input 
                    id="last-name" 
                    v-model="form.lastName" 
                    class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/80 px-6 py-4 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                    placeholder="Votre nom"
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
                <div class="relative">
                  <input 
                    id="email" 
                    v-model="form.email" 
                    type="email"
                    class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/80 px-6 py-4 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                    placeholder="votre@email.com"
                    required
                  />
                  <div class="absolute inset-y-0 right-4 flex items-center">
                    <Icon name="lucide:at-sign" class="h-5 w-5 text-[#5a5a52]/40" />
                  </div>
                </div>
              </div>

              <!-- Sujet -->
              <div class="space-y-3">
                <label for="subject" class="text-sm font-semibold text-[#2a2a22] flex items-center">
                  <Icon name="lucide:tag" class="h-4 w-4 mr-2" />
                  Sujet
                </label>
                <select 
                  id="subject" 
                  v-model="form.subject" 
                  class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/80 px-6 py-4 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300"
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="general">Demande générale</option>
                  <option value="order">Suivi de commande</option>
                  <option value="custom">Commande personnalisée</option>
                  <option value="wholesale">Revendeur</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <!-- Message -->
              <div class="space-y-3">
                <label for="message" class="text-sm font-semibold text-[#2a2a22] flex items-center">
                  <Icon name="lucide:message-square" class="h-4 w-4 mr-2" />
                  Message
                </label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="5"
                  class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/80 px-6 py-4 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50 resize-none"
                  placeholder="Décrivez votre demande en détail..."
                  required
                ></textarea>
              </div>

              <!-- Bouton d'envoi -->
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full bg-gradient-to-r cursor-pointer from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Envoi en cours...
                </span>
                <span v-else class="flex items-center justify-center">
                  <Icon name="lucide:send" class="h-6 w-6 mr-2" />
                  Envoyer le message
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useStrapi } from '~/composables/useStrapi'

const strapi = useStrapi()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false
  
  try {
    // Insertion en base Strapi (table Contact)
    await strapi.post('contacts', {
      data: {
        firstName: form.firstName,
        name: form.lastName,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }
    })
    
    // Reset du formulaire
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
    
    showSuccess.value = true
    
    // Masquer le message de succès après 5 secondes
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error)
    showError.value = true
    
    // Masquer le message d'erreur après 5 secondes
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

// SEO
useHead({
  title: 'Contact - Audelweiss',
  meta: [
    { name: 'description', content: 'Contactez Audelweiss. Écrivez-nous pour une commande personnalisée, une question ou un retour.' },
  ],
})
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
input:focus, select:focus, textarea:focus {
  transform: translateY(-2px);
}

/* Amélioration du select */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 3rem;
}

/* Animation pour les cartes d'informations */
.hover\:shadow-lg:hover {
  transform: translateY(-2px);
}
</style>