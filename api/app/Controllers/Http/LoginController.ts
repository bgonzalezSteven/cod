import User from "App/Models/User"
import UserRole from "App/Models/UserRole"

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class LoginController {

  public async index({ auth, request, response }) {
    const info = await request.all()
     try {
       const token = await auth.use('api').attempt(info.email, info.password)
       const infoUser = ((await User.findBy('email', info.email)).id) 
       const roleUser = (await UserRole.findBy('user_id', infoUser))
       console.log(roleUser)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
