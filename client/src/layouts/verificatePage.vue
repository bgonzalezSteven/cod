<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="row justify-center text-center">
        <div class=" col-xs-11 col-sm-11 col-md-9 col-xl-9">
          <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top:2px;">
            <div class="col">
              <img src="https://cod.cni.com.br/novocod/Content/img/fundos/logoPaginaVerificacao.png" />
            </div>
          </div>
          <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12" align="center">
            <div class="col tituloPagina text-white" style="">
              Site de Verificação
            </div>
          </div>
          <div>
            <div class="conteudoSiteVerificacao posicionamentoMargemSUperior container conteudoPesquisaCertificadoTexto">
              <div>
                <div class="q-pt-sm fontTexto2 posicionamentoMargemSUperior" style="text-align:center">
                  Esse certificado foi emitido pelo Sistema COD Brasil. Segue abaixo mais informações:
                </div>
                <br/>
                <div>                  
                  <div class="row text-left">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 text-bold">Emitido por:</div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9  ">Federação das Indústrias do Estado de Roraima (FIER)</div>
                  </div>
                  <div class="row text-left">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  text-bold">Tipo de certificado</div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9  ">Certificado de Livre Venda</div>
                  </div>
                  <div class="row text-left">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  text-bold">Número do certificado</div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9  ">{{ state.form.correlative_number }}</div>
                  </div>
                  <div class="row text-left">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  text-bold">Data de emissão</div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9  ">{{ state.form.dateEmission }}</div>
                  </div>
                  <div class="row text-left">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  text-bold">Exportador</div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9  ">{{ state.form.export }}</div>
                  </div>
                  <div class="row text-left">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  text-bold">Fatura comercial</div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9  ">{{ state.form.commercialInvoice }}</div>
                  </div>
                  <div class="row text-left">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  text-bold">País de destino</div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9  ">{{ state.form.country }}</div>
                  </div>
                  <div class="row text-left">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  text-bold">Status</div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9  ">Emitido</div>
                  </div>
                  <div class="row text-left">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  text-bold">Descrição da mercadoria</div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9  ">{{ state.form.description }}</div>
                    <br/>
                  </div>
                </div>
              </div>
              <br/>
            <div class="q-pt-xl q-pb-md">
              <q-btn style="width: 20px;" class="botaoLanguage">
                <q-icon name="fas fa-undo"/>
              </q-btn>
            </div>
            </div>
            <div class="q-pa-sm row text-white text-bold">
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" style="font-size: 15px;"> SAC - Serviço de atendimento ao cliente</div>
              <div class=" col-xs-12 col-sm-12 col-md-3 col-lg-3" style="font-size: 15px;">
                <div class="col">(61) 3317-9989</div>
                <div class="col">(61) 3317-9992</div>
              </div>
              <div class=" col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <img style="height: 55px; width: 130px" src="https://cod.cni.com.br/novocod/Content/img/logos/logo_cni.png"/>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
export default {
  setup(props, { emit }) {
    const route = useRoute()
    let state = reactive({
      form: {}
    })
    onMounted(() => {
      getInfo(route.params.number)
    })

    function getInfo(number) {
      api.get(`info/${number}`).then(res => {
        state.form = res
        let temp = state.export
        console.log(temp.split('\n'))
      })
    }
    return { state }
  }
}


</script>
<style scoped>
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.botaoLanguage {
  color: white;
  font-weight: bold;
  border-radius: 5px;
  background-color: #0176c6;
  border: solid 1px white;
}
.tituloPagina {
  font-size: 34px;
  letter-spacing: 1px;
  margin-left: 2px;
  margin-top: -4px
}

.q-page {
  background: url('https://cod.cni.com.br/novocod/Content/img/fundos/fundo_padrao_azul.jpg');
  background-repeat: no-repeat;
  background-color: #0176c6;
  background-position: center center;
  background-attachment: fixed;
  font-family: Poppins, sans-serif !important;
  background-size: cover
}

.fontTexto2 {
  text-align: justify;
}

.posicionamentoMargemSUperior {
  margin-top: 8px;
}

.conteudoPesquisaCertificadoTexto {
  font-family: Poppins, sans-serif !important;
  font-size: 18px;
}

.conteudoSiteVerificacao {
  /* box-shadow: 0px 3px 8px 0 rgba(20, 32, 50, 0.2), 0px 16px 24.9px 5.1px rgba(20, 32, 50, 0.25); */
  border-radius: 5px;
  z-index: 1000;
  background-color: white;
  color: black;
}
</style>