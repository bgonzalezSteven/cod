// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class LoginController {

  public async index({ auth, request, response }) {
    const info = await request.all()
     try {
      const token = await auth.use('api').attempt(info.email, info.password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
