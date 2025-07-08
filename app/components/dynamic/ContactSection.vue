<template>
  <div class="flex min-h-screen flex-col">
    <section class="bg-[#f5f2e9] py-16 md:py-24">
      <div class="container mx-auto px-4 md:px-6">
        <div class="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 class="font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl text-[#2a2a22]">
            Contact Us
          </h1>
          <p class="text-lg text-[#5a5a52] md:text-xl max-w-[700px]">
            We'd love to hear from you. Get in touch with any questions, custom orders, or feedback.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-[#f9f7f2]">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div class="space-y-6">
            <div>
              <h2 class="font-serif text-3xl font-medium text-[#2a2a22]">Get in Touch</h2>
              <p class="mt-2 text-[#5a5a52]">Fill out the form and we'll get back to you as soon as possible.</p>
            </div>
            <div class="space-y-4">
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22]">Email</h3>
                <p class="text-[#5a5a52]">hello@audelweiss.com</p>
              </div>
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22]">Phone</h3>
                <p class="text-[#5a5a52]">+33 1 23 45 67 89</p>
              </div>
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22]">Studio</h3>
                <p class="text-[#5a5a52]">
                  123 Artisan Street
                  <br />
                  75001 Paris
                  <br />
                  France
                </p>
              </div>
              <div class="space-y-2">
                <h3 class="font-medium text-[#2a2a22]">Hours</h3>
                <p class="text-[#5a5a52]">
                  Monday - Friday: 9am - 6pm
                  <br />
                  Saturday: 10am - 4pm
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-6">
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <label for="first-name" class="text-sm font-medium text-[#2a2a22]">
                    First name
                  </label>
                  <input
                    id="first-name"
                    v-model="form.firstName"
                    class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                    placeholder="Enter your first name"
                  />
                </div>
                <div class="space-y-2">
                  <label for="last-name" class="text-sm font-medium text-[#2a2a22]">
                    Last name
                  </label>
                  <input
                    id="last-name"
                    v-model="form.lastName"
                    class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-[#2a2a22]">
                  Email
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div class="space-y-2">
                <label for="subject" class="text-sm font-medium text-[#2a2a22]">
                  Subject
                </label>
                <select 
                  id="subject" 
                  v-model="form.subject"
                  class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="custom">Custom Order</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="space-y-2">
                <label for="message" class="text-sm font-medium text-[#2a2a22]">
                  Message
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="h-32 w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full bg-[#2a2a22] hover:bg-[#3a3a32] text-white rounded-none px-6 py-3 transition-colors cursor-pointer disabled:opacity-50"
              >
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
import Map from '~/components/dynamic/Map.vue'
import QuestionBlock from '~/components/dynamic/QuestionBlock.vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    console.log('Form submitted:', form)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
    
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
    { name: 'description', content: 'Get in touch with Audelweiss. Contact us for custom orders, questions, or feedback.' }
  ]
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>