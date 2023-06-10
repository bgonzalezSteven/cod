<template>
  <q-page class="q-pa-sm" style="min-height: 420px;">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">

      <form @submit.prevent="submit">
        <div class="q-pa-sm">
          <div class="row items-center justify-center">
            <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
              <q-input type="textarea" outlined v-model="state.form.export" label="Exportador"
                :error="v$.form.export.$error" error-message="Campo necesario" />
            </div>
            <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
              <q-input type="textarea" outlined v-model="state.form.import" label="Importador"
                :error="v$.form.import.$error" error-message="Campo necesario" />
            </div>
            <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
              <q-input type="textarea" outlined v-model="state.form.consignee" label="Consignatario"
                :error="v$.form.consignee.$error" error-message="Campo necesario" />
            </div>
          </div>
        </div>
        <div class="q-pa-sm">
          <div class="text-h6 text-bold text-center">Información de tabla</div>
          <div class="text-h6 text-italic text-center">
            <q-btn push size="sm" round color="primary" icon="add" @click="modificate(true)" />
            {{ state.form.table.length }} items
            <q-btn push size="sm" round color="negative" icon="remove"
              @click="modificate(false)" />
          </div>
          <div class="q-pa-sm">
            <div class="row items-center justify-center" v-for="(items, index) in state.form.table" :key="index">
              <div style="padding-right: 8px; padding-top: 2em;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input mask="###,###.##" reverse-fill-mask outlined v-model="state.form.table[index].quantity" label="Cantidad"/>
              </div>
              <div style="padding-right: 8px; padding-top: 2em;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input outlined v-model="state.form.table[index].species" label="Especie" mask="AAAAA"/>
              </div>
              <div style="padding-right: 8px; padding-top: 2em;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input mask="###.###.###,##" reverse-fill-mask outlined v-model="state.form.table[index].value" label="Valor" />
              </div>
              <div style="padding-right: 8px; padding-top: 2em;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
                <q-input type="textarea" outlined v-model="state.form.table[index].description_of_goods"
                  label="Descripción de la mercancía" />
              </div>
            </div>
          </div>
        </div>
        <div class="q-pa-sm">
          <div class="text-h6 text-bold text-center">Detalles de carga</div>
          <div class="q-pa-sm">
            <div class="row items-center justify-center q-pa-sm">              
                <div style="padding-right: 8px" class="col-xs-11 col-sm-2 col-md-1 col-xl-1">
                  <q-input outlined v-model="state.form.money" label="Moneda" :error="v$.form.money.$error"
                    error-message="Campo necesario"/>
                </div>
            </div>
            <div class="row items-center justify-center">
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4 q-pb-md">
                <q-input outlined v-model="state.form.marks_and_numbers" label="Marcas y números" />
              </div>
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-4 col-md-2 col-xl-2">
                <q-input outlined v-model="state.form.transport" label="Transporte" :error="v$.form.transport.$error"
                  error-message="Campo necesario" />
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
          <div class="text-h6 text-bold text-center">Número correlativo</div>
          <div class="q-pa-sm">
            <div class="row items-center justify-center">
              <div style="padding-right: 8px;" class="col-xs-11 col-sm-6 col-md-4 col-xl-4">
                <q-input outlined v-model="state.form.correlative_number" label="Número"
                  :error="v$.form.correlative_number.$error" error-message="Campo necesario" />
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
import { reactive, onMounted } from 'vue';
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
        table: [
          {
            quantity: '',
            species: '',
            value: '',
            description_of_goods: '',
          }
        ],
        money: '',
        export: '',
        import: '',
        consignee: '',
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
          state.form.table = res.json
          $q.loading.hide()
        })
      }
    }
    function modificate(actions) {
      if (actions) {
        state.form.table.push({quantity: '', species: '', value: '', money: '', description_of_goods: ''})
      } else {
        state.form.table.pop()
      }
    }

    const rules = {
      form: {
        export: { required },
        import: { required },
        consignee: { required },
        transport: { required },
        gross_weight: { required },
        liquid_weight: { required },
        correlative_number: { required },        
        money: { required },
      }
    }

    const v$ = useVuelidate(rules, state)

    function submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        console.log(this.v$)
      } else {
        $q.loading.show()
        api.post('documents', state.form).then(res => {
          console.log(res)
          $q.loading.hide()
          // router.go(-1)
        })
      }
    }
    return {
      state, submit, v$, verifyRoute, modificate
    }
  }
}
</script>
<style>
.q-textarea.q-field--labeled .q-field__control-container {
  padding-top: 26px;
  height: 10em
}
</style>

// Tiens que crear un array de objetos para los datos de la table, inicializando en uno y pudiendo eliminar el campo especifico al cual nos referimos...