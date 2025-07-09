<template>
  <div class="flex min-h-screen flex-col">
    <section class="py-12 md:py-16 bg-white rounded-3xl shadow-xl border border-[#f5f2e9] mx-auto max-w-5xl my-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          <div class="space-y-6">
            <div>
              <h2 class="font-serif text-2xl md:text-3xl font-medium text-[#2a2a22]">
                Get in Touch
              </h2>
              <p class="mt-2 text-[#5a5a52] text-base md:text-lg">
                Fill out the form and we'll get back to you as soon as possible.
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
                  Phone
                </h3>
                <p class="text-[#5a5a52] text-sm">
                  +33 1 23 45 67 89
                </p>
              </div>
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22] text-base">
                  Studio
                </h3>
                <p class="text-[#5a5a52] text-sm">
                  123 Artisan Street<br />75001 Paris<br />France
                </p>
              </div>
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22] text-base">
                  Hours
                </h3>
                <p class="text-[#5a5a52] text-sm">
                  Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm<br />Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-6">
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <label for="first-name" class="text-sm font-medium text-[#2a2a22]">First name</label>
                  <input id="first-name" v-model="form.firstName" class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none" placeholder="Enter your first name" />
                </div>
                <div class="space-y-2">
                  <label for="last-name" class="text-sm font-medium text-[#2a2a22]">Last name</label>
                  <input id="last-name" v-model="form.lastName" class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none" placeholder="Enter your last name" />
                </div>
              </div>
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-[#2a2a22]">Email</label>
                <input id="email" v-model="form.email" type="email" class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none" placeholder="Enter your email" />
              </div>
              <div class="space-y-2">
                <label for="subject" class="text-sm font-medium text-[#2a2a22]">Subject</label>
                <select id="subject" v-model="form.subject" class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none">
                  <option value="">
                    Select a subject
                  </option>
                  <option value="general">
                    General Inquiry
                  </option>
                  <option value="order">
                    Order Status
                  </option>
                  <option value="custom">
                    Custom Order
                  </option>
                  <option value="wholesale">
                    Wholesale
                  </option>
                  <option value="other">
                    Other
                  </option>
                </select>
              </div>
              <div class="space-y-2">
                <label for="message" class="text-sm font-medium text-[#2a2a22]">Message</label>
                <textarea id="message" v-model="form.message" class="h-32 w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none" placeholder="Enter your message"></textarea>
              </div>
              <button type="submit" :disabled="isSubmitting" class="w-full bg-[#2a2a22] hover:bg-[#3a3a32] text-white rounded-none px-6 py-3 transition-colors cursor-pointer disabled:opacity-50">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// import Title from '~/components/dynamic/Title.vue' // plus utilisé

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
    console.log('Form submitted:', form)
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    alert('Message sent successfully!')
  } catch (error) {
    console.error('Error sending message:', error)
    alert('Error sending message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// SEO
useHead({
  title: 'Contact Us - Audelweiss',
  meta: [
    { name: 'description', content: 'Get in touch with Audelweiss. Contact us for custom orders, questions, or feedback.' },
  ],
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>