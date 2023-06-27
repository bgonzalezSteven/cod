import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'id'
    await Permission.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        roleId: 1,
        slug: 'admin',
        description: 'Listado general',
      },
      {
        id: 2,
        roleId: 1,
        slug: 'admin.list',
        description: 'Listado general',
      },
      {
        id: 3,
        roleId: 1,
        slug: 'admin.form',
        description: 'Formulario',
      }
      
    ])
  }
}
