<template>
    <header class="bg-black relative w-full h-237 bg-cover bg-center opacity-90">
        <div class="flex justify-between items-center p-5">
            <h1 class="text-4xl text-[#AB9385] font-bold mb-1  text-center p-5">Welcome, Admin Dashboard</h1>
            <button class="bg-[#AB9385] text-2xl rounded-xl p-2 m-4sdw">
                <RouterLink @click.prevent="logout" to="" class="px-4 py-2" :style="{ color: '#ffffff' }">Cerrar
                    Sessión
                </RouterLink>
            </button>
        </div>
        <div class="grid grid-cols-5 grid-rows-5 gap-5 w-full max-w-8xl">
            <!-- Tarjeta de Usuarios -->
            <div
                class="col-span-2 row-span-3 bg-white flex items-center justify-center rounded-lg shadow-lg p-10 h-[30rem]">
                <UserCount />
            </div>

            <!-- Tarjeta de Citas -->
            <div
                class="col-span-2 row-span-2 col-start-1 row-start-4 bg-white flex items-center justify-center rounded-lg shadow-lg p-10 h-[17rem]">
                <CitasCount />
            </div>

            <!-- Tarjeta de Citas Pendientes -->
            <div
                class="col-span-3 row-span-5 col-start-3 row-start-1 bg-white flex items-center justify-center rounded-lg shadow-lg p-10 h-[49rem]">
                <Appointment />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import UserCount from '@/components/admin/UserCount.vue';
import CitasCount from '@/components/admin/CitasCount.vue';
import Appointment from '@/components/admin/Appointment.vue';

const logout = async () => {
    try {
        const token = localStorage.getItem('token');

        console.log(token)
        if (!token) {
            router.push('/login');
            return;
        }

        const response = await axios.post('https://localhost:7004/api/User/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response)

        localStorage.removeItem('token');
        router.push('/login');
    } catch (error) {
        console.error('Error al cerrar sesión:', error.response?.data || error.message);
    }
};
</script>