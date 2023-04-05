import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserRole from 'App/Models/UserRole'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'id'
    await UserRole.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        user_id: 1,
        role_id: 1
      }
    ])
  }
}
