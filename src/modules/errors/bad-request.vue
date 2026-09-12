<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4">
    <div class="text-center max-w-md">
      <!-- Error Code Header -->
      <h1 class="text-9xl font-extrabold text-warning animate-pulse selection:bg-base-content selection:text-base-100">
        400
      </h1>
      
      <!-- Error Message Card -->
      <div class="card bg-base-100 shadow-xl mt-8">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-2xl font-bold text-base-content">
            Bad Request
          </h2>
          <p class="text-base-content/70 my-2">
            The server couldn't understand the request you made. It might be due to malformed syntax, an invalid request message, or deceptive routing.
          </p>
          
          <!-- Visual alert icon -->
          <div class="py-2 text-warning">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions justify-center gap-4 w-full mt-4">
            <button @click="goBack" class="btn btn-outline btn-warning flex-1 sm:flex-none">
              Go Back
            </button>
            <router-link to="/" class="btn btn-warning flex-1 sm:flex-none text-warning-content">
              Take Me Home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => window.history.length > 1 ? router.back() : router.push('/')
</script>