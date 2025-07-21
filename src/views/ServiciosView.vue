<template>
    <header class="bg-[#000430] relative w-full h-full bg-cover bg-center opacity-90">
        <Navbar/>

        <div class="bg-[#000430] text-white py-14 text-center">
            <h1 class="text-4xl font-bold m-6">Servicios</h1>
            <p class="mt-4 text-lg">Conoce más sobre Nuestros Servicios que brindamos en el Barbershop</p>
        </div>

        <div class="flex flex-wrap justify-center gap-8 mt-12">
            <!-- Servicio 1 -->
            <div class="bg-white text-[#00011A] p-8 rounded-lg shadow-lg w-[20rem] h-[20rem] hover:scale-105 transition">
                <img :src="LimpiezaDS" alt="Limpieza dental" class="w-full h-[10rem] object-cover rounded-lg mb-4">
                <h2 class="text-2xl font-bold mb-4">Limpieza dental</h2>
                <p class="text-sm text-[#00011A]">Mantén tu sonrisa saludable eliminando placa y sarro.</p>
            </div>

            <!-- Servicio 2 -->
            <div class="bg-white text-[#00011A] p-8 rounded-lg shadow-lg w-[20rem] h-[20rem] hover:scale-105 transition">
                <img :src="EmpasteDS" alt="Empastes dental" class="w-full h-[10rem] object-cover rounded-lg mb-4 text-[#00011A]">
                <h2 class="text-2xl font-bold mb-4">Empastes dental</h2>
                <p class="text-sm text-[#00011A]">Reparar tus dientes con caries o daños.</p>
            </div>

            <!-- Servicio 3 -->
            <div class="bg-white text-[#00011A] p-8 rounded-lg shadow-lg w-[20rem] h-[20rem] hover:scale-105 transition">
                <img :src="ExamenDS" alt="Exámen dental" class="w-full h-[10rem] object-cover rounded-lg mb-4 text-[#00011A]">
                <h2 class="text-2xl font-bold mb-4">Exámen dental</h2>
                <p class="text-sm text-[#00011A]">Detecta problemas a tiempo para mantener tu salud bucal.</p>
            </div>
        </div>

        <!-- Sección de doctores -->
         <section class="mt-20 px-10">
            <h2 class="text-3xl font-bold text-center mb-10 text-white">Conoce a nuestros doctores</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div
                v-for="doctor in doctors"
                :key="doctor.id"
                class="perspective"
                >
                <div class="relative w-full h-50 transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180">
                    <!-- Front -->
                    <div class="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md p-6 text-center">
                    <img :src="doctor.image" alt="Doctor" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
                    <h3 class="text-xl font-semibold text-[#004B93] mb-1">{{ doctor.name }}</h3>
                    <p class="text-gray-600">{{ doctor.specialty }}</p>
                    </div>
                    <!-- Back -->
                    <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-[#004B93] text-white rounded-lg shadow-md p-6 text-center flex flex-col justify-center items-center">
                    <h3 class="text-xl font-bold mb-2">{{ doctor.name }}</h3>
                    <p class="text-sm">{{ doctor.description }}</p>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <Footer/>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ExamenDS from '@/assets/img/ExamenDS.jpg';
import LimpiezaDS from '@/assets/img/LimpiezaDS.jpg';
import EmpasteDS from '@/assets/img/Ejemplo2DS.jpg';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const doctors = ref([
  {
    id: 1,
    name: 'Dra. Ana López',
    specialty: 'Ortodoncia',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    description: 'Especialista en ortodoncia con más de 10 años de experiencia.'
  },
  {
    id: 2,
    name: 'Dr. Carlos Pérez',
    specialty: 'Cirugía Dental',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    description: 'Experto en cirugía bucal y maxilofacial. Atención personalizada.'
  },
  {
    id: 3,
    name: 'Dra. Mariana Torres',
    specialty: 'Odontopediatría',
    image: 'https://randomuser.me/api/portraits/women/47.jpg',
    description: 'Dedicada al cuidado dental infantil. Trato amable y profesional.'
  }
])

</script>
<style scoped>
.perspective {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>

