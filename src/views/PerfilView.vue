<template>
    <header class="bg-[#000430] relative w-full h-237 bg-cover bg-center opacity-90">
        <Navbar />
        <div class="flex flex-col items-center justify-center">
            <!-- Perfil del Usuario -->
            <div class="w-full max-w-4xl bg-gray-100 p-8 rounded-lg shadow-lg m-[5rem]">
                <h1 class="text-3xl font-bold mb-4 text-[#000430]">Perfil del Usuario</h1>
                <p class="text-lg text-[#00011A]"><strong>Nombre:</strong> {{ user.name }}</p>
                <p class="text-lg text-[#00011A]"><strong>Correo:</strong> {{ user.email }}</p>
            </div>

            <!-- Lista de Citas -->
            <h2 class="text-3xl font-bold mt-8 mb-4 text-[#004B93]">Citas Realizadas</h2>
            <div class="w-full max-w-4xl space-y-4">
                <div v-for="appointment in user.appointment" :key="appointment.id"
                    class="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
                    <div class="flex flex-col items-start space-y-2">
                        <p class="text-lg"><strong>Fecha:</strong> {{ appointment.date }}</p>
                        <p class="text-lg"><strong>Hora:</strong> {{ appointment.time }}</p>
                    </div>
                    <p class="text-lg mt-4 md:mt-0">
                        <strong>Estado:</strong>
                        <span :class="getStatusColor(appointment.status)">
                            {{ appointment.status }}
                        </span>
                    <p v-if="appointment.status === 'Rechazado'" class="text-sm text-gray-500 italic">
                        {{ getStatusInfo(appointment.status).message }}
                    </p>
                    </p>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const user = ref({
    name: '',
    phone: '',
    email: '',
    appointment: [],
});

const fetchUserAppointments = async (userId: number) => {
    try {
        const response = await axios.get(`https://localhost:7004/api/User/UserAppointments/${userId}`);
        user.value = response.data;
    } catch (error) {
        console.error('Error al obtener citas del usuario:', error);
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Pendiente':
            return 'text-yellow-600';
        case 'Aceptado':
            return 'text-green-600';
        case 'Rechazado':
            return 'text-red-600';
        default:
            return 'text-gray-600';
    }
};

onMounted(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        fetchUserAppointments(Number(userId));
    } else {
        console.error('No se encontró el ID del usuario');
    }
});
</script>
