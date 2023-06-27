'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      table.string('declaration_aditional', 900).defaultTo('NONE').alter()
    })
  }

  down () {
    this.table('customers', (table) => {
      table.dropColumn('declaration_aditional')
    })
  }
}

module.exports = CustomerSchema
