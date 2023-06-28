'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with documents
 */
const Document = use('App/Models/Document')
class DocumentController {
  /**
   * Show a list of all documents.
   * GET documents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, params }) {
    response.send(await Document.findBy('_id', params.id))
  }

  /**
   * Render a form to be used for creating a new document.
   * GET documents/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new document.
   * POST documents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const body = request.all()
    if (body._id) {
      response.status(201).send(await Document.where('_id', body._id).update(body))
    } else {
      response.status(200).send(await Document.create(body))
    }
  }

  /**
   * Display a single document.
   * GET documents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send(await Document.all());
  }

  /**
   * Render a form to update an existing document.
   * GET documents/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update document details.
   * PUT or PATCH documents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, parmas }) {

  }

  /**
   * Delete a document with id.
   * DELETE documents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request, response, params }) {
    response.send(await Document.where('_id', params.id).delete())
  }
}

module.exports = DocumentController
