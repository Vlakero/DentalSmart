<template>
    <header class="bg-[#000430] relative w-full h-237 bg-cover bg-center opacity-90">
        <Navbar/>

        <div class="bg-[#000430] text-white py-14 text-center">
            <h1 class="text-4xl font-bold m-6">Servicios</h1>
            <p class="mt-4 text-lg">Conoce más sobre Nuestros Servicios que brindamos en el Barbershop</p>
        </div>

        <div class="flex flex-wrap justify-center gap-8 mt-12">
            <!-- Servicio 1 -->
            <div class="bg-white text-[#00011A] p-8 rounded-lg shadow-lg w-[28rem] h-[28rem] hover:scale-105 transition">
                <img :src="LimpiezaDS" alt="Limpieza dental" class="w-full h-[20rem] object-cover rounded-lg mb-4">
                <h2 class="text-2xl font-bold mb-4">Limpieza dental</h2>
                <p class="text-sm text-[#00011A]">Mantén tu sonrisa saludable eliminando placa y sarro.</p>
            </div>

            <!-- Servicio 2 -->
            <div class="bg-white text-[#00011A] p-8 rounded-lg shadow-lg w-[28rem] h-[28rem] hover:scale-105 transition">
                <img :src="EmpasteDS" alt="Empastes dental" class="w-full h-[20rem] object-cover rounded-lg mb-4 text-[#00011A]">
                <h2 class="text-2xl font-bold mb-4">Empastes dental</h2>
                <p class="text-sm text-[#00011A]">Reparar tus dientes con caries o daños.</p>
            </div>

            <!-- Servicio 3 -->
            <div class="bg-white text-[#00011A] p-8 rounded-lg shadow-lg w-[28rem] h-[28rem] hover:scale-105 transition">
                <img :src="ExamenDS" alt="Exámen dental" class="w-full h-[20rem] object-cover rounded-lg mb-4 text-[#00011A]">
                <h2 class="text-2xl font-bold mb-4">Exámen dental</h2>
                <p class="text-sm text-[#00011A]">Detecta problemas a tiempo para mantener tu salud bucal.</p>
            </div>
        </div>

        <Footer/>
    </header>
</template>

<script setup lang="ts">
import ExamenDS from '@/assets/img/ExamenDS.jpg';
import LimpiezaDS from '@/assets/img/LimpiezaDS.jpg';
import EmpasteDS from '@/assets/img/Ejemplo2DS.jpg';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>
