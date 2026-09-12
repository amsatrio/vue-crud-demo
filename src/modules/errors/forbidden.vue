<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4">
    <div class="text-center max-w-md">
      <!-- Error Code Header -->
      <h1 class="text-9xl font-extrabold text-neutral-content bg-neutral rounded-box px-6 py-2 shadow-2xl tracking-wider">
        403
      </h1>
      
      <!-- Error Message Card -->
      <div class="card bg-base-100 shadow-xl mt-8">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-2xl font-bold text-neutral">
            Access Denied
          </h2>
          <p class="text-base-content/70 my-2">
            You don't have permission to access this resource. Please contact your system administrator if you think this is a mistake.
          </p>
          
          <!-- Hand/Stop Sign Visual -->
          <div class="py-2 text-error">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions justify-center gap-4 w-full mt-4">
            <button @click="goBack" class="btn btn-outline btn-neutral flex-1 sm:flex-none">
              Go Back
            </button>
            <router-link to="/" class="btn btn-primary flex-1 sm:flex-none">
              Dashboard
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