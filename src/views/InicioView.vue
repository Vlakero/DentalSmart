<script setup lang="ts">
import FondoHomeDS from '../assets/img/FondoHomeDS.jpg'
</script>

<template>
  <header class="relative w-full h-237 bg-cover bg-center"
    :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)), url(${FondoHomeDS})` }">

    <div class="relative text-center text-white p-[6rem]"> <!-- Reducido el padding -->
      <svg width="100%" height="150" viewBox="0 0 500 150">
        <!-- Definir el camino para el texto -->
        <defs>
          <path id="curve" d="M10,140 C180,20 320,20 490,140" />
        </defs>
        <!-- Aplicar el texto a lo largo del camino con el color -->
        <text font-size="50" font-family="Arial">
          <textPath href="#curve" fill="#004B93" startOffset="50%" text-anchor="middle">
            DentalSmart est.2025
          </textPath>
        </text>
      </svg>
    </div>

    <div class="relative flex items-center justify-center mt-[-6rem]"> <!-- Ajustado el margin-top -->
      <img src="../assets/img/DentalSmart.png" alt="Logo" class="w-auto h-auto" />
    </div>

    <div class="flex items-center justify-center m-10"> <!-- Ajustado el margen -->
      <RouterLink
        to="/login"
        class="w-[25rem] h-20 bg-[#004B93] text-white font-bold text-4xl py-2 rounded flex items-center justify-center">
        Iniciar
      </RouterLink>
    </div>
  </header>
</template>
