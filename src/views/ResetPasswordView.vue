<template>
    <header class="relative w-full h-237 bg-cover bg-center" :style="{ backgroundImage: `url(${FondoDS})` }">
      <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="relative flex items-center justify-center min-h-screen">
            <div class="bg-white p-6 rounded shadow-md w-[40rem] h-[28rem]">
                <h2 class="text-3xl font-bold mb-6 text-center">Cambio de Contraseña</h2>
                <h1 class="text-6xl font-bold font-serif mb-6 text-center" style="color: #004B93;">DentalSmart</h1>
                <form @submit.prevent="resetPassword">
                    <div class="mb-8">
                        <label class="block text-black mb-2" for="password">Nueva Contraseña:</label>
                        <input v-model="password" type="password" id="password"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required placeholder="Nueva Contraseña:" />
                    </div>
                    <div class="mb-8">
                        <label class="block text-black mb-2" for="confirmPassword">Confirmar Nueva Contraseña:</label>
                        <input v-model="confirmPassword" type="password" id="confirmPassword"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required placeholder="Confirmar Nueva Contraseña:" />
                    </div>
                    <button type="submit"
                        class="w-full bg-[#004B93] text-white py-3 rounded hover:bg-[#063B6D] transition duration-200" :disabled="loading">
                        {{ loading ? 'Cambiado contraseña' : "Cambiar contraseña" }}
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import FondoDS from "../assets/img/FondoDS.jpg"
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const password = ref('');
const confirmPassword = ref('');
const route = useRoute();
const router = useRouter();
const loading = ref(false)

const resetPassword = async () => {
    if (password.value !== confirmPassword.value) {
        Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
        return;
    }

    loading.value = true;
    try {
        await axios.post('https://localhost:7004/api/User/reset-password', {
            token: route.params.token,
            newPassword: password.value,
            newConfirmPassword: confirmPassword.value
        });

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Contraseña Cambiada',
                text: 'Tu contraseña ha sido cambiada.',
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => {
                router.push('/login');
            }, 1500)
        }, 0)

    } catch (err) {
        Swal.fire('Error', 'Hubo un problema al cambiar la contraseña.', 'error');
    } finally {
        loading.value = false
    }
};
</script>
