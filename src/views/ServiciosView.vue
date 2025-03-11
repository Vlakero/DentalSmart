<template>
    <header class="bg-black relative w-full h-237 bg-cover bg-center opacity-90">
        <Navbar/>

        <div class="bg-black text-white py-14 text-center">
            <h1 class="text-4xl font-bold m-6">Servicios</h1>
            <p class="mt-4 text-lg">Conoce más sobre Nuestros Servicios que brindamos en el Barbershop</p>
        </div>

        <div class="flex flex-wrap justify-center gap-8 mt-12">
            <!-- Servicio 1 -->
            <div class="bg-white text-black p-8 rounded-lg shadow-lg w-[28rem] h-[28rem] hover:scale-105 transition">
                <img :src="CortePelo" alt="Corte de Cabello" class="w-full h-[20rem] object-cover rounded-lg mb-4">
                <h2 class="text-2xl font-bold mb-4">Corte de Cabello</h2>
                <p class="text-sm">Cortes modernos y clásicos adaptados a tu estilo personal.</p>
            </div>

            <!-- Servicio 2 -->
            <div class="bg-white text-black p-8 rounded-lg shadow-lg w-[28rem] h-[28rem] hover:scale-105 transition">
                <img :src="CorteBarba" alt="Corte de Barbar" class="w-full h-[20rem] object-cover rounded-lg mb-4">
                <h2 class="text-2xl font-bold mb-4">Afeitado</h2>
                <p class="text-sm">Afeitado profesional con toalla caliente y productos premium.</p>
            </div>

            <!-- Servicio 3 -->
            <!-- <div class="bg-white text-black p-8 rounded-lg shadow-lg w-[28rem] h-[28rem] hover:scale-105 transition">
                <h2 class="text-2xl font-bold mb-4">Barba y Bigote</h2>
                <p class="text-sm">Diseño y arreglo de barba con las últimas técnicas.</p>
            </div> -->
        </div>

        <Footer/>
    </header>
</template>

<script setup lang="ts">
import CortePelo from '@/assets/img/Corte-pelo.jpg';
import CorteBarba from '@/assets/img/Corte-barba.jpg';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>