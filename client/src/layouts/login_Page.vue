
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="fullscreen row imagen">
        <div class="col-xs-10 col-sm-8 col-md-8 col-xl-8" style="margin: auto">
          <img src="https://cod.cni.com.br/novocod/Content/img/fundos/fundo_padrao_azul.jpg" class="wave" alt="login-wave" />
          <q-intersection transition="flip-left">
            <q-card style="border-radius: 2em">
              <q-card-section horizontal>
                <q-card-section v-bind:class="{
                  'justify-center':
                    $q.screen.md || $q.screen.sm || $q.screen.xs,
                }" class="col-12 col-md-6 content-center">
                  <q-card-section>
                    <q-avatar size="103px" class="absolute-center">
                      <img src="../assets/care.png" alt="avatar" />
                    </q-avatar>
                  </q-card-section>
                  <div class="q-pt-lg">
                    <div class="col text-h6 ellipsis flex justify-center">
                      <h2 class="text-h4 q-my-none text-weight-regular">
                        {{ $route.path === "/" ? "Inicio de Sesión" : "Registro" }}
                      </h2>
                    </div>

                    <q-card-section>
                      <LoginComponent></LoginComponent>
                    </q-card-section>
                  </div>
                </q-card-section>

                <q-img class="col-0 col-md-6 flex justify-center content-center"
                  src="https://cdn.pixabay.com/photo/2020/04/17/19/48/city-5056657_1280.png" />
              </q-card-section>
            </q-card>
          </q-intersection>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LoginComponent from 'src/components/loginComponent.vue';


</script>
<style scoped>
.wave {
  position: fixed;
  height: 111%;
  left: 0;
  bottom: 0;
  z-index: -1;
  background-size: contain;
}

.q-avatar {
  margin-top: -0.3em;
}
</style>