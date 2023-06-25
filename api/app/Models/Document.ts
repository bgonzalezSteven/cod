import { DateTime } from 'luxon'
import { BaseModel, afterCreate, afterFind, beforeFind, beforeSave, beforeUpdate, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
//fkjdbsbdf//
export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number
    
  @column()
    public table: object
  
  @column()
  public export: string
  
  @column()
    public import: string
  
  @column()
    public money: string
  
  @column()
    public consignee: string
  
  @column()
    public marksAndNumbers: string
  
  @column()
    public transport: string
  
  @column()
    public grossWeight: string
  
  @column()
    public liquidWeight: string
  
  @column()
    public correlativeNumber: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime



}
