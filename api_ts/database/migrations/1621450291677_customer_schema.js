'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.string('plant').defaultTo('NONE')
      table.string('address').defaultTo('NONE')
      table.string('consignee').defaultTo('NONE')
      table.string('place').defaultTo('NONE')
      table.string('means').defaultTo('NONE')
      table.string('entry').defaultTo('NONE')
      table.string('packages').defaultTo('NONE')
      table.string('quantity').defaultTo('NONE')
      table.string('marks').defaultTo('NONE')
      table.string('botanical').defaultTo('NONE')
      table.string('declaration_aditional').defaultTo('NONE')
      table.date('date_treatment')
      table.string('chemical').defaultTo('NONE')
      table.string('concentration').defaultTo('NONE')
      table.string('duration_temperature').defaultTo('NONE')
      table.string('treatment').defaultTo('NONE')
      table.string('aditional_information').defaultTo('NONE')
      table.string('place_of_issue').defaultTo('NONE')
      table.date('date_issue')
      table.string('name_authorized').defaultTo('NONE')
      table.string('signature').defaultTo('NONE')
      table.string('number').defaultTo('NONE')
      table.string('access').defaultTo('NONE')
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
