<template>
  <header class="bg-[#000430] relative w-full h-237 bg-cover bg-center">
    <Navbar />
    <div class="text-center py-30 text-white">
      <h1 class="text-4xl font-bold mb-4">Agenda tu Próxima Cita</h1>
      <p class="text-lg">Reserva tu espacio con nosotros y luce una nueva y saludable sonrisa.</p>
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

      <div class="mb-5">
        <label class="block text-black mb-2">Selecciona un Doctor</label>
        <select id="doctor"
        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        v-model="selectedDoctor"
        required>
        <option value="" disabled>Elegir un doctor</option>
        <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
          {{ doctor.name }}
        </option>
        </select>
      </div>

      <button type="submit"
        class="w-full bg-[#004B93] text-white py-3 rounded hover:bg-[#063B6D] transition duration-200">
        Reservar
      </button>
    </form>

    <Footer />
  </header>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

const doctors = ref([]);
const selectedDoctor = ref('');

const name = ref(localStorage.getItem('name') ?? '')
const phone = ref('')
const date = ref('')
const time = ref('')
const status = ref('')

const userName = ref(localStorage.getItem('name') ?? '');
const userId = localStorage.getItem('userId');

const submitForm = async () => {

  const fullDateTime = `${date.value}T${time.value}:00Z`

  try {
    const response = await axios.post('https://localhost:7004/api/Appointment/CreateCita', {
      name: name.value,
      phone: phone.value,
      date: fullDateTime,
      userId: userId,
      doctorId: selectedDoctor.value,
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

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7004/api/User/doctors')
    doctors.value = response.data;
  } catch (error) {
    console.error('Error al cargar doctores:', error);
  }
})
</script>
