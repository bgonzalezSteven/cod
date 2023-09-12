'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Document = use("App/Models/Document");
const PdfPrinter = use("pdfmake")
const moment = use("moment")
const Helpers = use("Helpers")
const fs = use("fs")

const firma = fs.readFileSync("logo.png");
// const base64Image = Base64.encode(firma);

class PdfController {
  async getFileByFileName({ params, response, request }) {
    let dir = await params.dir;
    response.download(Helpers.appRoot(`storage/documents/${dir}`));
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
  async generate({ request, response, params, view }) {
    const dates = await Document.findBy("_id", params.id);
    // Filas de la primera table
    let file1 = [
      { text: "Exportador", border: [true, true, false, false] },
      { text: "", border: [false, true, false, false] },
      { text: "Importador", border: [true, true, true, false] },
    ];
    let file2 = [
      { text: `${dates?.export}`, border: [true, false, false, false] },
      { text: "", border: [false, false, false, false] },
      { text: `${dates?.import}`, border: [true, false, true, false] },
    ];
    let file3EspacioVacio = [
      { text: "\n\n", border: [true, false, false, false] },
      { text: "\n\n", border: [false, false, true, false] },
      { text: "\n\n", border: [false, false, true, true] },
    ];
    let file4 = [
      { text: "", border: [true, false, false, false] },
      { text: "", border: [false, false, false, false] },
      { text: `Consignatario`, border: [true, true, true, false] },
    ];
    let file5 = [
      { text: "\n\n\n\n\n", border: [true, false, false, true] },
      { text: "\n\n\n\n\n", border: [false, false, false, true] },
      {
        text: `${dates?.consignee}\n\n\n\n\n`,
        border: [true, false, true, true],
      },
    ];

    // Filas de la segunda tabla

    let file1_ = [
      { text: "Quantidade", alignment: "center", margin: [0, 3, 0, 0] },
      { text: "Espécie", alignment: "center", margin: [0, 3, 0, 0] },
      {
        text: "Denominação das Mercadorias",
        alignment: "center",
        margin: [0, 3, 0, 0],
      },
      {
        text: `Valor Total - ${dates.typeValue} ${dates?.money}`,
        alignment: "center",
        margin: [0, 3, 0, 0],
      },
    ];
    let total = 0
    let currencyFormat = dates?.table.map((info) => {
      return (total =
        parseFloat(info.value.replace(/\./g, "").replace(",", ".")) + total); 
    })
    let finalVaue = total.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    let file2_ = dates?.table.map((info, index) => {
      return [
        {
          text: `${dates.table[0].description_of_goods
            .match(/\n/g)
            .toString()
            .replace(",", "")}${info.quantity}`,
          alignment: "right",
          border: [true, false, true, false],
          margin: index !== 0 ? [0, -5, 0, 0] : [0, 0, 0, 0],
        },
        {
          text: `${dates.table[0].description_of_goods
            .match(/\n/g)
            .toString()
            .replace(",", "")}${info.species}`,
          alignment: "left",
          border: [true, false, true, false],
          margin: index !== 0 ? [0, -5, 0, 0] : [0, 0, 0, 0],
        },
        {
          text: `${info.description_of_goods}`,
          alignment: "left",
          border: [true, false, true, false],
          margin: index !== 0 ? [0, -5, 0, 0] : [0, 0, 0, 0],
        },
        {
          text: `${dates.table[0].description_of_goods
            .match(/\n/g)
            .toString()
            .replace(",", "")}${info.value}`,
          alignment: "right",
          border: [true, false, true, false],
          margin: dates.table.length === 1 ? [0, 7, 0, 0] : [0, -4, 0, 0],
        },
      ];
    });
    let temp = (file2_.length)
    console.log(temp)
    for (let i = file2_.length; i < 11; i++) {
      file2_.push([
        {
          text: "\n\n\n",
          border:
            i !== 10 ? [true, false, true, false] : [true, false, true, true],
        },
        {
          text: "\n\n\n",
          border:
            i !== 10 ? [true, false, true, false] : [true, false, true, true],
        },
        {
          text: i !== temp ? "\n\n\n" : `SUB-TOTAL ${dates.typeValue}\nTOTAL`,
          margin: [0, -6, 0, 0],
          border:
            i !== 10 ? [true, false, true, false] : [true, false, true, true],
        },
        {
          alignment: "right",
          margin: [0, -4, 0, 0],
          text:
            i !== temp
              ? "\n\n\n"
              : `${finalVaue.replace("€", "")}\n${finalVaue.replace("€", "")}`,
          border:
            i !== 10 ? [true, false, true, false] : [true, false, true, true],
        },
      ]);
    }
    // filas de la ultima table

    const finalTable = [
      {
        text: `\nMarcas e Números\n\n${dates?.marks_and_numbers ? dates?.marks_and_numbers : ''}\n\n\n\n\n`,
        colSpan: 2,
        margin: [4, 0, 0, 0],
      },
      { text: "" },
      {
        text: "\nC E R T I F I C A Ç Ã O\n\n\nA Federação das Indústrias do Estado de Roraima, com base nos documentos autênticos apresentados pelo exportador, CERTIFICA que o(s) produtos(s) acima, correspondente(s) à Fatura Comercial nº 000.066/2023,  possui(em) condições legais para livre venda neste país.\n\n\nBOA VISTA,",
        colSpan: 2,
        rowSpan: 2,
        margin: [4, 0, 0, 0],
        border: [true, true, true, false],
        fontSize: 6,
        font: 'Arial'
      },
      { text: "" },
    ];

    const finalTable2 = [
      {
        text: `\nMeio de Transporte\n\n${dates?.transport}\n\n\n\n\n`,
        colSpan: 2,
        margin: [4, 0, 0, 0],
      },
      { text: "" },
      { text: "" },
      { text: "" },
    ];
    const finalTable3 = [
      {
        text: `\nPeso Bruto\n\n${dates?.gross_weight}\n\n\n`,
        colSpan: 2,
        margin: [4, 0, 0, 0],
      },
      { text: "" },
      {
        image: `data:image/png;base64,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`,
        width: 87,
        height: 57,
        rowSpan: 2,
        margin: [35, 7, 0, 0],
        border: [true, false, false, true],
      },
      {
        qr: `http://cod-cni.com/#/novocod/VerificaoCertificados/Pesquisar/NumeroCertificado=${dates?.correlative_number}`,
        fit: "80",
        margin: [33, 10, 0, 0],
        border: [false, false, true, true],
        rowSpan: 2,
      },
    ];
    const finalTable4 = [
      {
        text: `\nPeso Líquido\n\n${dates?.liquid_weight}\n\n\n`,
        colSpan: 2,
        margin: [4, 0, 0, 0],
      },
      { text: "" },
      { text: "" },
      { text: "" },
    ];

    // Papa acmomoda el diseño de la tabla
    var fonts = {
      Roboto: {
        normal: "resources/fonts/Calibri-Regular.ttf",
        bold: "resources/fonts/Calibri-Bold.TTF",
        italics: "resources/fonts/Calibri-Italic.ttf",
        bolditalics: "resources/fonts/Calibri-Bold Italic.ttf",
      },
      Arial: {
        normal: "resources/fonts/Arial.ttf",
        italics: "resources/fonts/Arial-Italic.ttf",
        bolditalics: "resources/fonts/Arial-boldI.TTF",
        bold: "resources/fonts/Arial-bold.TTF",
      },
    };
    var printer = new PdfPrinter(fonts);
    var docDefinition = {
      pageSize: "A4",
      pageMargins: [40, 90, 20, 0],
      header: [
        {
          margin: [45, 30, 21, 0],
          columns: [
            {
              alignment: "left",
              width: 95, // Valor fijo de ancho
              height: 40, // Valor fijo alto
              image:
                "data:image/jpeg;base64,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",
            },
            {
              margin: [12, -9, -20, 100],
              text: [
                {
                  text: `Av. Benjamin Constant, 876\n\nCentro\nTels: 95 40095378\nFax: 95 32241557\nCEP: 69301020\n${dates.correlative_number}\nBOA VISTA RR BRASIL\n`,
                  fontSize: 6,
                  font: "Arial",
                },
              ],
            },
            {
              absolutePosition: { x: 355, y: 15 },
              width: "auto",
              text: [
                {
                  text: `CERTIFICADO DE LIVRE VENDA\n\n\n`,
                  fontSize: 14,
                  font: "Arial",
                  bold: true,
                  italics: true,
                },
              ],
            },
            {
              absolutePosition: { x: 350, y: 58 },
              width: "auto",
              text: [
                {
                  text: `${dates?.correlative_number}`,
                  fontSize: 12,
                  font: "Arial",
                  bold: true,
                },
              ],
            },
          ],
        },
      ],
      content: [
        {
          margin: [0, 3, 0, 0],
          alignment: "right",
          text: [
            {
              text: "página: 1 de 1",
              fontSize: 7,
            },
          ],
        },
        {
          style: "tables",
          margin: [-3, 5, 0, 0],
          table: {
            widths: [248, 2, "*"],
            body: [file1, file2, file3EspacioVacio, file4, file5],
          },
        },
        {
          style: "tables",
          margin: [-3, 5, 0, 0],
          table: {
            widths: [70, 55, "*", 63],
            heights: [10],
            body: [file1_],
          },
        },
        {
          style: "tables",
          margin: [-3, 0, 0, 0],
          table: {
            widths: [70, 55, "*", 63],
            heights: [3, 3, 3, 3],
            body: file2_,
          },
        },
        {
          style: "tables",
          margin: [-3, 10, 0, 0],
          table: {
            widths: ["*", "*", "*", "*"],
            heights: [10],
            body: [finalTable, finalTable2, finalTable3, finalTable4],
          },
        },
        {
          margin: [0, -30, 128, 0],
          alignment: "right",
          text: [
            {
              text: "(data, assinatura e carimbo da Federação)",
              fontSize: 6,
            },
          ],
        },
        {
          margin: [0, 30, 170, 0],
          alignment: "right",
          bold: true,
          text: [
            {
              text: `Ás: __:__HS\n${moment().format("DD MMM YYYY")}`,
              fontSize: 6,
            },
          ],
        },
      ],
      styles: {
        tables: {
          fontSize: 6,
          font: 'Arial'
        },
      },
    };

    var options = {
      // ...
    };
    // return docDefinition
    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    const dir = Helpers.appRoot("storage/documents");
    const filename = `${dates.correlative_number}.pdf`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    pdfDoc.pipe(fs.createWriteStream(`${dir}/${filename}`));
    pdfDoc.end();
    response.send(`${filename}`);
  }
}

module.exports = PdfController
