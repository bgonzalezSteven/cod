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
      // await this.caracterCount(body.table)
      if (body.id) {
        delete body.json
        body.table = JSON.stringify(body.table)
        response.status(201).send(await Document.query().where('id', body.id).update(body))
      } else {
        response.send(await Document.create(body))
      }
    }

  }
  public async caracterCount(text) {
    let repeat = 0
    text.forEach(element => {
      repeat = element.description_of_goods.split('\n').length - 1
      for (let i = 0; i < repeat; i++) {
        element.value = `\n${element.value}`
        element.quantity = `\n${element.quantity}`
        element.species = `\n${element.species}`
      }
    })
    console.log(repeat)
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
