import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'id'
    await Permission.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        role_id: 1,
        slug: 'admin',
        description: 'Listado general',
      },
      {
        id: 2,
        role_id: 1,
        slug: 'admin.list',
        description: 'Listado general',
      },
      {
        id: 3,
        role_id: 1,
        slug: 'admin.form',
        description: 'Formulario',
      }
    ])
  }
}
