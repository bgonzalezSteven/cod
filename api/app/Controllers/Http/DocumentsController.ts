import Document from 'App/Models/Document'
import { schema } from '@ioc:Adonis/Core/Validator'

const datesInfo = schema.create({
    export: schema.string(),
    import: schema.string(),
    consignee: schema.string(),
    quantity: schema.string(),
    species: schema.string(),
    description_of_goods: schema.string(),
    value: schema.string(),
    marks_and_numbers: schema.string(),
    transport: schema.string(),
    gross_weight: schema.string(),
    liquid_weight: schema.string(),
    correlative_number: schema.string()
})
  
// Validacion de datos

export default class DocumentsController {
  
  
  public async index({ params, response}) {
    response.send(await Document.findBy('id', params.id))
  }

  public async create({}) {

  }

  public async store({ request, response }) {
    const validation = await request.validate({ schema: datesInfo })
    if (!validation) {
      response.unprocessableEntity(validation.messages())
    } else {
      const body = request.all()
      console.log(body)
      if (body.id) {        
        response.status(201).send(await Document.query().where('id', body.id).update(body))
      } else {
        console.log(body)
        response.send(await Document.create(body))
      }
    }

  }

  public async show({ response}) {
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
