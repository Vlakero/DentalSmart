<template>
    <header class="bg-[#000430] relative w-full h-237 bg-cover bg-center">
        <Navbar />
        <div class="flex items-center justify-center gap-16 max-w-9xl mx-[12rem]">
            <!-- Contenedor de la imagen con el bloque detrás -->
            <div class="relative flex items-center h-[58.5rem]">
                <div class="h-[60rem] w-[16rem] bg-[#000430] absolute right-28"></div>
                <img src="@/assets/img/EjemploDS.jpg" alt="EjemploDS"
                    class="relative w-[35rem] h-auto z-10 shadow-lg" />
            </div>

            <!-- Contenedor del texto -->
            <div class="w-1/2 text-white">
                <h2 class="text-2xl font-bold uppercase">
                  DentalSmart Sonrisas perfectas, gestión perfecta.
                </h2>
                <p class="mt-4 text-lg">
                    <span class="font-bold">¿Por qué nosotros? </span> 
                    DentalSmart surge como una solución innovadora para abordar estas dificultades mediante herramientas
                    tecnológicas que beneficien tanto a los pacientes como a los profesionales dentales.
                </p>

                <div class="flex items-center justify-center m-5">
                    <RouterLink to="/citas">
                        <button class="bg-[#004B93] w-[15rem] h-10 rounded-lg hover:bg-[#063B6D]"> Reservar</button>
                    </RouterLink>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Navbar from '@/components/Navbar.vue'
</script>
