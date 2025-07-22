<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#000430] text-white flex flex-col py-6 px-4">
      <!-- Logo -->
      <div class="flex items-center gap-3 mb-10">
        <img src="../assets/img/DentalSmart.png" alt="Logo" class="w-10 h-10" />
        <h1 class="text-xl font-bold text-[#04B0F0]">DentalSmart</h1>
      </div>

      <!-- Navegación -->
      <nav class="flex flex-col gap-4 text-lg">
        <RouterLink to="/admin-dashboard" class="hover:text-[#04B0F0]">Dashboard</RouterLink>
        <RouterLink to="/admin-usuarios" class="hover:text-[#04B0F0]">Usuarios</RouterLink>
        <RouterLink to="/admin-citas" class="hover:text-[#04B0F0]">Citas</RouterLink>
      </nav>

      <!-- Botón Cerrar Sesión -->
      <div class="mt-auto">
        <button
          @click="logout"
          class="w-full text-left bg-[#004B93] hover:bg-[#063B6D] text-white px-4 py-2 rounded mt-10"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>

    <!-- Contenido Principal -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-[#004B93]">Panel de Administración</h2>
        <p class="text-gray-600">Bienvenido, Administrador {{ name }}</p>
      </header>

      <!-- Módulo de resumen: Citas -->
      <main class="p-6">
        <CitasCount />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import CitasCount from '@/components/admin/CitasCount.vue';

const name = localStorage.getItem('name');

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
