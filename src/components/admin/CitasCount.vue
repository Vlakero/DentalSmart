<template>
  <div class="m-10">
    <!-- Título -->
    <div class="flex items-center gap-3 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#004B93]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 15h14M5 19h14" />
      </svg>
      <h1 class="text-3xl font-bold text-[#004B93]">Resumen de Citas</h1>
    </div>

    <!-- Tarjeta con total -->
    <div class="bg-white shadow rounded-lg p-6 mb-6 flex justify-between items-center">
      <div>
        <h2 class="text-lg text-gray-600">Total de Citas</h2>
        <p class="text-4xl font-bold text-[#004B93]">{{ totalAppointments }}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-[#004B93]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5V9a3 3 0 00-3-3H7a3 3 0 00-3 3v11h5" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 16v4h6v-4" />
      </svg>
    </div>

    <!-- Gráfica -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Citas por día (última semana)</h2>
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';

// Registrar los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Total de citas
const totalAppointments = ref(0);

// Datos de la gráfica (inicialmente vacíos)
const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Citas',
    backgroundColor: '#04B0F0',
    data: [],
  }],
});

// Opciones de la gráfica
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
  },
};

// Obtener total de citas
const fetchAppointmentCount = async () => {
  try {
    const response = await axios.get('https://localhost:7004/api/Appointment/count');
    totalAppointments.value = response.data.totalAppointments;
  } catch (error) {
    console.error('Error al obtener el total de citas:', error);
  }
};

// Obtener citas por día y actualizar la gráfica
const fetchAppointmentsByDay = async () => {
  try {
    const response = await axios.get('https://localhost:7004/api/Appointment/byday');
    const dias = response.data;

    chartData.value = {
      labels: dias.map(d => d.fecha), // usamos 'fecha' en lugar de 'dia'
      datasets: [{
        label: 'Citas por fecha',
        backgroundColor: '#04B0F0',
        data: dias.map(d => d.total),
      }],
    };

  } catch (error) {
    console.error('Error al obtener citas por día:', error);
  }
};

// Ejecutar funciones al montar el componente
onMounted(() => {
  fetchAppointmentCount();
  fetchAppointmentsByDay();
});
</script>
