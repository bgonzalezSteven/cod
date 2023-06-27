'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlantSchema extends Schema {
  up () {
    this.create('plants', (table) => {
      table.increments()
      table.string('plant')
      table.timestamps()
    })
  }

  down () {
    this.drop('plants')
  }
}

module.exports = PlantSchema
