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
const User = use("App/Models/User");
const users = [
  {
    _id: "5e6bd7c1f587103b1609e94a",
    email: "sistem32@cod.com",
    password: "admin2023",
    roles: [
      {
        slug: "app.superAdmin",
      },
    ],
  },
];

class UserSeeder {
  async run() {
    for (let i in users) {
      let record = await User.findBy("_id", users[i]._id);
      if (!record) {
        await User.create(users[i]);
      } else {
        record.email = users[i].email;
        record.password = users[i].password;
        record.roles = users[i].roles;
        record.darkMode = users[i].darkMode;
        await record.save();
      }
    }
    console.log("Finished User");
  }
}



module.exports = UserSeeder
