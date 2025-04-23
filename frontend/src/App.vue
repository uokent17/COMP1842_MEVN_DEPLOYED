<template>
  <div class="min-h-screen bg-neutral-100 text-neutral-900 font-sans">
    <!-- Header -->
    <header class="bg-red-600 text-white shadow">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold tracking-wide">MEVN CRUD</h1>
        <nav class="space-x-6 text-sm">
          <router-link to="/" class="hover:underline text-white">Home</router-link>
          <router-link to="/create" class="hover:underline text-white">Create</router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-sm">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="mt-10 text-center text-xs text-gray-400">
      &copy; 2025 MEVN CRUD App. All rights reserved.
    </footer>
  </div>
</template>
