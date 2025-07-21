<!-- src/views/AdminCitasView.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <SidebarDoctor />

    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-[#004B93]">Gestión de Citas</h2>
      </header>

      <main class="p-6 overflow-y-auto">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-bold mb-4">Citas Programadas</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="cita in citas" :key="cita.id" class="bg-white shadow rounded p-4 border border-gray-200">
                <h3 class="text-lg font-bold text-[#004B93]">{{ cita.name }}</h3>
                <P class="text-sm text-gray-600"><strong>Teléfono:</strong> {{ cita.phone }}</P>
                <p class="text-sm text-gray-600"><strong>Fecha:</strong> {{ new Date(cita.date).toLocaleString() }}</p>
                <p class="text-sm font-medium mt-2">
                    <strong>Estado: </strong>
                    <span
                    :class="{
                        'text-yellow-600': cita.status === 'Pendiente',
                        'text-green-600': cita.status === 'Confirmada',
                        'text-red-600': cita.status === 'Cancelada',
                        
                    }"
                    >
                    {{ cita.status }}
                    </span>
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                    <button @click="verCita(cita.id)"
                    class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                        Ver
                    </button>
                    <button @click="editarHorarioCita(cita)"
                    class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm">
                        Editar
                    </button>
                    <button @click="eliminarCita(cita.id)"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                        Eliminar
                    </button>
                    <button @click="cambiarEstado(cita)" 
                    class="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm">
                        Cambiar Estado
                    </button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SidebarDoctor from '@/components/Doctors/SidebarDoctor.vue';
import Swal from 'sweetalert2';

const citas = ref([]);

const verCita = async (id: number) => {
  try {
    const response = await axios.get(`https://localhost:7004/api/Appointment/appointment/${id}`);
    const cita = response.data;

    Swal.fire({
      title: 'Detalles de la Cita',
      html: `
        <p><strong>Nombre:</strong> ${cita.name || 'Paciente eliminado'}</p>
        <p><strong>Teléfono:</strong> ${cita.phone}</p>
        <p><strong>Fecha:</strong> ${new Date(cita.date).toLocaleString()}</p>
        <p><strong>Hora:</strong> ${cita.time}</p>
        <p><strong>Estado:</strong> ${cita.status}</p>
      `,
      confirmButtonText: 'Cerrar',
    });
  } catch (error) {
    console.error('Error al obtener la cita:', error);
    Swal.fire('Error', 'No se pudo cargar la información de la cita', 'error');
  }
};

const eliminarCita = async (id: number) => {
  try {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la cita permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
    });

    if (confirm.isConfirmed) {
      await axios.delete(`https://localhost:7004/api/Appointment/delete/${id}`);
      Swal.fire('Eliminada', 'La cita ha sido eliminada.', 'success');
    }
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    Swal.fire('Error', 'No se pudo eliminar la cita.', 'error');
  }
};

const cambiarEstado = async (cita: any) => {
  const { value : nuevoEstado } = await Swal.fire({
    title: 'Cambiar estado',
    input: 'select',
    inputOptions: {
      Pendiente: 'Pendiente',
      Confirmada: 'Confirmada',
      Cancelada: 'Cancelada'
    },
    inputPlaceholder: 'Selecciona nuevo estado',
    showCancelButton: true
  });

  if (nuevoEstado) {
    try {
      await axios.put(`https://localhost:7004/api/Appointment/updateStatus/${cita.id}`, {
        status: nuevoEstado
      });

      cita.status = nuevoEstado;
      Swal.fire('Éxito', 'El estado fue actualizado', 'success')
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
    }
  }
}

const editarHorarioCita = async (cita: any) => {
  const { value: nuevaFecha } = await Swal.fire({
    title: 'Selecciona nueva fecha',
    input: 'datetime-local',
    inputLabel: 'Fecha y hora',
    inputValue: new Date(cita.date).toISOString().slice(0, 16),
    showCancelButton: true,
    confirmButtonText: 'Actualizar',
  });

  if (nuevaFecha) {
    try {
      const nuevaFechaObj = new Date(nuevaFecha);
      const nuevaHora = nuevaFechaObj.toTimeString().slice(0, 5);

      await axios.put(`https://localhost:7004/api/Appointment/update/${cita.id}`, {
        id: cita.id,
        date: nuevaFechaObj,
        time: nuevaHora,
      });

      Swal.fire('Actualizado', 'La cita fue actualizada correctamente', 'success');

      // Actualiza la cita localmente si quieres evitar recargar
      cita.date = nuevaFechaObj;
      cita.time = nuevaHora;

    } catch (error) {
      console.error('Error al actualizar la cita:', error);
      Swal.fire('Error', 'No se pudo actualizar la cita', 'error');
    }
  }
};

onMounted(async () => {
  const doctorId = localStorage.getItem('userId');
  if (!doctorId) {
    console.warn('No hay doctorId en localStorage');
    return;
  }

  try {
    const response = await axios.get(`https://localhost:7004/api/Appointment/doctor/${doctorId}/citas`);
    citas.value = response.data;
  } catch (error) {
    console.error('Error al obtener citas del doctor:', error);
  }
});
</script>
