<!-- src/views/AdminCitasView.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-[#004B93]">Gestión de Citas</h2>
      </header>

      <main class="p-6 overflow-y-auto">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-bold mb-4">Citas Programadas</h3>
          <table class="w-full table-auto border-collapse">
            <thead>
              <tr class="bg-[#004B93] text-white text-left">
                <th class="p-2">Nombre</th>
                <th class="p-2">Teléfono</th>
                <th class="p-2">Fecha</th>
                <th class="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cita in citas" :key="cita.id" class="border-b">
                <td class="p-2">{{ cita.name }}</td>
                <td class="p-2">{{ cita.phone }}</td>
                <td class="p-2">{{ new Date(cita.date).toLocaleString() }}</td>
                <td class="p-2">{{ cita.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Sidebar from '@/components/admin/Sidebar.vue';

const citas = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7004/api/Appointment/all');
    citas.value = response.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
  }
});
</script>
