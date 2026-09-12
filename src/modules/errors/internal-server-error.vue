<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4">
    <div class="text-center max-w-md">
      <h1 class="text-9xl font-extrabold text-base-content/20 selection:bg-error selection:text-error-content">
        500
      </h1>
      
      <div class="card bg-base-100 shadow-xl mt-8 border-t-4 border-neutral">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-2xl font-bold text-base-content">
            Internal Server Error
          </h2>
          <p class="text-base-content/70 my-2">
            Something went wrong on our end. Our servers are acting up, but our team of code monkeys has already been notified.
          </p>
          
          <div class="py-4 flex gap-1 justify-center items-end h-16">
            <span class="w-3 h-8 bg-neutral/30 rounded-t animate-pulse"></span>
            <span class="w-3 h-12 bg-neutral/30 rounded-t animate-pulse delay-75"></span>
            <span class="w-3 h-6 bg-error rounded-t animate-bounce"></span>
            <span class="w-3 h-10 bg-neutral/30 rounded-t animate-pulse delay-150"></span>
          </div>

          <div class="card-actions justify-center gap-4 w-full mt-4">
            <button 
              @click="refreshPage" 
              class="btn btn-neutral flex-1 sm:flex-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Try Again
            </button>
            
            <router-link 
              to="/" 
              class="btn btn-outline btn-ghost flex-1 sm:flex-none"
            >
              Go Home
            </router-link>
          </div>
        </div>
      </div>

      <div class="mt-8 text-sm opacity-60">
        Want to check real-time updates? <a href="#" class="link link-hover link-neutral font-semibold">Check System Status</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const refreshPage = () => {
  window.location.reload()
}
</script>

<style scoped>
/* Delay utility classes for standard CSS animations if needed */
.delay-75 {
  animation-delay: 75ms;
}
.delay-150 {
  animation-delay: 150ms;
}
</style>