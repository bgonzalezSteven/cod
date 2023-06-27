'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})
const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");

  return group;
};

addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí
    Route.post("login", "UserController.login")
    Route.post('userCode', 'CustomerController.getCode')

    // PDf 
    Route.get('Pdf/:id', 'PdfController.generate')
    Route.get("show_file/:dir", "PdfController.getFileByFilename")
  })
);

addPrefixToGroup(
  Route.group(() => {
    // Informacion del Logueado //
    Route.get('InfoLog', 'UserController.index')
    // Informacion del Logueado //

    // Informacion //
    Route.get('userId/:id', 'CustomerController.index')
    Route.get('user', 'CustomerController.show')
    Route.post('user', 'CustomerController.store')
    Route.delete('userId/:id', 'CustomerController.destroy')
    Route.put('userId/:id', 'CustomerController.update')
    // Informacion //



    // Plantas //
    Route.get('plantsId/:id', 'PlantController.index')
    Route.get('plants', 'PlantController.show')
    Route.get('plantsList', 'PlantController.list')
    Route.post('plants', 'PlantController.store')
    Route.delete('plantsId/:id', 'PlantController.destroy')
    Route.put('plantsId/:id', 'PlantController.update')
    // Plantas //
  }).middleware("auth")
);

