'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
  Un usuario tiene módulos, cada módulo tiene permisos tanto para items como para acciones
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/


/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const RoleUser = use('App/Models/User')
const RoleUserData = [
  {
    id: 1,
    username: 'Administrador',
    email: 'admin@example.com',
    password: 'admin'
  }
]

class UserSeeder {
  async run () {
    for (let i in RoleUserData) {
      let dates = await RoleUser.find(RoleUserData[i].id)
      if(!dates) {
        await RoleUser.create(RoleUserData[i])
      } else {
        dates.name = RoleUserData[i].name,
        dates.email = RoleUserData[i].email,
        dates.password = RoleUserData[i].password
        dates.save()
      }
      console.log('User Finish')
    }
  }
}

module.exports = UserSeeder
