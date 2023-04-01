// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class LoginController {
  public async index({ request }) {
    console.log(request.all())
  }
}
