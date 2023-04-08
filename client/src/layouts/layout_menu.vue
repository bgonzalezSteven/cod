<template>
  <q-layout view="hHh LpR lFf">
    <q-page-container>
      <q-header style="border-radius: 0em 0em 2em 2em" class="text-black">
        <q-toolbar style="border-radius: 0em 0em 2em 2em" class="bg-primary text-white">
          <q-btn dense flat round icon="short_text" @click="left = !left" />
          <q-space />
           <q-drawer show-if-above v-model="left" side="left" behavior="mobile" >
        <!-- drawer content -->
            </q-drawer>

          <q-btn flat round dense icon="account_circle">
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                  </q-avatar>

                  <div class="text-weight-bold q-mt-md q-mb-xs">
                    {{ state.info.role }}
                  </div>
                  <div class="text-weight-bold q-mt-md q-mb-xs">Usuario:</div>
                  <div class="text-weight">{{ state.info.email }}</div>
                  <div class="q-mt-md q-mb-xs"></div>
                  <div class="row">
                    <div class="col">
                      <q-btn
                        color="primary"
                        label="Cancel"
                        push
                        size="sm"
                        v-close-popup
                      />
                    </div>
                    <div style="margin-left: 6%"></div>
                    <div class="col">
                      <q-btn
                        color="negative"
                        label="Logout"
                        push
                        size="sm"
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-menu>

          </q-btn>
        </q-toolbar>
      </q-header>
    </q-page-container>
  </q-layout>
</template>
<script>
import { reactive, onMounted, ref } from 'vue'
import { UseLoginInfo } from 'src/stores/loginInfo'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar';
export default {
  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const login = UseLoginInfo()
    const left = ref(false)
    let state = reactive({
      info: {}
    })
    onMounted(() => {
      if (!login.getsessionInfo) {
        $q.notify({
          message: 'Vuelve a iniciar sesion',
          color: 'negative'
        })
        router.push('/')
      } else {
        state.info = JSON.parse(localStorage.getItem('sessionInfo'))
      }
    })
    return {
      left, state, onMounted
    }
  },
}
</script>
<style>
.q-drawer {
  border-radius: 0em 2em 2em 0em;
}
</style>