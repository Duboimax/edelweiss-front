<template>
  <div class="flex min-h-screen flex-col">
    <section class="py-12 md:py-16 bg-white rounded-3xl shadow-xl border border-[#f5f2e9] mx-auto max-w-5xl my-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          <div class="space-y-6">
            <div>
              <h2 class="font-serif text-2xl md:text-3xl font-medium text-[#2a2a22]">
                Contactez-nous
              </h2>
              <p class="mt-2 text-[#5a5a52] text-base md:text-lg">
                Remplissez le formulaire et nous vous répondrons dès que possible.
              </p>
            </div>
            <div class="space-y-4">
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22] text-base">
                  Email
                </h3>
                <p class="text-[#5a5a52] text-sm">
                  hello@audelweiss.com
                </p>
              </div>
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22] text-base">
                  Téléphone
                </h3>
                <p class="text-[#5a5a52] text-sm">
                  +33 1 23 45 67 89
                </p>
              </div>
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22] text-base">
                  Atelier
                </h3>
                <p class="text-[#5a5a52] text-sm">
                  123 rue de l'Artisan<br />75001 Paris<br />France
                </p>
              </div>
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22] text-base">
                  Horaires
                </h3>
                <p class="text-[#5a5a52] text-sm">
                  Lundi - Vendredi : 9h - 18h<br />Samedi : 10h - 16h<br />Dimanche : Fermé
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-6">
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <label for="first-name" class="text-sm font-medium text-[#2a2a22]">Prénom</label>
                  <input id="first-name" v-model="form.firstName" class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none" placeholder="Entrez votre prénom" />
                </div>
                <div class="space-y-2">
                  <label for="last-name" class="text-sm font-medium text-[#2a2a22]">Nom</label>
                  <input id="last-name" v-model="form.lastName" class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none" placeholder="Entrez votre nom" />
                </div>
              </div>
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-[#2a2a22]">Email</label>
                <input id="email" v-model="form.email" type="email" class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none" placeholder="Entrez votre email" />
              </div>
              <div class="space-y-2">
                <label for="subject" class="text-sm font-medium text-[#2a2a22]">Sujet</label>
                <select id="subject" v-model="form.subject" class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none">
                  <option value="">
                    Sélectionnez un sujet
                  </option>
                  <option value="general">
                    Demande générale
                  </option>
                  <option value="order">
                    Suivi de commande
                  </option>
                  <option value="custom">
                    Commande personnalisée
                  </option>
                  <option value="wholesale">
                    Revendeur
                  </option>
                  <option value="other">
                    Autre
                  </option>
                </select>
              </div>
              <div class="space-y-2">
                <label for="message" class="text-sm font-medium text-[#2a2a22]">Message</label>
                <textarea id="message" v-model="form.message" class="h-32 w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none" placeholder="Entrez votre message"></textarea>
              </div>
              <button type="submit" :disabled="isSubmitting" class="w-full bg-[#2a2a22] hover:bg-[#3a3a32] text-white rounded-none px-6 py-3 transition-colors cursor-pointer disabled:opacity-50">
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
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
// import Title from '~/components/dynamic/Title.vue' // plus utilisé

const strapi = useStrapi()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
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
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    alert('Message envoyé avec succès !')
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error)
    alert('Erreur lors de l\'envoi du message. Veuillez réessayer.')
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
.container {
  max-width: 1200px;
}
</style>