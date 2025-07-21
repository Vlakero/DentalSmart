<!-- src/components/admin/Sidebar.vue -->
<template>
  <aside class="w-64 bg-[#000430] text-white flex flex-col py-6 px-4 h-screen">
    <div class="flex items-center gap-3 mb-10">
      <img src="@/assets/img/DentalSmart.png" alt="Logo" class="w-10 h-10" />
      <h1 class="text-xl font-bold text-[#04B0F0]">DentalSmart</h1>
    </div>

    <nav class="flex flex-col gap-4 text-lg">
      <RouterLink to="/admin-dashboard" class="hover:text-[#04B0F0]">Dashboard</RouterLink>
      <RouterLink to="/admin-usuarios" class="hover:text-[#04B0F0]">Usuarios</RouterLink>
      <RouterLink to="/admin-citas" class="hover:text-[#04B0F0]">Citas</RouterLink>
    </nav>
  </aside>
</template>
