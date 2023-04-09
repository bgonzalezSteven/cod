<template>
  <q-page class="q-pa-sm" style="min-height: 420px;">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">

      <form @submit.prevent="submit">
        <div class="q-pa-sm">
          <div class="row items-center justify-center">
            <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
              <q-input outlined v-model="state.form.export" label="Exportador" :error="v$.form.export.$error" error-message="Campo necesario"/>
            </div>
            <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
              <q-input outlined v-model="state.form.import" label="Importador" :error="v$.form.import.$error" error-message="Campo necesario" />
            </div>
            <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
              <q-input outlined v-model="state.form.consignee" label="Consignatario" :error="v$.form.consignee.$error" error-message="Campo necesario" />
            </div>
          </div>
        </div>
        <div class="q-pa-sm">
          <div class="text-h6 tex-bold text-center">Instate.formacion de tabla</div>
          <div class="q-pa-sm">
            <div class="row items-center justify-center">
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input mask="###,###.##" reverse-fill-mask outlined v-model="state.form.quantity" :error="v$.form.quantity.$error" error-message="Campo necesario" label="Cantidad" />
              </div>
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input outlined v-model="state.form.species" label="Especie" :error="v$.form.species.$error" error-message="Campo necesario" />
              </div>
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
                <q-input outlined v-model="state.form.description_of_goods" label="Descripción de la mercancía" :error="v$.form.description_of_goods.$error" error-message="Campo necesario" />
              </div>
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input mask="###.###.###,##" reverse-fill-mask outlined v-model="state.form.value" label="Valor" :error="v$.form.value.$error" error-message="Campo necesario" />
              </div>
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
                <q-input outlined v-model="state.form.marks_and_numbers" label="Marcas y números" :error="v$.form.marks_and_numbers.$error" error-message="Campo necesario" />
              </div>
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input outlined v-model="state.form.transport" label="Transporte" :error="v$.form.transport.$error" error-message="Campo necesario" />
              </div>
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input mask="###.###.###,## KG" reverse-fill-mask outlined v-model="state.form.gross_weight"
                  label="Peso bruto" :error="v$.form.gross_weight.$error" error-message="Campo necesario" />
              </div>
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input mask="###.###.###,## KG" reverse-fill-mask outlined v-model="state.form.liquid_weight"
                  label="Peso liquido" :error="v$.form.liquid_weight.$error" error-message="Campo necesario" />
              </div>
            </div>
          </div>
        </div>
        <div class="q-pa-sm">
          <div class="text-h6 tex-bold text-center">Número correlativo</div>
          <div class="q-pa-sm">
            <div class="row items-center justify-center">
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
                <q-input outlined v-model="state.form.correlative_number" label="Número" :error="v$.form.correlative_number.$error" error-message="Campo necesario" />
              </div>
            </div>
          </div>
        </div>
        <div class="q-pa-sm">
          <div class="text-h6 tex-bold text-center">
            <q-btn class="full-width bg-primary text-white" rounded type="submit">Guardar</q-btn>
          </div>
        </div>
      </form>
    </div>
  </q-page>
</template>
<script>
import {  reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useRouter, useRoute } from 'vue-router';
export default {

  setup(props, { emit }) {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    
    let state = reactive({
      form: {        
        export: '',
        import: '',
        consignee: '',
        quantity: '',
        species: '',
        description_of_goods: '',
        value: '',
        marks_and_numbers: '',
        transport: '',
        gross_weight: '',
        liquid_weight: '',
        correlative_number: ''
      }
    })

    
    onMounted(() => {
      emit('setTittle', 'Información')
      verifyRoute()
    })

    function verifyRoute() {
      if (route.params.id) {
        $q.loading.show()
        api.get(`documents/${route.params.id}`).then(res => {
          state.form = (res)
          $q.loading.hide()
        })
      }
    }

    const rules = {
      form: {        
        export: { required },
        import: { required },
        consignee: { required },
        quantity: { required },
        species: { required },
        description_of_goods: { required },
        value: { required },
        marks_and_numbers: { required },
        transport: { required },
        gross_weight: { required },
        liquid_weight: { required },
        correlative_number: { required },
      }
    }
    
    const v$ = useVuelidate(rules, state)

    function submit() {
      console.log(state.form)
      this.v$.$touch()
      if (this.v$.$error) {
        console.log(this.v$)
      } else {          
        $q.loading.show()
        api.post('documents', state.form).then(res => {
          console.log(res)
          $q.loading.hide()
          router.go(-1)
        })
      }
    }
    return {
      state, submit, v$, verifyRoute
    }
  }
}
</script>