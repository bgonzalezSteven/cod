import { DateTime } from 'luxon'
<<<<<<< HEAD
import { BaseModel, afterCreate, afterFind, beforeFind, beforeSave, beforeUpdate, column } from '@ioc:Adonis/Lucid/Orm'
=======
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
>>>>>>> 812251c889d9f0bb1abe2f65ff39a161cec2403f
//fkjdbsbdf//
export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number
    
  @column({ serializeAs: 'json' })
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

  @afterFind()
  public static async hideTable(table: Document) {
    return table.$attributes.table = JSON.parse(table.table)
  }

  @beforeSave()
  public static async HashTable(table: Document) {
    return table.$attributes.table = JSON.stringify(table.table)
  }

}
