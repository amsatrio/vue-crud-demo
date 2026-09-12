<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4">
    <div class="text-center max-w-md">
      <h1 class="text-9xl font-extrabold text-primary animate-bounce selection:bg-secondary selection:text-secondary-content">
        404
      </h1>
      
      <div class="card bg-base-100 shadow-xl mt-8 compact md:normal">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-2xl font-bold text-base-content">
            Oops! Page Not Found
          </h2>
          <p class="text-base-content/70 my-2">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div class="py-4">
            <span class="loading loading-gator text-secondary loading-lg"></span>
          </div>

          <div class="card-actions justify-center gap-4 w-full mt-4">
            <button 
              @click="goBack" 
              class="btn btn-outline btn-secondary flex-1 sm:flex-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-currentColor="white" class="w-5 h-5 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Go Back
            </button>
            
            <router-link 
              to="/" 
              class="btn btn-primary flex-1 sm:flex-none"
            >
              Take Me Home
            </router-link>
          </div>
        </div>
      </div>

      <div class="mt-8 text-sm opacity-60">
        Think this is a mistake? <a href="#" class="link link-hover link-primary">Contact Support</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  // Checks if there's a previous history entry, otherwise sends them home
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
/* Custom bounce tweak to keep it subtle and smooth */
@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.animate-bounce {
  animation: bounce 2s infinite;
}
</style>