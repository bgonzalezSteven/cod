<template>
  <q-page class="q-pa-sm" style="min-height: 420px;">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div class="q-pa-sm">
        <div class="row items-center justify-center">
          aja
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { onBeforeMount } from 'vue';
export default {
  
  setup(props, {emit}) {
    onBeforeMount(() => {
      emit('setTittle', 'Información')
    })
    return {

    }
  }
}
</script>