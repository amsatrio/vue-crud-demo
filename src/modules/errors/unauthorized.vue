<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4">
    <div class="text-center max-w-md">
      <!-- Error Code Header -->
      <h1 class="text-9xl font-extrabold text-error selection:bg-neutral selection:text-neutral-content">
        401
      </h1>
      
      <!-- Error Message Card -->
      <div class="card bg-base-100 shadow-xl mt-8 border-t-4 border-error">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-2xl font-bold text-base-content">
            Authentication Required
          </h2>
          <p class="text-base-content/70 my-2">
            Oops! You need to be logged in to view this page. Your session might have expired.
          </p>
          
          <!-- Lock Visual Icon -->
          <div class="py-2 text-error animate-bounce duration-1000">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions justify-center gap-4 w-full mt-4">
            <router-link to="/login" class="btn btn-error text-error-content flex-1">
              Log In
            </router-link>
            <router-link to="/" class="btn btn-ghost flex-1">
              Cancel
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No complex script logic needed unless you want a dynamic back button redirect
</script>