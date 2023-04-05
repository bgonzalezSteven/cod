import { boot } from 'quasar/wrappers'
import axios from 'axios'
import env from 'src/env'
import { UseLoginInfo } from 'src/stores/loginInfo';

import { useQuasar } from "quasar";
const $q = useQuasar();
const infoLogin = UseLoginInfo()

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: env.apiUrl })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  api.interceptors.response.use(res => {
    console.log(res, 'Axios response')
    //Empezamos a manejar la informacion traida del back

    if (res.config.method === 'post') {
      if (res.status === 200) {
         if (res.data.token === undefined) {
           // Si no es login
           $q.notify({
             color: "positive",
             icon: "done",
             message: "Registro guardado con éxito!",
           });
         } else {
           // Es Login
           localStorage.setItem("sessionInfo", JSON.stringify(res.data));
         }
      }
    }
  })
  /// Antes de cada Peticion debo enviar el token de existir claramente
  api.interceptors.request.use(async function(config) { 
    infoLogin.fetchAccessToken() // Verificamos si existe un token, sino lo almacenamos
    if (infoLogin.sessionInfo) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers = {
        Authorization: `Bearer ${infoLogin.sessionInfo}`
      }
    }
    return config 
  },
    function (error) {
    return Promise.reject(error)
  })
})

export { api }
