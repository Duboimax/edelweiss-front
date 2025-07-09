<template>
  <div class="min-h-screen bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] flex flex-col items-center py-12 px-4">
    <div class="bg-white rounded-3xl shadow-2xl border border-[#f5f2e9] max-w-3xl w-full p-8 md:p-14 animate-pop-in">
      <h1 class="font-serif text-4xl font-bold text-[#2a2a22] mb-6 text-center">Conditions Générales de Vente</h1>
      <p class="text-[#5a5a52] text-lg mb-8 text-center">Veuillez lire attentivement les présentes conditions générales de vente (CGV) avant de passer commande sur notre site.</p>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">1. Objet</h2>
        <p class="text-[#5a5a52]">Les présentes CGV définissent les droits et obligations des parties dans le cadre de la vente en ligne de produits proposés par Audelweiss.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">2. Commandes</h2>
        <p class="text-[#5a5a52]">Toute commande passée sur le site implique l’acceptation pleine et entière des présentes CGV. Le client reçoit un email de confirmation après validation de la commande.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">3. Prix</h2>
        <p class="text-[#5a5a52]">Les prix sont indiqués en euros, toutes taxes comprises. Audelweiss se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">4. Paiement</h2>
        <p class="text-[#5a5a52]">Le paiement s’effectue en ligne par carte bancaire via une plateforme sécurisée. La commande sera traitée après validation du paiement.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">5. Livraison</h2>
        <p class="text-[#5a5a52]">Les produits sont livrés à l’adresse indiquée par le client lors de la commande. Les délais de livraison sont donnés à titre indicatif.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">6. Droit de rétractation</h2>
        <p class="text-[#5a5a52]">Conformément à la loi, le client dispose d’un délai de 14 jours pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.</p>
      </section>
      <section class="mb-8">
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">7. Litiges</h2>
        <p class="text-[#5a5a52]">En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux français seront seuls compétents.</p>
      </section>
      <section>
        <h2 class="font-semibold text-2xl text-[#2a2a22] mb-2">8. Contact</h2>
        <p class="text-[#5a5a52]">Pour toute question relative aux présentes CGV, vous pouvez nous contacter à l’adresse suivante : <a href="mailto:hello@audelweiss.com" class="text-[#FFB6B0] underline">hello@audelweiss.com</a>.</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Conditions Générales de Vente - Audelweiss',
  meta: [
    { name: 'description', content: "Consultez les conditions générales de vente d'Audelweiss : commandes, prix, paiement, livraison, rétractation, litiges." },
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