
import Role from "App/Models/Role"
import User from "App/Models/User"

export default class LoginController {

  public async index({ auth, request, response }) {
    const info = await request.all()
     try {
        const usr = (await auth.use('api').attempt(info.email, info.password))
        const infoUser = ((await User.query().preload('role').where({'email': info.email})))
        const permission = (await Role.query().preload('permission').where({ 'id': infoUser[0].role.roleId }))[0]
        usr.role = permission.role
        usr.permissions = []
        permission.permission.map((element) => {
          usr.permissions.push(element.slug)
        })
       
       const temp = {
         name: usr.name,
         token: usr.tokenHash,
         permissions: usr.permissions,
         role: usr.role,
         type: usr.type,
         email: usr.user.email
       }
       console.log(temp)
        return (temp)
     } catch (error) {
       response.status(401).send()
    }
  }

  public async show({ auth, response }) {
    response.send(await User.findBy('id', auth.user.id))
  }

  public async closeSession({ auth,response }) {
    await auth.use('api').revoke()
    response.status(201).send({ revoke: true})
  }
}
