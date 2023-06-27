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
    Route.post("login", "UserController.login");
    Route.post('userCode', 'CustomerController.getCode')

    // PDf 
    Route.get('Pdf/:id', 'PdfController.generate')
    Route.get("show_file/:dir", "PdfController.getFileByFilename")
  })
);

addPrefixToGroup(
  Route.group(() => {
    // Informacion del Logueado //
    Route.get("InfoLog", "UserController.index");
    // Informacion del Logueado //

    // Documents controllers
    Route.post("documents", "DocumentsController.store");
    Route.get("documents", "DocumentsController.show");
    Route.get("documents/:id", "DocumentsController.index");
    Route.delete("documents/:id", "DocumentsController.destroy");
    // Documents Controller
  }).middleware("auth")
);

