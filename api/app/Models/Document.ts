import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
//fkjdbsbdf//
export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number
    
  @column()
    public export: string
  
  @column()
    public import: string
  
  @column()
    public consignee: string
  
  @column()
    public quantity: string
  
  @column()
    public species: string
  
  @column()
    public descriptionOfGoods: string
  
  @column()
    public value: string
  
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
