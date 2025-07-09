<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="relative overflow-hidden">
    <!-- Arrière-plan avec dégradés -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#f9f7f2] via-[#faf8f5] to-[#f5f2e9]">
      <div class="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-[#FFB6B0]/10 to-[#ff8e7a]/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-[#2a2a22]/5 to-[#3a3a32]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <!-- Contenu principal -->
    <div class="relative border-t border-[#e6e2d7] py-16">
      <div class="container mx-auto px-4 md:px-6">
        
        <!-- Section principale -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <!-- Logo et description -->
          <div class="lg:col-span-2 space-y-6">
            <NuxtLink to="/" class="group flex items-center">
              <div class="relative h-12 w-12 overflow-hidden rounded-2xl border-2 border-[#2a2a22] bg-gradient-to-br from-white to-[#f5f2e9] shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                <div class="flex h-full w-full items-center justify-center text-lg font-bold text-[#2a2a22] group-hover:text-[#FFB6B0] transition-colors">
                  A
                </div>
                <div class="absolute inset-0 bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </div>
              <div class="ml-4">
                <span class="font-serif text-2xl font-bold uppercase tracking-wide text-[#2a2a22] transition-colors group-hover:text-[#FFB6B0]">
                  Audelweiss
                </span>
                <p class="text-sm text-[#5a5a52] group-hover:text-[#2a2a22] transition-colors">
                  L'art du fait-main
                </p>
              </div>
            </NuxtLink>
            
            <div class="space-y-4">
              <p class="text-base text-[#5a5a52] leading-relaxed max-w-md">
                Depuis 2018, nous créons des pièces uniques avec passion dans les Alpes françaises. 
                Chaque création raconte une histoire, chaque détail exprime notre amour de l'artisanat.
              </p>
              
              <!-- Réseaux sociaux -->
              <div class="space-y-3">
                <h4 class="text-sm font-semibold text-[#2a2a22] uppercase tracking-wide">
                  Suivez-nous
                </h4>
                <div class="flex gap-3">
                  <a 
                    href="https://instagram.com/audelweiss" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="group relative w-10 h-10 bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full flex items-center justify-center text-[#2a2a22] hover:text-white hover:border-[#FFB6B0] transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Icon name="lucide:instagram" class="h-5 w-5 relative z-10" />
                  </a>
                  
                  <a 
                    href="https://facebook.com/audelweiss" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="group relative w-10 h-10 bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full flex items-center justify-center text-[#2a2a22] hover:text-white hover:border-[#FFB6B0] transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Facebook"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Icon name="lucide:facebook" class="h-5 w-5 relative z-10" />
                  </a>
                  
                  <a 
                    href="https://pinterest.com/audelweiss" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="group relative w-10 h-10 bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full flex items-center justify-center text-[#2a2a22] hover:text-white hover:border-[#FFB6B0] transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Pinterest"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Icon name="lucide:image" class="h-5 w-5 relative z-10" />
                  </a>
                  
                  <a 
                    href="mailto:contact@audelweiss.fr"
                    class="group relative w-10 h-10 bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full flex items-center justify-center text-[#2a2a22] hover:text-white hover:border-[#FFB6B0] transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Email"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Icon name="lucide:mail" class="h-5 w-5 relative z-10" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Boutique -->
          <div class="space-y-6">
            <h3 class="text-sm font-semibold text-[#2a2a22] uppercase tracking-wide flex items-center">
              <Icon name="lucide:shopping-bag" class="h-4 w-4 mr-2 text-[#FFB6B0]" />
              Boutique
            </h3>
            <ul class="space-y-3">
              <li>
                <NuxtLink 
                  to="/shop" 
                  class="group text-sm text-[#5a5a52] transition-all duration-200 hover:text-[#FFB6B0] hover:translate-x-1 flex items-center"
                >
                  <Icon name="lucide:chevron-right" class="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Tous les produits
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/collections/laine" 
                  class="group text-sm text-[#5a5a52] transition-all duration-200 hover:text-[#FFB6B0] hover:translate-x-1 flex items-center"
                >
                  <Icon name="lucide:chevron-right" class="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Créations en laine
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/collections/bois" 
                  class="group text-sm text-[#5a5a52] transition-all duration-200 hover:text-[#FFB6B0] hover:translate-x-1 flex items-center"
                >
                  <Icon name="lucide:chevron-right" class="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Artisanat en bois
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/collections/nouveautes" 
                  class="group text-sm text-[#5a5a52] transition-all duration-200 hover:text-[#FFB6B0] hover:translate-x-1 flex items-center"
                >
                  <Icon name="lucide:chevron-right" class="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Nouveautés
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Navigation À propos -->
          <div class="space-y-6">
            <h3 class="text-sm font-semibold text-[#2a2a22] uppercase tracking-wide flex items-center">
              <Icon name="lucide:heart" class="h-4 w-4 mr-2 text-[#FFB6B0]" />
              À propos
            </h3>
            <ul class="space-y-3">
              <li>
                <NuxtLink 
                  to="/about" 
                  class="group text-sm text-[#5a5a52] transition-all duration-200 hover:text-[#FFB6B0] hover:translate-x-1 flex items-center"
                >
                  <Icon name="lucide:chevron-right" class="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Notre histoire
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/about/processus" 
                  class="group text-sm text-[#5a5a52] transition-all duration-200 hover:text-[#FFB6B0] hover:translate-x-1 flex items-center"
                >
                  <Icon name="lucide:chevron-right" class="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Processus artisanal
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/contact" 
                  class="group text-sm text-[#5a5a52] transition-all duration-200 hover:text-[#FFB6B0] hover:translate-x-1 flex items-center"
                >
                  <Icon name="lucide:chevron-right" class="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Nous contacter
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/blogs" 
                  class="group text-sm text-[#5a5a52] transition-all duration-200 hover:text-[#FFB6B0] hover:translate-x-1 flex items-center"
                >
                  <Icon name="lucide:chevron-right" class="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog & Actualités
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="bg-white/60 backdrop-blur-sm border border-[#e6e2d7] rounded-2xl p-8 mb-12">
          <div class="max-w-2xl mx-auto text-center">
            <div class="flex items-center justify-center mb-4">
              <Icon name="lucide:mail" class="h-6 w-6 text-[#FFB6B0] mr-2" />
              <h3 class="text-xl font-serif font-semibold text-[#2a2a22]">
                Restez informé de nos créations
              </h3>
            </div>
            <p class="text-[#5a5a52] mb-6 leading-relaxed">
              Inscrivez-vous à notre newsletter pour découvrir en avant-première nos nouvelles créations et bénéficier d'offres exclusives.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email"
                class="flex-1 px-4 py-3 border border-[#e6e2d7] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFB6B0]/50 focus:border-[#FFB6B0] transition-all"
              />
              <button class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#FFB6B0] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        <!-- Séparateur -->
        <div class="border-t border-[#e6e2d7] mb-8"></div>

        <!-- Footer bottom -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p class="text-sm text-[#5a5a52] flex items-center">
              <Icon name="lucide:copyright" class="h-4 w-4 mr-1" />
              {{ currentYear }} Audelweiss. Tous droits réservés.
            </p>
            <div class="flex items-center text-sm text-[#5a5a52]">
              <Icon name="lucide:heart" class="h-4 w-4 mr-1 text-[#FFB6B0]" />
              <span>Fait avec amour en France</span>
            </div>
          </div>
          
          <div class="flex flex-wrap items-center gap-6 text-sm">
            <NuxtLink 
              to="/mentions-legales" 
              class="text-[#5a5a52] transition-colors hover:text-[#FFB6B0] flex items-center group"
            >
              <Icon name="lucide:scale" class="h-4 w-4 mr-1 group-hover:text-[#FFB6B0] transition-colors" />
              Mentions légales
            </NuxtLink>
            <NuxtLink 
              to="/confidentialite" 
              class="text-[#5a5a52] transition-colors hover:text-[#FFB6B0] flex items-center group"
            >
              <Icon name="lucide:shield" class="h-4 w-4 mr-1 group-hover:text-[#FFB6B0] transition-colors" />
              Confidentialité
            </NuxtLink>
            <NuxtLink 
              to="/cgv" 
              class="text-[#5a5a52] transition-colors hover:text-[#FFB6B0] flex items-center group"
            >
              <Icon name="lucide:file-text" class="h-4 w-4 mr-1 group-hover:text-[#FFB6B0] transition-colors" />
              CGV
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container {
  max-width: 1200px;
}

/* Animation pour les liens */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>