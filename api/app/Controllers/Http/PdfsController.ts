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
    // Filas de la primera table
    let file1 = [{text: 'Exportador', border: [true, true, false, false]},{text: '', border: [false, true, false, false]}, {text: 'Importador', border: [true, true, true, false]}]
    let file2 = [{text: `${dates?.export}`, border: [true, false, false, false] }, {text: '', border: [false, false, false, false] },{text: `${dates?.import}`, border: [true, false, true, false] }]
    let file3EspacioVacio = [{ text: '\n\n', border: [true, false, false, false] }, { text: '\n\n', border: [false, false, true, false] }, { text: '\n\n', border: [false, false, true, true] }]
    let file4 = [{text: '', border: [true, false, false, false]}, {text: '', border: [false, false, false, false]}, {text: `Consignatario`, border: [true, true, true, false]}]
    let file5 = [{text: '\n\n\n\n\n', border: [true, false, false, true]}, {text: '\n\n\n\n\n', border: [false, false, false, true]}, {text: `${dates?.consignee}\n\n\n\n\n`, border: [true, false, true, true] }]


    // Filas de la segunda tabla

    let file1_ = [{ text: 'Quantidade', alignment: 'center' , margin: [0,3,0,0]}, { text: 'Espécie', alignment: 'center' , margin: [0,3,0,0]}, { text: 'Denominação das Mercadorias', alignment: 'center' , margin: [0,3,0,0]}, { text: `Valor Total - ${dates?.money}`, alignment: 'center' , margin: [0,3,0,0]}]
    
    const index = dates?.table.length > 1 ? true : false
    console.log(dates?.table.length)
    let file2_ = dates?.table.map((info) => {
      console.log('tiene mas de unol?', index)
      return [
        { text: info.quantity, alignment: 'right', border: (index ) ? [true, false, true, false] : [true, false, true, true] },
        { text: info.species, alignment: 'left', border: (index ) ? [true, false, true, false] : [true, false, true, true] },
        { text: info.description_of_goods, alignment: 'left', border: (index) ? [true, false, true, false] : [true, false, true, true] },
        { text: info.value, alignment: 'right', border: (index) ? [true, false, true, false] : [true, false, true, true] }
      ]
    })

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 90, 21, 0],
      header: [
        {
          margin: [45, 30,21, 0],
          columns: [
            {
              alignment: 'left',
              width: 95,  // Valor fijo de ancho
              height: 43, // Valor fijo alto
              image: 'data:image/jpeg;base64,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',

            },
            {
              margin: [12,-9,-3,100],
              text: [
                {
                  text: 'Av. Benjamin Constant, 876\n\nCentro\nTels: 95 40095378\nFax: 95 32241557\nCEP: 69301020\nBR039CLV230000282900\nBOA VISTA RR BRASIL\n',
                  fontSize: 6
                }
              ]
            },
            {
              absolutePosition: { x: 360, y: 15 },
              width: 'auto',
              text: [
                {
                  text: `CERTIFICADO DE LIVRE VENDA\n\n\n`,
                  fontSize: 15.5,
                  italics: true,
                  bold: true
                }
              ]
            },
            {
              absolutePosition: { x: 350, y: 58 },
              width: 'auto',
              text: [
                {
                  text: `${dates?.correlativeNumber}`,
                  fontSize: 12,
                  bold: true,
                }
              ]
            }

          ]
        }
      ],
      content: [
        {
          margin: [0, 3, 0, 0],
          alignment: 'right',
          text: [{
            text: 'Pagina: 1 de 1',
            fontSize: 6
          }]
        },
        {
          style: 'tables',
          margin: [-3,5,0,0],
          table: {
            widths: [248, 2, '*'],
            heights: [2.5,2.5],
            body: [
              file1,
              file2,
              file3EspacioVacio,
              file4,
              file5,
              
            ]
			    }
        },
        {
          style: 'tables',
          margin: [-3, 5, 0, 0],
          table: {
            widths: [70, 55, '*', 63],
            heights: [10],
            body: [
              file1_,
            ]
          }
        },
        {
          style: 'tables',
          margin: [-3, 0, 0, 0],
          table: {
            widths: [70, 55, '*', 63],
            heights: [3,3, 3, 3],
            body: file2_
          }
        }
      ],
      styles: {
        tables: {
          fontSize: 6,
        }
      }
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
