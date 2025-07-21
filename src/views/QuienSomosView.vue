<template>
    <header class="bg-[#000430] relative w-full h-237 bg-cover bg-center opacity-90">
        <Navbar/>
        <div class="bg-[#000430] text-white py-16 text-center">
            <h1 class="text-4xl font-bold m-6">Quiénes Somos</h1>
            <p class="mt-4 text-lg">Conoce más sobre nuestra historia y ubicación.</p>
        </div>

        <section class="container mx-auto px-6 py-[3rem]">
            <div class="grid md:grid-cols-2 gap-10">
                <!-- Descripción de la empresa -->
                <div>
                    <h2 class="text-3xl font-semibold text-white">Nuestra Historia</h2>
                    <p class="mt-4 text-white">
                        Nuestra clínica dental nació en el año 2015 con el firme propósito de ofrecer atención odontológica de calidad en Cancún. Iniciamos como un pequeño consultorio familiar, motivados por la pasión de brindar sonrisas saludables a nuestra comunidad. A lo largo de los años, hemos crecido y
                        nos hemos consolidado como un centro integral, incorporando tecnología de vanguardia y un equipo de especialistas comprometidos con el bienestar de cada paciente.
                    </p>
                    <h2 class="mt-6 text-3xl font-semibold text-white">Nuestra Misión</h2>
                    <p class="mt-4 text-white">
                        Proporcionar atención odontológica integral, ética y de alta calidad, enfocada en la prevención, diagnóstico y tratamiento 
                        personalizado, para mejorar la salud bucal 
                        y la calidad de vida de nuestros pacientes en un ambiente cálido, seguro y profesional.
                    </p>
                </div>

                <!-- Mapa con ubicación fija -->
                <div>
                    <h2 class="text-3xl font-semibold text-white">Nuestra Ubicación</h2>
                    <div class="mt-4">
                        <iframe
                            class="w-full h-64 md:h-80 rounded-lg shadow-lg"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.402203777879!2d-86.84713128558097!3d21.145705089630302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2c48e11b85f7%3A0x93e24190d0f370db!2sTierra%20Maya%2C%20775%2016%20Canc%C3%BAn%2C%20Q.R.!5e0!3m2!1ses!2smx!4v1721413540046!5m2!1ses!2smx"
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
