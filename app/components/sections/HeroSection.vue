<template>
  <section class="bg-[#f5f2e9] py-20 md:py-32">
    <div class="container px-4 md:px-6 ml-20">
      <div class="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div class="flex flex-col justify-center space-y-6">
          <div class="space-y-4">
            <h1 class="font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl text-[#2a2a22]">
              Unique Crochet Creations
            </h1>
            <p class="text-lg text-[#2a2a22] md:text-xl max-w-[500px]">
              Each piece is carefully handcrafted with skill and attention to detail.
            </p>
          </div>
          <div>
            <button 
              class="bg-[#2a2a22] hover:bg-[#3a3a32] text-white rounded-none px-8 py-3 text-lg font-medium transition-colors duration-200"
              @click="handleShopNow"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <img 
            src="https://www.futura-sciences.com/tech/dossiers/technologie-photo-numerique-capteur-image-773/" 
            alt="Crochet Hero Image" 
            class="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CrochetHero',
  methods: {
    handleShopNow() {
      console.log('Shop Now clicked');
    }
  }
}
</script>
