'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }
  static get fillable () {
    return [
      'plant', 'address', 'consignee', 'place', 'means', 'entry', 'packages', 'quantity', 'marks', 'botanical', 'declaration_aditional', 'date_treatment', 'chemical', 'concentration' , 'duration_temperature', 'treatment', 'aditional_information', 'place_of_issue', 'date_issue', 'name_authorized', 'signature'
    ]
  }

  static fieldValidationRules () {
    return {
      plant: 'string',
      address: 'string',
      consignee: 'string',
      place: 'string',
      means: 'string',
      entry: 'string',
      packages: 'string',
      quantity: 'string',
      marks: 'string',
      botanical: 'string',
      declaration_aditional: 'string',
      date_treatment: 'date',
      chemical: 'string',
      concentration: 'string',
      duration_temperature: 'string',
      treatment: 'string',
      aditional_information: 'string',
      place_of_issue: 'string',
      date_issue: 'date',
      name_authorized: 'string',
      signature: 'string',
      number: 'string',
      access: 'string',
    }
  }
}

module.exports = Customer
