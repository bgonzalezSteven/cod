import Application from '@ioc:Adonis/Core/Application'
import * as fs from 'fs';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Document from "App/Models/Document"

pdfMake.vfs = pdfFonts.pdfMake.vfs

// const pdfmake = import('pdfmake')
// const moment = import("moment")
// const Helpers = import("Helpers")
// const fs = import("fs")

export default class PdfsController {
  public async getFileByFileName ({ /*params, response */}) {/*
    let dir = params.dir
    response.download(Helpers.appRoot(`storage/${dir}`))*/
  }

  public async generate ({ params /*, ,response, request*/}) {
    const dates = await Document.findBy('id', params.id)
    console.log(dates)
    
    const docDefinition = {
      content: [
        { text: 'Hola, mundo!', fontSize: 20 }
      ]
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition)
    const dir = `${Application.appRoot}/storage`
    const fileName = `${dates?.correlativeNumber.replace('/', '-')}.pdf`
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    pdfDocGenerator.getBuffer((buffer: any) => {
      fs.writeFile(`${dir}/${fileName}`, buffer, (err) => {
        if (err) {
            console.error('Error al escribir archivo', err);
        } else {
            console.log('El archivo example.pdf se ha creado correctamente.');
        }
      })
    })
  }
}
