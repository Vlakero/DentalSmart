<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Barber from '../assets/img/Barbershop.jpg'
</script>

<template>
  <header class="relative w-full h-237 bg-cover bg-center opacity-90" :style="{ backgroundImage: `url(${Barber})` }">
    <Navbar/>
    <div class="relative text-center text-white p-[15rem]">
    <svg width="100%" height="150" viewBox="0 0 500 150">
      <!-- Definir el camino para el texto -->
      <defs>
        <path id="curve" d="M10,140 C180,20 320,20 490,140" />
      </defs>
      <!-- Aplicar el texto a lo largo del camino con el color -->
      <text font-size="50" font-family="Arial">
        <textPath href="#curve" fill="#AB9385" startOffset="50%" text-anchor="middle">
          Really Barber Shop
        </textPath>
      </text>
    </svg>
  </div>

  <div class="relative text-center text-white mt-[-12rem] flex items-center justify-center">
    <div class="bg-[#AB9385] w-24 h-16 mr-4"><h1 class="font-bold text-3xl p-3">Singe</h1></div>
    <h1 class="text-9xl font-bold">Barber Shop</h1>
    <div class="bg-[#AB9385] w-24 h-16 ml-4"><h1 class="font-bold text-3xl p-3">2025</h1></div>
  </div>

  <div class="flex items-center justify-center m-20">
    <RouterLink
    to="/login"
    class="w-[25rem] h-20 bg-[#AB9385] text-white font-bold text-4xl py-2 rounded flex items-center justify-center">
    Iniciar
  </RouterLink>
  </div>
  </header>

</template>