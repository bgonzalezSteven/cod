/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


// Rutas
Route.group(() => {
  Route.post('login', 'LoginController.index')
  Route.post('sesionClose', 'LoginController.closeSession')
}).prefix('/api')

// Rutas
Route.group(() => {
  Route.get('getInfo', 'LoginController.show')

  // Documents controllers
  Route.post('documents', 'DocumentsController.store')
  Route.get('documents', 'DocumentsController.show')
  Route.get('documents/:id', 'DocumentController.index')
  Route.delete('documents/:id', 'DocumentController.destroy')
  // Documents Controller


  // Pdf Controller
  Route.post('generate/:id', 'PdfsController.generate')
  Route.get('GetPDF/:dir', 'PdfsController.getFileByFileName')

  // Pdf Controller

}).prefix('/api').middleware('auth')