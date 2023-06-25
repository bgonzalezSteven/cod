import Document from 'App/Models/Document'
import { schema } from '@ioc:Adonis/Core/Validator'

const datesInfo = schema.create({
    table: schema.array().anyMembers(),
    export: schema.string(),
    import: schema.string(),
    money: schema.string(),
    consignee: schema.string(),
    transport: schema.string(),
    gross_weight: schema.string(),
    liquid_weight: schema.string(),
    correlative_number: schema.string()
})
  
// Validacion de datos

export default class DocumentsController {
  
  
  public async index({ params, response }) {
    const dates = await Document.findBy('id', params.id)
    dates.table = JSON.parse(dates.table)
    console.log(dates)
    response.send(dates)
  }

  public async create({}) {

  }

  public async store({ request, response }) {
    const validation = await request.validate({ schema: datesInfo })
    if (!validation) {
      response.unprocessableEntity(validation.messages())
    } else {
      const body = request.all()
      body.table = JSON.stringify(body.table)
      if (body.id) {
        delete body.json
        body.table = JSON.stringify(body.table)
        response.status(201).send(await Document.query().where('id', body.id).update(body))
      } else {
        response.send(await Document.create(body))
      }
    }

  }

  public async show({ response }) {
    console.log('datos')
    response.send((await Document.all()))

  }

  public async edit({}) {

  }

  public async update({}) {

  }

  public async destroy({ params, response }) {
    response.send(await Document.query().where('id', params.id).delete())
  }
}
