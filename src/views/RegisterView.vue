<template>
    <Loading v-if="loadingStore.isLoading" class="absolute z-10"/>
  <header class="relative w-full h-237 bg-cover bg-center" :style="{ backgroundImage: `url(${FondoDS})` }">
      <!-- Capa semi-transparente para dar opacidad solo al fondo -->
      <div class="absolute inset-0 bg-black opacity-50"></div>

      <div class="relative flex items-center justify-center min-h-screen">
          <div class="bg-white p-6 rounded shadow-md w-[40rem] h-[39rem]">
              <h2 class="text-4xl font-bold mb-6 text-center">Registro</h2>
              <h1 class="text-6xl font-bold font-serif mb-6 text-center" style="color: #004B93;">DentalSmart</h1>
              <form @submit.prevent="register">
                  <div class="mb-1">
                      <label class="block text-black mb-2" for="name">Nombre Usuario</label>
                      <input type="name" id="name" v-model="name"
                          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                          required placeholder="Ingresa tu nombre de usuario" />
                  </div>
                  <div class="mb-2">
                      <label class="block text-black mb-2" for="email">Correo Electronico</label>
                      <input type="email" id="email" v-model="email"
                          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                          required placeholder="Ingresa tu correo" />
                  </div>
                  <div class="mb-3">
                      <label class="block text-black mb-2" for="password">Contraseña</label>
                      <input type="password" id="password" v-model="password"
                          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                          required placeholder="********" />
                  </div>
                  <div class="mb-4">
                      <label class="block text-black mb-2" for="ConfirmPassword">Confirma Contraseña</label>
                      <input type="password" id="ConfirmPassword" v-model="confirmPassword"
                          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                          required placeholder="********" />
                  </div>

                  <div class="mb-5 flex items-center justify-center">
                      <RouterLink to="/login" class="pl-3 font-black text-[#0381FB]  underline">¿Ya tienes cuenta? Inicia Sesion Aquí</RouterLink>
                  </div>
                  <button type="submit"
                      class="w-full bg-[#004B93] text-white py-3 rounded hover:bg-[#063B6D] transition duration-200"
                      :disabled="loading">
                      <span v-if="loading" class="loader mr-2"></span>
                      {{ loading ? 'Registrando...' : 'Crear Cuenta' }}
                  </button>
              </form>
          </div>
      </div>
  </header>
</template>

<script setup lang="ts">

import { RouterLink } from "vue-router";
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from "sweetalert2";
import FondoDS from "../assets/img/FondoDS.jpg"
import Loading from "@/components/common/Loading.vue";
import { useLoadingStore } from "@/stores/loadingStore";

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const usertype = ref('user')
const error = ref('');
const loading = ref(false);
const router = useRouter();
const loadingStore = useLoadingStore()

const register = async () => {
    // Validación de contraseñas
    if (password.value !== confirmPassword.value) {
        Swal.fire({
            icon: 'error',
            title: 'Las Contraseñas no coinciden',
            text: 'Las contraseñas no coinciden. Por favor, revisa la contraseña'
        });
        // error.value = 'Las contraseñas no coinciden.';
        return;
    }

    loadingStore.startLoading()
    try {
        const response = await axios.post('https://localhost:7004/api/User/register', {
            name: name.value,
            email: email.value,
            usertype: usertype.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        });

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => {
                router.push('/home');
            }, 1500);
        }, 0);
        // console.log('Respuesta de la api:' + response);
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error',
            text: 'No se pudo completar el registro. Inténtalo de nuevo.'
        });
    } finally {
        loadingStore.stopLoading()
    }
};
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #004B93;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
