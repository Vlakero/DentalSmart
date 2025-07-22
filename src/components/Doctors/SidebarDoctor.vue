<template>
  <aside class="w-64 bg-[#000430] text-white flex flex-col py-6 px-4 h-screen">
    <div class="flex items-center gap-3 mb-10">
      <img src="@/assets/img/DentalSmart.png" alt="Logo" class="w-10 h-10" />
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
</template>

<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
// import UserCount from '@/components/admin/AdminUsuariosView.vue';
// import CitasCount from '@/components/admin/CitasCount.vue';
// import Appointment from '@/components/admin/AdminCitasView.vue';

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem('token');
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error.response?.data || error.message);
  }
};
</script>