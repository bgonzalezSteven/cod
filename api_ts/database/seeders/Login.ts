import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey  = 'id'
    await User.updateOrCreateMany(uniqueKey , [
      {
        id: 1,
        email: 'admin@adonisjs.com',
        password: 'admin'
      }
    ])
  }
}
