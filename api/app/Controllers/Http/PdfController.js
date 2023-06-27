'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Customer = use('App/Models/Customer')
const PdfPrinter = use("pdfmake")
const moment = use("moment")
const Helpers = use("Helpers")
const fs = use("fs")

class PdfController {

  async getFileByFilename ({ params, response, request }) {
    let dir = params.dir
    response.download(Helpers.appRoot(`storage/uploads/paper/${dir}`))
  }
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async generate ({ request, response, params, view }) {
    const date = (await Customer.query().where('id', params.id).fetch()).toJSON()
    let info = date[0]
    info.number = info.number
    let number = info.number.replace('/', '-')
    info.date_issue = (moment(info.date_issue).locale('pt-br').format('DD/MMM/YYYY')).toLocaleUpperCase()
    info.date_treatment = (moment(info.date_treatment).locale('pt-br').format('DD/MMM/YYYY')).toLocaleUpperCase()
    if (info.date_treatment === 'DATA INVÁLIDA') {
      info.date_treatment = 'NONE'
    }
    if (info.date_issue === 'DATA INVÁLIDA') {
      info.date_issue = 'NONE'
    }

    // Variable declarated
    let file1 = []
    let file2 = []
    let info2 = []
    let file3 = []
    let info3 = []
    let file4 = []
    let info4 = []
    let file5 = []
    let info5 = []
    let info6 = []
    let file7 = []
    let info7 = []
    let file8 = []
    let info8 = []
    let file9 = []
    let info9 = []
    let file10 = []
    let info10 = []
    let file11 = []
    let info11 = []
    let file12 = []
    let info12 = []
    let finaliti = []

    file1.push({columns: [{text: '1.  ', fontSize: 6.4, font: 'Roboto', margin: [-135,0,0,0]},{text: [{ text: `Para: Organização Nacional de Proteção Fitossanitária de:\n`,alignment: 'left', style: 'table'}, {text: 'To: Plant Protection Organization of:', bold: true, italics: true, fontSize: 6,font: 'Roboto', alignment: 'left'}], margin: [-130,0,0,0]}], border: [true, true, false, true]}, {text: `${info.plant}\n\n`,margin: [-25, 3, 0 ,0], alignment: 'left', style: 'texto', border: [false, true, true, true]})
    
    file2.push({text: [{text: `2. Nome e endereço do exportador /`}, {text: 'Name and address of exporter\n', bold: true, italics: true}] ,  border: [true, true, true, false],alignment: 'left', style: 'table', colSpan: 3}, {text: ''}, {text: ''}, {text: [{text: '3. Nome e endereço do destinatário declarado / '}, {text: 'Declared Name and address of consignee', bold: true, italics: true}],border: [true, true, true, false],alignment: 'left', style: 'table', colSpan: 3, style: 'table'}, {text: ''}, {text: ''})
    info2.push({text: `${info.address}`, style: 'texto',alignment: 'left', style: 'texto', colSpan: 3, border: [true, false, true, true]}, {text: ''}, {text: ''}, {text: `${info.consignee}`, border: [true, false, true, true],alignment: 'left', style: 'table', colSpan: 3, style: 'texto'}, {text: ''}, {text: ''})
    
    file3.push({text: [{text: '4. Lugar de Origem / '}, {text: `Place of origin`, bold: true, italics: true}], border: [true, true, true, false], style: 'table', colSpan: 2, alignment: 'left'}, {text: ''}, {text: [{text: '5. Meios de transporte declarados / '}, {text: `Declared means of conveyance`, bold: true, italics: true}], border: [true, true, true, false], style: 'table', colSpan: 2, alignment: 'left'}, {text: ''}, {text: [{text: '6. Ponto de ingresso declarado /'}, {text: 'Declared point of entry', bold: true, italics: true}], border: [true, true, true, false], style: 'table', colSpan: 2, alignment: 'left'}, {text: ''})
    info3.push({text: `${info.place}`, border: [true, false, true, true], style: 'texto', colSpan: 2, alignment: 'left'}, {text: ''}, {text: `${info.means}`, border: [true, false, true, true], style: 'texto', colSpan: 2, alignment: 'left'}, {text: ''}, {text: `${info.entry}`, border: [true, false, true, true], style: 'texto', colSpan: 2, alignment: 'left'}, {text: ''})
    
    file4.push({text: [{text: '7. Número e descrição dos volumes / '}, {text: `Number and decription of packages`, bold: true, italics: true}], style: 'table', border: [true, true, true, false],alignment: 'left', style: 'table', colSpan: 3}, {text: ''}, {text: ''}, {text: [{text: '8. Nome do produto e quantidade declarada / '}, {text: `Name of product and declared quantity`, bold: true, italics: true}],border: [true, true, true, false],alignment: 'left', style: 'table', colSpan: 3, style: 'table'}, {text: ''}, {text: ''})
    info4.push({text: `${info.packages}`, style: 'texto',alignment: 'left', style: 'texto', colSpan: 3, border: [true, false, true, true]}, {text: ''}, {text: ''}, {text: `${info.quantity}`, border: [true, false, true, true],alignment: 'left', style: 'table', colSpan: 3, style: 'texto'}, {text: ''}, {text: ''})
    
    file5.push({text: [{text: '9. Marcas distintivas / '}, {text: `Distinguishing marks`, bold: true, italics: true}], style: 'table', border: [true, true, true, false],alignment: 'left', style: 'table', colSpan: 3}, {text: ''}, {text: ''}, {text: [{text: '10. Nome científico dos vegetais / '}, {text: 'Botanical name of plants', bold:true, italics: true}],border: [true, true, true, false],alignment: 'left', style: 'table', colSpan: 3, style: 'table'}, {text: ''}, {text: ''})
    info5.push({text: `${info.marks}`, style: 'texto',alignment: 'left', style: 'texto', colSpan: 3, border: [true, false, true, true]}, {text: ''}, {text: ''}, {text: `${info.botanical}`, italics: true, border: [true, false, true, true],alignment: 'left', style: 'table', colSpan: 3, style: 'texto'}, {text: ''}, {text: ''})
    
    info6.push({columns: [{text: '11.  '}, {text:[{text: 'Pelo presente certifica-se que os vegetais, seus produtos ou outros artigos regulamentados aqui descritos foram inspecionados e/ou analisados, de acordo com os procedimentos oficiais adequados e considerados  livres das pragas quarentenárias especificadas pela parte contratante importadora e que cumprem os requisitos fitossanitários vigentes da parte contratante importadora, incluídos os relativos às pragas não quarentenárias regulamentadas. /'} ,{text: ' This is to certify that the plants, plant products or other regulated articles described herein have been inspected and/or tested according to appropriate offical procedures and1 are considered to be free from the quarantine pests specified by the importing contracting party and to conform with the current phytosanitary requirements of the importing contracting party, including those for regulated non-quarantine pests.', bold: true, italics: true}], margin: [-262,0,0,0]}], alignment: 'justify', fontSize: 6.2, font: 'Roboto', colSpan: 6}, {text: ''}, {text: ''}, {text: ''}, {text: ''}, {text: ''})

    file7.push({text: [{text: 'DECLARAÇÃO ADICIONAL/ '}, {text: 'ADDITIONAL DECLARATION', bold: true, italics: true}], alignment: 'left',  border: [true, true, true, false], fontSize: 9, font: 'Roboto', colSpan: 6}, {text: ''}, {text: ''}, {text: ''}, {text: ''}, {text: ''})
    info7.push({text: `${info.declaration_aditional ? info.declaration_aditional : 'NONE'}`, alignment: 'left',  border: [true, false, true, true], style: 'texto', colSpan: 6}, {text: ''}, {text: ''}, {text: ''}, {text: ''}, {text: ''})

    file8.push({text: [{text: '12. Data do tratamento / '}, {text: `Date of treatment`, bold: true, italics: true}], border: [true, true, true, false], font: 'Roboto', fontSize: 6, colSpan: 2, alignment: 'left'}, {text: ''}, {text: [{text: '13. Produto químico (ingrediente ativo) / '}, {text: `Chemical (active ingredient)`, bold: true, italics: true}] , border: [true, true, true, false], font: 'Roboto', fontSize: 6, colSpan: 2, alignment: 'left'}, {text: ''}, {text: [{text: '14. Concentração /'}, {text: ` Concentration`, bold: true, italics: true}], border: [true, true, true, false], font: 'Roboto', fontSize: 6, colSpan: 2, alignment: 'left'}, {text: ''})
    info8.push({text: `${info.date_treatment ? info.date_treatment : 'NONE'}\n`, border: [true, false, true, true], style: 'texto', colSpan: 2, alignment: 'left'}, {text: ''}, {text: `${info.chemical}\n`, border: [true, false, true, true], style: 'texto', colSpan: 2, alignment: 'left'}, {text: ''}, {text: `${info.concentration}\n`, border: [true, false, true, true], style: 'texto', colSpan: 2, alignment: 'left'}, {text: ''})

    file9.push({text: [{text: '15. Duração e Temperatura / '}, {text: `Duration and temperature`, bold: true, italics: true}], border: [true, true, true, false], style: 'table', colSpan: 2, alignment: 'left'}, {text: ''}, {text: [{text: '16. Tratamento / '}, {text: `Treatment`, bold:true, italics: true}], border: [true, true, true, false], style: 'table', colSpan: 2, alignment: 'left'}, {text: ''}, {text: [{text: '17. Informação adicional / '}, {text: `Additional information`,bold:true, italics: true}], border: [true, true, true, false], style: 'table', colSpan: 2, alignment: 'left'}, {text: ''})
    info9.push({text: `${info.duration_temperature}\n`, border: [true, false, true, true], style: 'texto', colSpan: 2, alignment: 'left'}, {text: ''}, {text: `${info.treatment}\n`, border: [true, false, true, true], style: 'texto', colSpan: 2, alignment: 'left'}, {text: ''}, {text: `${info.aditional_information}\n`, border: [true, false, true, true], style: 'texto', colSpan: 2, alignment: 'left'}, {text: ''})

    

    // Ftabla final

    file10.push({text: [{text: '18. Carimbo da organização\n'}, {text: 'Stamp of organization', bold: true, italics: true, alignment: 'center'}], border: [true,true, true, false], style: 'table', alignment: 'left'}, {text: [{text: '19. Local de emissão / '}, {text: 'Place of Issue', bold: true, italics: true}],border: [true, true, true, false], colSpan: 2, style: 'table', alignment: 'left'}, {text: ''}, {text: [{text: '20. Data de emissão / '}, {text: 'Date of issue', bold: true, italics: true}] , colSpan: 2, style: 'table', alignment: 'left',border: [true, true, true, false]}, {text: ''}, {qr: `http://sistemas-agricultura-go.es/#/qrcodefito/consulta/index/${number}/${info.access}`, eccLevel: 'M', fit: 100, alignment: 'left', rowSpan:6})
    info10.push({image: 'two.jpg', border: [true, false, true, true], rowSpan: 5, width: 70}, {text: `${info.place_of_issue}`, border: [true, false, true, true],colSpan: 2, style: 'texto', alignment: 'left', margin: [3, -8, 0, 15]}, {text: ''}, {text: `${info.date_issue ? info.date_issue : 'NONE'}`, colSpan: 2, style: 'texto', alignment: 'left',border: [true, false, true, true], margin: [3, -8, 0, 15]}, {text: ''}, {text: ''})
    
    file11.push({text: ''}, {text: [{text: '21. Nome do Auditor Fiscal Federal Agropecuário / '}, {text: 'Name of authorized officer', bold: true, italics: true}], border: [true, true, true, false], colSpan: 4, style: 'table', alignment: 'left'}, {text: ''}, {text: ''}, {text: ''}, {text: ''})
    info11.push({text: ''}, {text: `${info.name_authorized}`, border: [true, false, true, true], colSpan: 4, style: 'texto', alignment: 'left', margin: [4, -4, 0, 7]}, {text: ''}, {text: ''}, {text: ''}, {text: ''})
    
    file12.push({text: ''}, {text: [{text: '22. Assinatura do Auditor Fiscal Federal Agropecuário / '}, {text: 'Signature of authorized officer', bold: true, italics: true}], border: [true, true, true, false], colSpan: 4, style: 'table', alignment: 'left'}, {text: ''}, {text: ''}, {text: ''}, {text: ''})
    info12.push({text: ''}, {text: `Assinado eletronicamente / Electronically signed. Consulta pelo site / Check using:\nhttps://sistemas-agricultura-gov.es/#/qrcodefito`, border: [true, false, true, true], colSpan: 4, style: 'texto', alignment: 'left', margin: [4,-4,0,-7]}, {text: ''}, {text: ''}, {text: ''}, {text: ''})

    finaliti.push({text: [{text: 'O Departamento de Sanidade Vegetal e Insumos Agrícolas, seus funcionários e representantes isentam-se de toda responsabilidade econômica e/ou comercial resultantes deste certificado.\n'}, {text: 'No financial liability with respect to this certificate shall attach to Departamento de Sanidade Vegetal e Insumos Agrícolas or any of its officers or representatives', bold:true, italics: true}], colSpan: 6, fontSize: 7, font: 'Roboto', alignment: 'center'}, '','','','','')

    var fonts = {
      Roboto: {
        normal: 'resources/fonts/Calibri-Regular.ttf',
        bold: 'resources/fonts/Calibri-Bold.TTF',
        italics: 'resources/fonts/Calibri-Italic.ttf',
        bolditalics: 'resources/fonts/Calibri-Bold Italic.ttf'
      },
      Arial: {
        normal: 'resources/fonts/Arial.ttf',
        italics: 'resources/fonts/Arial-Italic.ttf',
      }
    }
    var printer = new PdfPrinter(fonts)
    var docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 90, 20, 0],
      header: [
        {
          columns: [
            {
              margin: [20, 20, 0, 20],
              alignment: 'left',
              width: 'auto',
              image: 'logo.jpg', 
              width: 48
            },
            {
              margin: [110, 20, -120, 20],
              alignment: 'center',
              text: [
                {
                  text: `MINISTÉRIO DA AGRICULTURA, PECUÁRIA E ABASTECIMENTO\n`,
                  fontSize: 9
                },
                {
                  text: `SECRETARIA DE DEFESA AGROPECUÁRIA\n`,
                  fontSize: 9
                },
                {
                  text: `DEPARTAMENTO DE SANIDADE VEGETAL E INSUMOS AGRÍCOLAS\n`,
                  fontSize: 9
                },
                {
                  text: `ORGANIZAÇÃO NACIONAL DE PROTEÇÃO FITOSSANITÁRIA DO BRASIL\n`,
                  fontSize: 9
                },
                {
                  text: `PLANT PROTECTION ORGANIZATION OF BRAZIL`,
                  fontSize: 9,
                  bold: true,
                  italics: true
                }
              ]
            },
            {
              margin: [115, 30, 0, 20],
              alignment: 'left',
              text: [
                {
                  text: `Número / Number: ${info.number}\n`,
                  fontSize: 8.2
                },
                {
                  text: `Cód. Acesso / Access Code: ${info.access}\n`,
                  fontSize: 8.2
                }
              ]
            }
          ]
        }
      ],
      content: [
        {
          margin: [-27, -15, 0, 0],
          alignment: 'center',
          text: [
            {
              text: `CERTIFICADO FITOSSANITÁRIO / `,
              fontSize: 15.5,
              font: 'Arial'
            },
            {
              text: `PHYTOSANITARY CERTIFICATE\n`,
              fontSize: 17.5,
              bold: true,
              italics: true
            }
          ]
        },
        {
          margin: [-20, 2, 0, 0],
          alignment: 'center',
          table: {
            heights: [20],
            widths: ['*', '*'],
            body: [
              file1
            ]
          }
        },
        {
          margin: [-23, 3, 0, 0],
          alignment: 'center',
          text: [
            {
              text: `DESCRIÇÃO DO ENVIO / `,
              fontSize: 10
            },
            {
              text: `DESCRIPTION OF CONSIGNMENT\n`,
              fontSize: 10,
              bold: true,
              italics: true
            }
          ]
        },
        {
          margin: [-20, 3, 0, 0],
          alignment: 'center',
          table: {
            widths: ['*', '*','*', '*', '*', '*'],
            heights: [6, 66,0, 30, 0,40,0,40,0,0, 190],
            body: [
              file2,
              info2,
              file3,
              info3,
              file4,
              info4,
              file5,
              info5,
              info6,
              file7,
              info7
            ]
          }
        },
        {
          margin: [-27, 3, 0, 0],
          alignment: 'center',
          text: [
            {
              text: `TRATAMENTO DE DESINFESTAÇÃO E/OU DESINFECÇÃO / `,
              fontSize: 10.5
            },
            {
              text: `DISINFESTATION AND/OR DISINFECTION TREATMENT\n`,
              fontSize: 10.5,
              bold: true,
              italics: true
            }
          ]
        },
        {
          margin: [-20, 3, 0, 0],
          alignment: 'center',
          table: {
            widths: ['*', '*','*', '*', '*', '*'],
            heights: [0,11,0,11],
            body: [
              file8,
              info8,
              file9,
              info9
            ]
          }
        },
        {
          margin: [-10, 2, 0, 0],
          alignment: 'center',
          text: [
            {
              text: `USO EXCLUSIVO DO MAPA`,
              fontSize: 10
            }
          ]
        },
        {
          margin: [-20, 3, 0, 0],
          alignment: 'center',
          table: {
            widths: ['*', '*','*', '*', '*', '*'],
            body: [
              file10,
              info10,
              file11,
              info11,
              file12,
              info12,
              finaliti
            ]
          }
        }
      ],
      styles: {
        table: {
          fontSize: 6.4,
          font: 'Roboto',
          margin: [-2, -1, 0 ,0]
        },
        texto: {
          fontSize: 7,
          font: 'Arial',
          margin: [4, -3,0,0]
        }
      }
    }

    var options = {
      // ...
    }
    // return docDefinition
    var pdfDoc = printer.createPdfKitDocument(docDefinition, options)
    const dir = Helpers.appRoot('storage/uploads/paper')
    const filename = `${info.number.replace('/', '-')}.pdf`
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    pdfDoc.pipe(fs.createWriteStream(`${dir}/${filename}`));
    pdfDoc.end()
    response.send(`${filename}`)
  }
}

module.exports = PdfController
