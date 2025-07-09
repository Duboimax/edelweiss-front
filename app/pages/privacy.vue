<template>
  <div class="min-h-screen bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] flex flex-col items-center py-12 px-4">
    <div class="bg-white rounded-3xl shadow-2xl border border-[#f5f2e9] max-w-3xl w-full p-8 md:p-14 animate-pop-in">
      <h1 class="font-serif text-4xl font-bold text-[#2a2a22] mb-6 text-center">Politique de confidentialité</h1>
      <p class="text-[#5a5a52] text-lg mb-8 text-center">Votre vie privée est importante pour nous. Cette politique explique comment nous collectons, utilisons et protégeons vos données personnelles.</p>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">1. Collecte des informations</h2>
        <p class="text-[#5a5a52]">Nous collectons les informations que vous nous fournissez lors de la création d'un compte, de la passation d'une commande ou de l'utilisation de notre formulaire de contact. Cela inclut votre nom, adresse, email, numéro de téléphone, et toute autre information nécessaire à la gestion de votre commande.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">2. Utilisation des données</h2>
        <p class="text-[#5a5a52]">Vos données sont utilisées pour traiter vos commandes, améliorer votre expérience utilisateur, vous contacter en cas de besoin, et vous envoyer des informations sur nos produits et offres si vous y avez consenti.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">3. Partage des informations</h2>
        <p class="text-[#5a5a52]">Nous ne partageons pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour le traitement de votre commande (ex : prestataires de paiement, livraison) ou si la loi l'exige.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">4. Sécurité</h2>
        <p class="text-[#5a5a52]">Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">5. Vos droits</h2>
        <p class="text-[#5a5a52]">Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous à l'adresse suivante : <a href="mailto:hello@audelweiss.com" class="text-[#FFB6B0] underline">hello@audelweiss.com</a>.</p>
      </section>
      <section>
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">6. Contact</h2>
        <p class="text-[#5a5a52]">Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse ci-dessus.</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Politique de confidentialité - Audelweiss',
  meta: [
    { name: 'description', content: "Découvrez la politique de confidentialité d'Audelweiss : collecte, utilisation et protection de vos données personnelles." },
  ],
})
</script>

<style scoped>
.animate-pop-in {
  animation: pop-in 0.25s cubic-bezier(.4,1.6,.6,1) both;
}
@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
</style> 