<template>
  <header class="bg-black relative w-full h-237 bg-cover bg-center opacity-90">
    <Navbar />
    <div class="text-center py-30 text-white">
      <h1 class="text-4xl font-bold mb-4">Agenda tu Cita</h1>
      <p class="text-lg">Reserva tu espacio con nosotros y luce impecable.</p>
    </div>

    <form @submit.prevent="submitForm" class="max-w-lg mx-auto px-10 bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-5">
        <label class="block text-black mb-2" for="name">Nombre</label>
        <input type="name" id="name"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required
          placeholder="name" 
          v-model="userName" readonly/>
      </div>

      <div class="mb-5">
        <label class="block text-black mb-2" for="phone">Telefono</label>
        <input type="tel" id="phone"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required
          placeholder="Telefono" 
          v-model="phone"/>
      </div>

      <div class="mb-5">
        <label class="block text-black mb-2" for="date">Dia</label>
        <input type="date" id="date"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required
          placeholder="Dia"
          min=""
          onfocus="this.min = new Date().toISOString().split('T')[0]"
         v-model="date">
      </div>

      <div class="mb-5">
        <label class="block text-black mb-2" for="time">Hora</label>
        <input type="time" id="time"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required
          placeholder="time" 
           v-model="time"/>
      </div>

      <button type="submit"
        class="w-full bg-[#AB9385] text-white py-3 rounded hover:bg-[#85736a] transition duration-200">
        Reservar
      </button>
    </form>

    <Footer />
  </header>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';



const name = ref(localStorage.getItem('name') ?? '')
const phone = ref('')
const date = ref('')
const time = ref('')
const status = ref('')

const userName = ref(localStorage.getItem('name') ?? '');
const userId = localStorage.getItem('userId');

const submitForm = async () => {

  try {
    const response = await axios.post('https://localhost:7004/api/Appointment/CreateCita', {
      name: name.value,
      phone: phone.value,
      date: date.value,
      time: time.value,
      userId: userId,
      status: "Pendiente"
    });

    console.log(response.data.message);

    Swal.fire({
      icon: 'success',
      title: 'Cita agendada correctamente',
      timer: 1500,
      showConfirmButton: false
    });
    name.value = ''
    phone.value = ''
    date.value = ''
    time.value = '' 

  } catch (error) {
    console.log("Error al agendar la cita:", error);
    if (error.response){
      console.log("Detalles del error:", error.response.data);
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al agendar la cita. Por favor, inténtalo de nuevo.'
    });
  }
}
</script>
