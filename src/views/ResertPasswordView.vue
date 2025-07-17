<template>
     <header class="relative w-full h-237 bg-cover bg-center" :style="{ backgroundImage: `url(${FondoDS})` }">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative flex items-center justify-center min-h-screen">
            <div class="bg-white p-6 rounded shadow-md w-[40rem] h-[26rem]">
                <h2 class="text-3xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
                <h1 class="text-6xl font-bold font-serif mb-6 text-center" style="color: #004B93;">DentalSmart</h1>
                <form @submit.prevent="submitEmail">
                    <div class="mb-8">
                        <label class="block text-black mb-2" for="email">Correo: <p class="font-black text-[#004B93]">
                                Agregar el correo Vinculado con el Usuario</p></label>
                        <input v-model="email" type="email" id="email"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required placeholder="Correo" />
                    </div>
                    <div class="mb-5 flex items-center justify-center">
                        <RouterLink to="/login" class="pl-3 font-black text-[#0381FB] underline">Atras</RouterLink>
                        <!-- <RouterLink to="/register" class="pl-3 font-black text-[#AB9385] underline">Registarme </RouterLink> -->
                    </div>
                    <button type="submit"
                        class="w-full bg-[#004B93] text-white py-3 rounded hover:bg-[#063B6D] transition duration-200" :disabled="loading">
                        {{ loading ? 'Enviando...' : 'Enviar Correo de Recuperación' }}
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>


<script setup lang="ts">
import FondoDS from "../assets/img/FondoDS.jpg"
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from "sweetalert2";

const email = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const submitEmail = async () => {
    loading.value = true;

    try {
        const response = await axios.post('https://localhost:7004/api/User/forget-password', {
            email: email.value
        });

        // console.log('Respuesta del api' + response)

        setTimeout(() => {
            Swal.fire({
            icon: 'success',
            title: 'Correo enviado correctamente',
            timer: 1500,
            text: 'Correo de recuperación enviado con éxito. Revisa tu bandeja de entrada.',
            showConfirmButton: false
        });

        setTimeout(() => {
            router.push('/login');
        }, 1500);
        }), 0;

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error al enviar el correo',
            text: 'Ocurrió un error al enviar el correo de recuperación. Intente nuevamente.'
        })
    } finally {
        loading.value = false;
    }
};
</script>
