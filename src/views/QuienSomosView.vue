<template>
    <header class="bg-black relative w-full h-237 bg-cover bg-center opacity-90">
        <Navbar/>
        <div class="bg-black text-white py-16 text-center">
            <h1 class="text-4xl font-bold m-6">Quiénes Somos</h1>
            <p class="mt-4 text-lg">Conoce más sobre nuestra historia y ubicación.</p>
        </div>

        <section class="container mx-auto px-6 py-[3rem]">
            <div class="grid md:grid-cols-2 gap-10">
                <!-- Descripción de la empresa -->
                <div>
                    <h2 class="text-3xl font-semibold text-white">Nuestra Historia</h2>
                    <p class="mt-4 text-white">
                        Somos una empresa dedicada a brindar soluciones innovadoras en marketing digital. 
                        Nuestro compromiso es ayudar a pequeñas empresas a mejorar su presencia en línea.
                    </p>
                    <h2 class="mt-6 text-3xl font-semibold text-white">Nuestra Misión</h2>
                    <p class="mt-4 text-white">
                        Brindar estrategias efectivas para que las empresas alcancen sus objetivos 
                        y crezcan en el entorno digital.
                    </p>
                </div>

                <!-- Mapa con ubicación fija -->
                <div>
                    <h2 class="text-3xl font-semibold text-white">Nuestra Ubicación</h2>
                    <div class="mt-4">
                        <iframe 
                            class="w-full h-64 md:h-80 rounded-lg shadow-lg"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.839709994739!2d-99.13320938509317!3d19.4326076868869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92dd3d3b9a5%3A0xb2c9e2a84e3d392b!2sPalacio%20de%20Bellas%20Artes!5e0!3m2!1ses!2smx!4v1634801790281!5m2!1ses!2smx"
                            allowfullscreen="" 
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
        
        <Footer/>
    </header>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>