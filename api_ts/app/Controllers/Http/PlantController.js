'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Plant = use('App/Models/Plant')
const { validate } = use("Validator")
/**
 * Resourceful controller for interacting with plants
 */
class PlantController {
  /**
   * Show a list of all plants.
   * GET plants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, params }) {
    let info = (await Plant.query().where('id', params.id).fetch()).toJSON()
    response.send(info[0])
  }

  /**
   * Render a form to be used for creating a new plant.
   * GET plants/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async list ({ request, response, view }) {
    const date = (await Plant.all()).toJSON()
    let info = []
    date.forEach(element => {
      info.push(element.plant)
    })
    response.send(info)
  }

  /**
   * Create/save a new plant.
   * POST plants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const validation = await validate(request.all(), Plant.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      // Falta crear los codgos y numeros
      let body = request.all()
      response.send(await Plant.create(body))
    }
  }

  /**
   * Display a single plant.
   * GET plants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const date = (await Plant.all()).toJSON()
    let info = []
    date.forEach(element => {
      info.push({id: element.id, plant: element.plant, actions: [
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
        }
      ]})
    })
    response.send(info)
  }

  /**
   * Render a form to update an existing plant.
   * GET plants/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update plant details.
   * PUT or PATCH plants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    response.send((await Plant.query().where('id', params.id).update(request.all())))
  }

  /**
   * Delete a plant with id.
   * DELETE plants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    response.send((await Plant.query().where('id', params.id).delete()))
  }
}

module.exports = PlantController
