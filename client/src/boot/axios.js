import { boot } from 'quasar/wrappers'
import axios from 'axios'
import env from 'src/env'
import { UseLoginInfo } from 'src/stores/loginInfo';
import { Notify } from 'quasar';

const infoDates = [
    {
      value: 'export',
      label: 'Exportación'
    },
    {
      value: 'import',
      label: 'Importacion'
    },
    {
      value: 'consignee',
      label: 'Consignatario'
    },
    {
      value: 'quantity',
      label: 'Cantidad'
    },
    {
      value: 'species',
      label: 'Especie'
    },
    {
      value: 'descriptionOfGoods',
      label: 'Descripcion de mercancia'
    },
    {
      value: 'value',
      label: 'Valor'
    },
    {
      value: 'marksAndNumbers',
      label: 'Marcas y números'
    },
    {
      value: 'transport',
      label: 'Transportista'
    },
    {
      value: 'grossWeight',
      label: 'Peso Bruto'
    },
    {
      value: 'liquidWeight',
      label: 'Peso liquido'
    },
    {
      value: 'correlativeNumber',
      label: 'Número Correlativo'
    },
]

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: env.apiUrl })

export default boot(({ app }) => {
const infoLogin = UseLoginInfo()
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  api.interceptors.response.use(
    (res) => {
      console.log(res.data, "Axios response");
      //Empezamos a manejar la informacion traida del back

      if (res.config.method === "post") {
        if (res.status === 200) {
          if (res.data.token === undefined) {
            // Si no es login
            Notify.create({
              color: "positive",
              icon: "done",
              message: "Registro guardado con éxito!",
            });
          } else {
            // Es Login
            localStorage.setItem("sessionInfo", JSON.stringify(res.data));
          }
        } else if (res.status === 201) {          
            Notify.create({
              color: "positive",
              icon: "done",
              message: "Registro modificado con éxito!",
            });
        }
      }
      return res.data;
    },
    function (error) {
      console.log(error, 'error')
      if (error.message === undefined) { // Sino hubo comunincacion con el servidor
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "Por favor, verifica tu conexión de internet",
        });
      } else { // SI hay respuesta del servidor
        console.log(error.response.status, 'jvy')
        if (error.response.status === 401) {
          // Error en el login
          Notify.create({
            message: "Correo y/o contraseña incorrectos",
            color: "negative",
            position: "center",
          });
        } else if (error.response.status === 403) {
          Notify.create({
            message: error.response.data,
            color: "negative",
            position: "center",
          });
        } else if (error.response.status === 404) {
          Notify.create({
            message: "Error en ruta. Código 404",
            color: "Black",
            position: "center",
          });
        } else if (error.response.status === 422) {
          Notify.create({
            message: `Verifica los datos del formulario`,
            color: "negative",
            position: "center",
            icon: 'warning'
          });
        } else if (error.response.status === 500) {
          Notify.create({
            message: "Error en servidor. Código 500",
            color: "negative",
            position: "center",
          });
        } 
      }
    }
  );
  /// Antes de cada Peticion debo enviar el token de existir claramente
  api.interceptors.request.use(async function(config) { 
    infoLogin.fetchAccessToken() // Verificamos si existe un token, sino lo almacenamos
    const token = infoLogin.sessionInfo !== null ? infoLogin.sessionInfo.token : false;
    console.log(token, 'Token')
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return config 
  },
    function (error) {
    return Promise.reject(error)
  })
})

export { api }
