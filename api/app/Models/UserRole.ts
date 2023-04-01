import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from 'App/Models/Role'
import Login from 'App/Models/Login'

export default class UserRole extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public role_id: number
  
  @column()    
  public login_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
