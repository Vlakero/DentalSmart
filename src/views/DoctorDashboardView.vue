<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#000430] text-white flex flex-col py-6 px-4">
      <div class="flex items-center gap-3 mb-10">
        <img src="../assets/img/DentalSmart.png" alt="Logo" class="w-10 h-10" />
        <h1 class="text-xl font-bold text-[#04B0F0]">DentalSmart</h1>
      </div>

      <nav class="flex flex-col gap-4 text-lg">
        <RouterLink to="/doctor-dashboard" class="hover:text-[#04B0F0]">Dashboard</RouterLink>
        <RouterLink to="/doctor-citas" class="hover:text-[#04B0F0]">Citas</RouterLink>
      </nav>

      <div class="mt-auto">
        <button
          @click="logout"
          class="w-full text-left bg-[#004B93] hover:bg-[#063B6D] text-white px-4 py-2 rounded mt-10"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>

    <!-- Contenido -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-[#004B93]">Panel de Doctor</h2>
        <p class="text-gray-600">Bienvenido, Dr. {{ name }}</p>
      </header>

      <main class="p-6">
        <p class="mt-4 text-lg text-gray-900 font-semibold">
        📅 Actualmente tienes <span class="text-blue-600">{{ totalAppointments }}</span> citas <span class="italic">pendientes</span>.
      </p>


      <div class="mt-6 grid grid-cols-3 gap-6">
          <div class="bg-white p-4 rounded shadow text-center">
            <h3 class="text-gray-700 font-semibold mb-1">Pendientes</h3>
            <p class="text-blue-600 text-2xl font-bold">{{ pendingCount }}</p>
          </div>
          <div class="bg-white p-4 rounded shadow text-center">
            <h3 class="text-gray-700 font-semibold mb-1">Confirmadas</h3>
            <p class="text-green-600 text-2xl font-bold">{{ confirmedCount }}</p>
          </div>
          <div class="bg-white p-4 rounded shadow text-center">
            <h3 class="text-gray-700 font-semibold mb-1">Canceladas</h3>
            <p class="text-red-600 text-2xl font-bold">{{ canceledCount }}</p>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from 'axios';

const name = localStorage.getItem('name');
const totalAppointments = ref(0);
const pendingCount = ref(0);
const confirmedCount = ref(0);
const canceledCount = ref(0);
const doctorId = localStorage.getItem('userId');

const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    await axios.post(
      'https://localhost:7004/api/User/logout',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    localStorage.removeItem('token');
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error.response?.data || error.message);
  }
};

// Función para obtener la cantidad de citas del doctor
const fetchDoctorAppointments = async () => {
  if (!doctorId) {
    console.error('No se encontró doctorId');
    return;
  }
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `https://localhost:7004/api/Appointment/count-by-doctor?doctorId=${doctorId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Asignar cada contador según la respuesta del backend
    pendingCount.value = response.data.pending;
    confirmedCount.value = response.data.confirmed;
    canceledCount.value = response.data.canceled;

    // Opcional: sumar total para mostrar en otra parte
    totalAppointments.value = pendingCount.value + confirmedCount.value + canceledCount.value;

  } catch (error) {
    console.error('Error al obtener citas del doctor:', error);
  }
};

onMounted(() => {
  fetchDoctorAppointments();
});
</script>
