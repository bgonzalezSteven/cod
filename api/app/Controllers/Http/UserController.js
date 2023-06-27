'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use("App/Models/User")
const Role = use("App/Models/Role");

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, auth }) {
    let user = (await auth.getUser()).toJSON();
    response.send(user);
  }
  async info({ request, response, params, auth }) {
    let user = await auth.getUser();
    let userData = (await User.findBy("email", user.email)).toJSON();
    let roleIds =
      userData.roles.length > 0
        ? userData.roles.map((roleMap) => {
            return roleMap.slug;
          })
        : [];
    const name = (await Role.whereIn("slug", roleIds).fetch()).toJSON();
    user.name = name[0].name;
    response.send(user);
  }

  async indexSalesU({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  async storeSalesU({ request, response }) {}

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateSalesU({ params, request, response }) {}

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  async login({ auth, request, response }) {
    /* const { email, password } = request.all();
    let token = await auth.attempt(email, password)
    let roles = (await User.findBy('email', email)).roles
    token.roles = roles.map(roleMap => {
      return roleMap.slug
    })

    let userRoles = await Role.whereIn('slug', token.roles).fetch()
    let permissions = userRoles.toJSON()
    token.permissions = []
    permissions.forEach(element => {
      element.permissions.forEach(element2 => {
        token.permissions.push(element2.slug)
      })
    })

    return token */
    try {
      const { email, password } = request.all();
      let usr = await auth.attempt(email, password);
      let userData = (await User.findBy("email", email)).toJSON();
      usr.email = userData.email;
      let roleIds =
        userData.roles.length > 0
          ? userData.roles.map((roleMap) => {
              return roleMap.slug;
            })
          : [];
      const name = (await Role.whereIn("slug", roleIds).fetch()).toJSON();
      let userRoles = (await Role.whereIn("slug", roleIds).fetch()).toJSON();
      console.log(userRoles)
      usr.roles = userData.roles.map((roleMap) => {
        return roleMap.slug;
      });
      console.log(usr)
      let permissions = [];
      userRoles.forEach((element) => {
        element.permissions.forEach((element2) => {
          permissions.push(element2.slug);
        });
      });
      usr.name = name[0].name;
      usr.permissions = permissions;
      console.log(usr)
      return usr;
    } catch (error) {
      response.status(401).send(error);
    }
  }
}

module.exports = UserController
