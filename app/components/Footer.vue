<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="border-t border-[#e6e2d7] bg-[#f9f7f2] py-12">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div class="flex flex-col items-center md:items-start">
          <NuxtLink to="/" class="group flex items-center">
            <div class="relative h-10 w-10 overflow-hidden rounded-full border border-[#2a2a22] transition-all duration-200 group-hover:border-[#1a1a15] group-hover:shadow-sm">
              <div class="flex h-full w-full items-center justify-center text-sm font-medium">A</div>
            </div>
            <div class="ml-3">
              <span class="font-serif text-lg uppercase tracking-wide text-[#2a2a22] transition-colors group-hover:text-[#1a1a15]">Audelweiss</span>
            </div>
          </NuxtLink>
          <p class="text-sm text-[#5a5a52] mt-4 text-center md:text-left leading-relaxed">
            Handcrafted with care since 2018
          </p>
        </div>

        <div class="flex flex-wrap justify-center md:justify-end gap-22 md:gap-20">
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-[#2a2a22] uppercase tracking-wide">Shop</h3>
            <ul class="space-y-3 text-sm text-[#5a5a52]">
              <li>
                <NuxtLink to="/shop" class="transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
                  All Products
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/collections/wool" class="transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
                  Wool Creations
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/collections/wood" class="transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
                  Wood Crafts
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-[#2a2a22] uppercase tracking-wide">About</h3>
            <ul class="space-y-3 text-sm text-[#5a5a52]">
              <li>
                <NuxtLink to="/about" class="transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
                  Our Story
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about" class="transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
                  Artisanal Process
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
                  Contact Us
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-[#2a2a22] uppercase tracking-wide">Account</h3>
            <ul class="space-y-3 text-sm text-[#5a5a52]">
              <li>
                <NuxtLink to="/login" class="transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
                  Login
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/register" class="transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
                  Register
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/cart" class="transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
                  Cart
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-[#e6e2d7] flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-[#5a5a52]">© {{ currentYear }} Audelweiss. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <NuxtLink to="/privacy" class="text-sm text-[#5a5a52] transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
            Politique de confidentialité
          </NuxtLink>
          <NuxtLink to="/cgv" class="text-sm text-[#5a5a52] transition-colors hover:text-[#2a2a22] hover:underline underline-offset-2">
            Conditions Générales de Vente
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>