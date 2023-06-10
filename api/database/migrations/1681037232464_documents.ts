import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.jsonb('table')
      table.string('export')
      table.string('import')
      table.string('consignee')
      table.string('marks_and_numbers')
      table.string('transport')
      table.string('gross_weight')
      table.string('liquid_weight')
      table.string('correlative_number')
      table.string('money')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
