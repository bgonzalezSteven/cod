'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Customer = use('App/Models/Customer')
const { validate } = use("Validator")
const moment = use("moment")
/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params, view }) {
    let info = (await Customer.query().where('id', params.id).fetch()).toJSON()
    const date_issue = ((moment(info[0].date_issue).format('YYYY-MM-DD')).toLocaleUpperCase())
    const date_treatment = ((moment(info[0].date_treatment).format('YYYY-MM-DD')).toLocaleUpperCase())
    info[0].date_issue = date_issue
    info[0].date_treatment = date_treatment
    response.send(info[0])
  }

  /**
   * Render a form to be used for creating a new customer.
   * GET customers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async aleatorie () {
    let result = ''
    let caracter = '1234567890ABCDEFGHIJKLMNOPRQRSTUVXYZ12345678902'
    for (let i = 0; i < 6; i++) {
      result += caracter[Math.floor(Math.random() * caracter.length)]
    }
    return result
  }
  async number () {
    const dates = (await Customer.all()).toJSON()
    let every = ''
    if (dates.length > 0) {
      let date = (parseInt(new Date().getFullYear()) - 2000)
      every = (60500 + (parseInt(dates[dates.length - 1].id) + 1)) + '/' + date
    } else {
      let date = (parseInt(new Date().getFullYear()) - 2000)
      every = (60500 + '/' + date)
    }
    return every
  }

  async store ({ request, response }) {
    const validation = await validate(request.all(), Customer.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      // Falta crear los codgos y numeros
      let body = request.all()
      body.access = await this.aleatorie()
      response.send(await Customer.create(body))
    }
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const date = (await Customer.all()).toJSON()
    let info = []
    date.forEach(element => {
      info.push({id: element.id, number: element.number, code: element.access, name: element.address, importation: element.consignee, actions: [
        {
          color: "secondary",
          icon: "edit",
          to: 'edit',
          action: "",
          title: "Editar"
        },
        {
          color: "accent",
          icon: "delete",
          to: 'delete',
          action: "",
          title: "Eliminar"
        },
        {
          color: "primary",
          icon: "print",
          to: 'pdf',
          action: "",
          title: "Planilla"
        }
      ]})
    })
    response.send(info)
  }

  /**
   * Render a form to update an existing customer.
   * GET customers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getCode ({ params, request, response, view }) {
    let date = await request.all()
    let info = (await Customer.query().where('number', date.number).where('access', date.code).fetch()).toJSON()
    let dates = info[0]
    const date_issue = (moment(dates.date_issue).locale('pt-br').format('DD/MMM/YYYY')).toLocaleUpperCase()
    const date_treatment = (moment(dates.date_treatment).locale('pt-br').format('DD/MMM/YYYY')).toLocaleUpperCase()
    dates.date_issue = date_issue
    dates.date_treatment = date_treatment
    if (dates.date_treatment === 'DATA INVÁLIDA') {
      dates.date_treatment = 'NONE'
    }
    if (dates.date_issue === 'DATA INVÁLIDA') {
      dates.date_issue = 'NONE'
    }
    response.status(201).send(dates)
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    response.send((await Customer.query().where('id', params.id).update(request.all())))
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    response.send((await Customer.query().where('id', params.id).delete()))
  }
}

module.exports = CustomerController
