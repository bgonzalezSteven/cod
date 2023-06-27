<template>
  <q-layout view="hHh LpR lFf">
    <q-header style="border-radius: 0em 0em 2em 2em" class="text-black">
      <q-toolbar style="border-radius: 0em 0em 2em 2em" class="bg-primary text-white">
        <q-btn dense flat round icon="short_text" @click="left = !left" />
        <q-space />
        <template v-if="route.path != '/menu'">
          <q-btn dense flat round icon="arrow_back_ios_new" @click="router.go(-1)" class="q-mr-mg"/>
        </template>        
        <q-drawer show-if-above v-model="left" side="left" behavior="mobile">
          <div class="row justify-center">
            <q-img src="https://cdn.quasar.dev/img/blueish.jpg" style="height: 150px">
              <div class="absolute-left" style="border-top-left-radius: 5px; background: none;">
                <q-avatar size="120px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>
              </div>
              <div class="absolute-bottom-right text-bold " style="border-top-left-radius: 5px; background: none;">{{
                state.info.name }}</div>
            </q-img>
          </div>
          <div class="text-black q-pt-md" v-for="(item, index) in itemsMenu" v-bind:key="index">
            <q-list>
              <q-expansion-item group="somegroup" :icon="item.icon" :label="item.name" header-class="text-primary">
                <div v-for="(itemChildren, indexChildren) in itemsMenu[index].children" v-bind:key="indexChildren">
                  <q-list class="q-ml-lg">
                    <q-item clickable v-ripple :to="itemChildren.url" v-if="login.can(itemChildren.permission)">
                      <q-item-section avatar>
                        <q-icon color="primary" :name="itemChildren.icon" />
                      </q-item-section>

                      <q-item-section>{{ itemChildren.name }}</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-expansion-item>
            </q-list>
          </div>
        </q-drawer>

        <q-btn flat round dense icon="account_circle">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>

                <div class="text-weight-bold q-mt-md q-mb-xs">
                  {{ state.info.name }}
                </div>
                <div class="text-weight-bold q-mt-md q-mb-xs">Usuario:</div>
                <div class="text-weight">{{ state.info.email }}</div>
                <div class="q-mt-md q-mb-xs"></div>
                <div class="row">
                  <div class="col">
                    <q-btn color="primary" label="Cancel" push size="sm" v-close-popup />
                  </div>
                  <div style="margin-left: 6%"></div>
                  <div class="col">
                    <q-btn color="negative" label="Logout" push size="sm" @click="exit()" />
                  </div>
                </div>
              </div>
            </div>
          </q-menu>
        </q-btn>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md">
          <div class="text-bold text-h6" align="center">
            {{ state.titulo }}
          </div>
      </div>
      <router-view @setTittle="setTittle"/>
    </q-page-container>
  </q-layout>
</template>
<script>
import { reactive, onMounted, ref } from 'vue'
import { UseLoginInfo } from 'src/stores/loginInfo'
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const login = UseLoginInfo()
    const left = ref(false)
    let state = reactive({
      info: {},
      titulo: 'Inicio'
    })
    const itemsMenu = [
      {
        name: 'Control',
        url: '',
        permission: 'admin',
        icon: "settings",
        children: [
          {
            name: 'Listado',
            url: '/list',
            permission: 'configuration.list',
            icon: 'format_list_bulleted'
          },
          {
            name: 'Formulario',
            url: '/form',
            permission: 'configuration.form',
            icon: 'assignment'
          },
        ]
      },
    ]
    onMounted(() => {
      if (!login.getsessionInfo) {
        $q.notify({
          message: 'Vuelve a iniciar sesion',
          color: 'negative'
        })
        router.push('/')
      } else {
        state.info = login.getinfoMenuUser
      }
    })
    function exit() {
      login.logout()
      router.push('/')
    }
    function setTittle(params) {
      state.titulo = params
    }
    return {
      left, state, onMounted, exit, itemsMenu, login, setTittle, router, route
    }
  },
}
</script>
<style>
.q-drawer {
  border-radius: 0em 2em 2em 0em;
}
</style>