<template>
    <div class="flex flex-col items-center justify-center m-10">
      <h1 class="text-4xl font-bold mb-8">Gestión de Citas</h1>
  
      <!-- Lista de Citas -->
      <div class="w-full max-w-7xl">
        <div v-for="appointment in appointments" :key="appointment.id" class="bg-gray-50 p-4 mb-4 rounded-lg shadow-lg">
          <div class="flex flex-col">
            <p class="text-lg text-gray-600">Cliente: {{ appointment.name }}</p>
            <p class="text-lg text-gray-600">Fecha: {{ appointment.date }}</p>
            <p class="text-lg text-gray-600">Hora: {{ appointment.time }}</p>
            <p class="text-lg text-gray-600">Estado: 
              <span :class="getStatusColor(appointment.confirmedStatus)">
                {{ appointment.confirmedStatus }}
              </span>
            </p>
  
            <!-- Selector de Estado -->
            <div class="mt-4">
              <select 
                v-model="appointment.status" 
                class="p-2 border border-gray-500 rounded-md"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Aceptado">Aceptado</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>
  
            <!-- Botón para confirmar el cambio de estado -->
            <button
              @click="updateStatus(appointment)"
              class="mt-2 bg-[#AB9385] text-white p-2 rounded-md disabled:bg-gray-400"
              :disabled="appointment.confirmedStatus === 'Aceptado' || appointment.confirmedStatus === 'Rechazado'"
            >
              Confirmar Estado
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  const appointments = ref([]);
  
  const updateStatus = async (appointment) => {
    try {
      await axios.put(`https://localhost:7004/api/Appointment/updateStatus/${appointment.id}`, {
        status: appointment.status,
      });
  
      appointment.confirmedStatus = appointment.status; // Actualiza el estado confirmado
  
      Swal.fire({
        icon: 'success',
        title: 'Estado actualizado',
        text: 'El estado de la cita ha sido actualizado correctamente',
        timer: 2000,
        showConfirmButton: false,
      });
  
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el estado',
      });
    }
  };
  
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('https://localhost:7004/api/Appointment/All');
      appointments.value = response.data.map((appointment) => ({
        ...appointment,
        confirmedStatus: appointment.status, // Mantiene el estado inicial confirmado
      }));
    } catch (error) {
      console.error('Error al cargar citas:', error);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente': return 'text-yellow-600';
      case 'Aceptado': return 'text-green-600';
      case 'Rechazado': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  onMounted(() => {
    fetchAppointments();
  });
  </script>
  