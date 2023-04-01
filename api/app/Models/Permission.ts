import { DateTime } from 'luxon'
import { BaseModel, column, hasMany,HasMany} from '@ioc:Adonis/Lucid/Orm'
import Role from 'App/Models/Role'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  
  @column()
  public role_id: number

  @column()
  public slug: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
