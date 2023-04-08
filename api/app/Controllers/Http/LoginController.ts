import User from "App/Models/User"

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class LoginController {

  public async index({ auth, request, response }) {
    const info = await request.all()
     try {
       const token = await auth.use('api').attempt(info.email, info.password)
       const infoUser = ((await User.findBy('email', info.email)))
       // Se supone que aqui debes de intregrar relaciones y para traer los roles, permisos y demas informacion
       console.log(infoUser)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
