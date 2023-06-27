'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use("App/Models/Role")
const roleData = [
  {
    name: "Rol General",
    slug: "app.superAdmin",
    description: "Administrador",
    permissions: [
      {
        slug: "configuration",
        name: "Configuración",
      },
      {
        slug: "configuration.list",
        name: "Listado documentos",
      },
      {
        slug: "configuration.form",
        name: "Formulario",
      },
    ],
  },
];
class RoleSeeder {
  async run() {
    for (let i in roleData) {
      let role = await Role.findBy("slug", roleData[i].slug);
      if (!role) {
        await Role.create(roleData[i]);
      } else {
        role.name = roleData[i].name;
        role.slug = roleData[i].slug;
        role.description = roleData[i].description;
        role.permissions = roleData[i].permissions;
        await role.save();
      }
    }
    console.log("Finished Role");
  }
}


module.exports = RoleSeeder
