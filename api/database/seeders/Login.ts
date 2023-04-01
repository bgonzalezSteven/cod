import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Login from 'App/Models/Login'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey  = 'id'
    await Login.updateOrCreateMany(uniqueKey , [
      {
        id: 1,
        email: 'admin@adonisjs.com',
        password: 'admin'
      }
    ])
  }
}
