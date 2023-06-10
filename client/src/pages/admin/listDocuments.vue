<template>
  <q-page class="q-pa-sm" style="min-height: 420px;">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div class="q-pa-sm">
        <div class="row items-center justify-center">
          <q-table :filter="filter" class="full-width my-sticky-dynamic" no-data-label="Hoy no tengo datos para tí" flat
            bordered :rows="date.rows" :columns="date.columns" row-key="name">

            <template v-slot:top-left>
              <q-btn rounded class="bg-secondary text-white" no-caps to="/form">Nuevo</q-btn>
            </template>
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />

                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn @click="deleted(props.row.id)" rounded icon="delete" size="sm"
                    class="q-mr-md bg-negative text-white">
                    <q-tooltip class="bg-negative" :offset="[10, 10]">
                      Eliminar
                    </q-tooltip>
                  </q-btn>
                  <q-btn @click="edit(props.row.id)" rounded icon="edit" size="sm"
                    class="q-mr-md bg-secondary text-white">
                    <q-tooltip class="bg-secondary" :offset="[10, 10]">
                      Editar
                    </q-tooltip>
                  </q-btn>
                  <q-btn @click="print(props.row.id)" rounded icon="print" size="sm" class="q-mr-md bg-accest">
                    <q-tooltip class="bg-secondary" :offset="[10, 10]">
                      Imprimir
                    </q-tooltip>
                  </q-btn>
                </q-td>

                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { onBeforeMount, reactive, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router'
export default {

  setup(props, { emit }) {
    const router = useRouter()

    const $q = useQuasar()

    onBeforeMount(() => {
      emit('setTittle', 'Listado')
    })
    let date = reactive({
      rows: [],
      columns: [
        {
          name: 'export',
          label: 'Exportador',
          align: 'left',
          field: 'export'
        },
        {
          name: 'import',
          label: 'Importador',
          field: 'import',
          align: 'center',
        },
        {
          name: 'consignee',
          label: 'Consignatario',
          field: 'consignee',
        }
      ]
    })
    onMounted(() => {
      getInfo()
    })
    function getInfo() {
      $q.loading.show()
      api.get('documents').then(res => {
        date.rows = res
        $q.loading.hide()
      })
      console.log(date)
    }

    function edit(id) {
      router.push(`/form/${id}`)
    }
    function print(id) {
      $q.loading.show()
      api.post(`generate/${id}`).then(res => {
        $q.loading.hide()
      })
    }
    function deleted(id) {
      $q.dialog({
        title: 'Connfirmación',
        message: '¿Estas seguro de eliminar el registro?',
        cancel: true,
        persistent: true,
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative'
        },
      }).onOk(() => {
        $q.loading.show()
        api.delete(`documents/${id}`).then(res => {
          $q.loading.hide()
          getInfo()
        })
      })
    }

    return {
      date, getInfo, onMounted, filter: ref(''), deleted, edit, print
    }
  }
}
</script>
<style lang="sass">
.my-sticky-dynamic

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th 
    background-color: $primary

.q-table--bordered
  border-radius: 1em
  

</style>