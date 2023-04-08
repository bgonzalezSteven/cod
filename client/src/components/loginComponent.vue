<template>
  <q-form class="q-pt-xl q-gutter-md">
    <q-input type="email" dense rounded outlined label="Correo" v-model="form.email">
    </q-input>
    <q-input dense rounded outlined label="Contraseña" type="password" v-model="form.password">
    </q-input>
    <div>
      <q-btn unelevated rounded color="primary" label="Acceder" class="full-width" @click="save" />
    </div>
  </q-form>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import { UseLoginInfo } from 'src/stores/loginInfo'
export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const login = UseLoginInfo()

    const form = reactive({
      email: '',
      password: ''
    })
    onMounted(() => {
      login.logout()
    })

    function save() {
      if (form.email && form.password) {        
        $q.loading.show()
        api.post('login', form).then(res => {
          login.login(res)
          router.push('/menu')
        }).catch(res => {
          console.log(res, 'ehjbdhje')
        })
        $q.loading.hide()
      } else {
        $q.notify({
          type: 'negative',
          message: 'Verifica los campos de información'
        })
      }
    }
    
    return {
      form, save
    }
  },
}
</script>