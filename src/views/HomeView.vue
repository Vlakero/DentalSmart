<template>
    <header class="bg-black relative w-full h-237 bg-cover bg-center opacity-90">
        <Navbar />
        <div class="flex items-center justify-center gap-16 max-w-9xl mx-[12rem]">
            <!-- Contenedor de la imagen con el bloque detrás -->
            <div class="relative flex items-center h-[58.5rem]">
                <div class="h-[60rem] w-[16rem] bg-[#AB9385] absolute right-28"></div>
                <img src="@/assets/img/img-1.jpg" alt="Imagen1"
                    class="relative w-[35rem] h-auto z-10 shadow-lg" />
            </div>

            <!-- Contenedor del texto -->
            <div class="w-1/2 text-white">
                <h2 class="text-2xl font-bold uppercase">
                    Aplicación web para reservas de citas en peluquerías
                </h2>
                <p class="mt-4 text-lg">
                    <span class="font-bold">Justificación:</span> Muchas personas buscan agendar citas en
                    peluquerías de manera rápida y sin necesidad de llamadas telefónicas.
                    Este proyecto permitirá a los clientes reservar, modificar o cancelar citas en línea de manera fácil
                    y eficiente.
                </p>
                
                <div class="flex items-center justify-center m-5">
                    <RouterLink to="/citas">
                        <button class="bg-[#AB9385] w-[15rem] h-10 rounded-lg"> Reservar</button>
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
