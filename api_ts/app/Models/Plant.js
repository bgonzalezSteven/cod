'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Plant extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }
  static get fillable () {
    return [
      'plant'
    ]
  }

  static fieldValidationRules () {
    return {
      plant: 'string'
    }
  }
}

module.exports = Plant
