<template>
    <div v-if="loading" class="text-2xl text-[#004B93]">Cargando Usuario....</div>

    <div v-else class="w-full max-w-7xl overflow-x-auto">
        <h2 class="text-4xl text-center font-semibold m-1 p-1 text-[00011A]">Usuarios</h2>
        <table class="w-full table-auto border-collapse border border-[#004B93]">
            <thead>
                <tr class="bg-white text-[#004B93]">
                    <th class="border border-black px-4 py-2">ID</th>
                    <th class="border border-black px-4 py-2">Nombre</th>
                    <th class="border border-black px-4 py-2">Correo</th>
                    <th class="border border-black px-4 py-2">UserType</th>
                    <th class="border border-black px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-400">
                    <td class="border border-black px-2 py-1 text-center">{{ user.id }}</td>
                    <td class="border border-black px-2 py-1 text-center">{{ user.name }}</td>
                    <td class="border border-black px-2 py-1 text-center">{{ user.email }}</td>
                    <td class="border border-black px-2 py-1 text-center">{{ user.userType }}</td>
                    <td class="border border-black px-2 py-1 text-center">
                        <button class="bg-green-500 p-2 m-2 rounded-lg text-white" @click="getUserDetails(user.id)">
                            <img src="../../assets/img/ver-detalles.png" alt="Ver" class="w-6 h-6">
                        </button>
                        <button class="bg-blue-500 p-2 m-2 rounded-lg text-white" @click="openEditModal(user)">
                            <img src="../../assets/img/lapiz.png" alt="Editar" class="w-6 h-6">
                        </button>
                        <button @click="deleteUser(user.id)" class="bg-red-500 p-2 m-2 rounded-lg text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                                viewBox="0 0 50 50">
                                <path
                                    d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z">
                                </path>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="showEditModal"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">Editar Perfil</h2>

            <label class="block mb-2">Nombre</label>
            <input v-model="editUser.name" type="text" class="w-full p-2 border rounded-lg mb-4">

            <label class="block mb-2">Correo</label>
            <input v-model="editUser.email" type="email" class="w-full p-2 border rounded-lg mb-4">

            <label class="block mb-2">Tipo de Usuario</label>
            <select v-model="editUser.userType" class="w-full p-2 border rounded-lg mb-4">
                <option value="admin">admin</option>
                <option value="user">user</option>
            </select>

            <div class="flex justify-end space-x-2">
                <button @click="updateUser" class="bg-green-500 text-white p-2 rounded-lg">Guardar</button>
                <button @click="closeEditModal" class="bg-red-500 text-white p-2 rounded-lg">Cancelar</button>
            </div>
        </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-5 rounded-lg w-1/3">
            <h2 class="text-xl font-bold">Detalles del Usuario</h2>
            <div class="my-4">
                <p><strong>Nombre:</strong> {{ userDetails.name }}</p>
                <p><strong>Email:</strong> {{ userDetails.email }}</p>
                <p><strong>Tipo de Usuario:</strong> {{ userDetails.userType }}</p>
            </div>
            <button @click="closeModal" class="bg-red-500 p-2 rounded-lg text-white">Cerrar</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const users = ref([]);
const loading = ref(true);

const showEditModal = ref(false);
const editUser = ref({
    id: null,
    name: '',
    email: '',
    userType: '',
});

const openEditModal = (user: any) => {
    editUser.value = {
        id: user.id || '',
        name: user.name || '',
        email: user.email || '',
        userType: user.userType || ''
    };
    showEditModal.value = true;
};

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
        userDetails.value = response.data; // Guardar datos en la variable reactiva

        console.log('Detalles del usuario:', userDetails.value);

        // Mostrar un mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Detalles cargados',
            text: 'Información del usuario cargada correctamente.',
            timer: 2400,
        });

        // Abrir el modal
        showModal.value = true;
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);

        // Mostrar mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al cargar la información del usuario.',
            timer: 2400,
        });
    }
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
            title: 'Actualizacion Correctamente',
            text: 'Usuario actualizado correctamente',
            timer: 2400
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
};

const fetchUsers = async () => {
    try {
        const response = await axios.get('https://localhost:7004/api/User/all');
        users.value = response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    } finally {
        loading.value = false;
    }
};

const deleteUser = async (id: number) => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token enviado:', token);

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
            // Llamada a la API para eliminar al usuario
            await axios.delete(`https://localhost:7004/api/User/${id}`);
            Swal.fire({
                icon: 'success',
                title: 'Eliminado!',
                text: 'El usuario ha sido eliminado correctamente.',
                timer: 2400
            });

            // Refrescar la lista de usuarios
            fetchUsers();
        }
    } catch (error: any) {
        console.error('Error al eliminar usuario:', error);
        Swal.fire('Error', error.response?.data?.title || 'No se pudo eliminar el usuario', 'error');
    }
};

onMounted(fetchUsers);
</script>
