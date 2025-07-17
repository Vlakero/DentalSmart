<template>
  <header class="relative w-full h-237 bg-cover bg-center" :style="{ backgroundImage: `url(${FondoDS})` }">
      <!-- Capa semi-transparente para aplicar opacidad solo al fondo -->
      <!-- Se agregó esta capa para dar opacidad solo al fondo, sin afectar el contenido -->
      <div class="absolute inset-0 bg-black opacity-50"></div>

      <!-- Se agregó 'relative' para que el contenido quede por encima de la capa de opacidad -->
      <div class="relative flex items-center justify-center min-h-screen">
          <div class="bg-white p-8 rounded shadow-md w-[40rem] h-[32rem]">
              <h2 class="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>
              <h1 class="text-6xl font-bold font-serif mb-6 text-center" style="color: #004B93;">DentalSmart</h1>

              <form @submit.prevent="login">
                  <div class="mb-8">
                      <label class="block text-black mb-2" for="name">Usuario</label>
                      <input v-model="name" type="name" id="name"
                          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                          required placeholder="Usuario" />
                  </div>
                  <div class="mb-10">
                      <label class="block text-black mb-2" for="password">Contraseña</label>
                      <input v-model="password" type="password" id="password"
                          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                          required placeholder="Contraseña" />
                  </div>

                  <div class="mb-5 flex items-center justify-center">
                      <RouterLink to="/resertpassword" class="pl-3 font-black text-[#004B93] underline">¿Olvidé la
                          Contraseña?</RouterLink>
                      <RouterLink to="/register" class="pl-3 font-black text-[#0381FB] underline">Registrarme
                      </RouterLink>
                  </div>

                  <button type="submit"
                      class="w-full bg-[#004B93] text-white py-3 rounded hover:bg-[#063B6D] transition duration-200"
                      :disabled="loading">
                      {{ loading ? 'Cargando...' : 'Iniciar Sesión' }}
                  </button>
              </form>
          </div>
      </div>
  </header>
</template>


<script setup lang="ts">
import FondoDS from "../assets/img/FondoDS.jpg"
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import axios from 'axios';
import Swal from "sweetalert2";

const name = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const login = async () => {

    loading.value = true;

    try {
        const response = await axios.post('https://localhost:7004/api/User/login', {
            name: name.value,
            password: password.value
        });

        const { token, usertype, name: userName, userId } = response.data;

        if (!token || !usertype || !userId) {
            throw new Error("Datos incompletos del servidor")
        }

        localStorage.setItem('token', token);
        localStorage.setItem('usertype', usertype.trim().toLowerCase());
        localStorage.setItem('name', userName);
        localStorage.setItem('userId', userId.toString());

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitosa',
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => {
                if (usertype === 'admin') {
                    router.push('/admin-dashboard');
                } else if (usertype === 'user') {
                    router.push('/home');
                }
            }, 1500);
        }, 0);

    } catch (err) {
        console.error('Error', err);
        Swal.fire({
            icon: 'error',
            title: "Credenciales Incorrectas",
            text: "El nombre del Usuario o Contraseña es incorrecto. Por favor, inténtalo de nuevo."
        })
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
