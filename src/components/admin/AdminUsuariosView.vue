<!-- src/views/AdminUsuariosView.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar reutilizable -->
    <Sidebar />

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-[#004B93]">Gestión de Usuarios</h2>
      </header>

      <main class="p-6 overflow-y-auto">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-bold mb-4">Usuarios Registrados</h3>
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <input v-model="searchQuery" type="text" placeholder="Buscar por nombre o email"
              class="w-full md:w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />

            <select v-model="selectedRole"
              class="w-full md:w-1/4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
              <option value="">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <table class="min-w-full border border-gray-200 rounded">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-3 border-b text-left">Nombre</th>
                <th class="p-3 border-b text-left">Email</th>
                <th class="p-3 border-b text-left">Rol</th>
                <th class="p-3 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" class="border-b hover:bg-gray-50">
                <td class="p-3">{{ user.name }}</td>
                <td class="p-3">{{ user.email }}</td>
                <td class="p-3 capitalize">
                  {{ user.userType === 'admin' ? 'Administrador' : user.userType === 'user' ? 'Usuario' : 'Doctor' }}
                </td>
                <td class="p-3 space-x-2">
                  <button @click="getUserDetails(user.id)"
                    class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                    Ver
                  </button>
                  <button @click="openEditModal(user)"
                    class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">
                    Editar
                  </button>
                  <button @click="deleteUser(user.id)"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                    Eliminar
                  </button>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="4" class="text-center p-4 text-gray-500">No se encontraron usuarios.</td>
              </tr>
            </tbody>
          </table>
          
          <!-- Modal Ver Usuario -->
          <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-transparent z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
              <button @click="closeModal"
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold">&times;</button>

              <h3 class="text-2xl font-semibold mb-4 text-[#004B93]">Detalles del Usuario</h3>

              <p><strong>Nombre:</strong> {{ userDetails.name }}</p>
              <p><strong>Email:</strong> {{ userDetails.email }}</p>
              <p><strong>Tipo de Usuario:</strong> {{ userDetails.userType }}</p>
              <!-- Agrega más campos si tienes -->

              <button @click="closeModal"
                class="mt-6 bg-[#004B93] text-white px-4 py-2 rounded hover:bg-[#063B6D] transition">Cerrar</button>
            </div>
          </div>

          <!-- Modal Editar Usuario -->
          <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-transparent z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
              <button @click="closeEditModal"
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold">&times;</button>

              <h3 class="text-2xl font-semibold mb-4 text-[#004B93]">Editar Usuario</h3>

              <form @submit.prevent="updateUser" class="space-y-4">
                <div>
                  <label for="name" class="block font-medium text-gray-700 mb-1">Nombre</label>
                  <input v-model="editUser.name" id="name" type="text" required
                    class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />
                </div>

                <div>
                  <label for="email" class="block font-medium text-gray-700 mb-1">Email</label>
                  <input v-model="editUser.email" id="email" type="email" required
                    class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />
                </div>

                <div>
                  <label for="userType" class="block font-medium text-gray-700 mb-1">Tipo de Usuario</label>
                  <select v-model="editUser.userType" id="userType" required
                    class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
                    <option value="" disabled>Seleccione tipo</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                <div class="flex justify-end space-x-2">
                  <button type="button" @click="closeEditModal"
                    class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                  <button type="submit"
                    class="px-4 py-2 bg-[#004B93] text-white rounded hover:bg-[#063B6D] transition">Guardar</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '@/components/admin/Sidebar.vue';

const users = ref([]);
const searchQuery = ref('');
const selectedRole = ref('');

const showEditModal = ref(false);
const editUser = ref({
    id: null,
    name: '',
    email: '',
    userType: '',
});

const closeEditModal = () => {
    showEditModal.value = false;
};

const showModal = ref(false);
const userDetails = ref({});

const closeModal = () => {
    showModal.value = false; // Oculta el modal
};

const getUserDetails = async (userId: number) => {
  try {
        const response = await axios.get(`https://localhost:7004/api/User/User/${userId}`);
        userDetails.value = response.data;

        Swal.fire({
            icon: 'success',
            title: 'Detalles cargados',
            text: 'Información del usuario cargada correctamente.',
            timer: 2400,
        });

        showModal.value = true;
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al cargar la información del usuario.',
            timer: 2400,
        });
    }
};

// FUNCION EDITAR USUARIO: tiene que ser async para usar await
const openEditModal = async (user: any) => {
  // Rellenar editUser con los datos del usuario para el formulario
  editUser.value = {
    id: user.id,
    name: user.name,
    email: user.email,
    userType: user.userType || '',
  };
  showEditModal.value = true;
};

const updateUser = async () => {
  try {
    await axios.put(`https://localhost:7004/api/User/${editUser.value.id}`, {
      name: editUser.value.name,
      email: editUser.value.email,
      userType: editUser.value.userType
    });
    closeEditModal();
    Swal.fire({
      icon: 'success',
      title: 'Actualización Correcta',
      text: 'Usuario actualizado correctamente',
      timer: 2400
    });
    // Actualizar la lista de usuarios
    fetchUsers();
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};

const deleteUser = async (id: number) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire('Error', 'No hay token de autenticación', 'error');
      return;
    }

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
    });

    if (result.isConfirmed) {
      await axios.delete(`https://localhost:7004/api/User/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire({
        icon: 'success',
        title: 'Eliminado!',
        text: 'El usuario ha sido eliminado correctamente.',
        timer: 2400
      });
      // Refrescar la lista
      fetchUsers();
    }
  } catch (error: any) {
    console.error('Error al eliminar usuario:', error);
    Swal.fire('Error', error.response?.data?.title || 'No se pudo eliminar el usuario', 'error');
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://localhost:7004/api/User/all');
    users.value = response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};

onMounted(fetchUsers);

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesRole = selectedRole.value === '' || user.userType === selectedRole.value;

    return matchesSearch && matchesRole;
  });
});
</script>

