import Crawler from 'crawler';
import cheerio from "cheerio";

export default {
  key: 'ReceiveProductQueue',
  options: {
    delay: 3000,
  },
  async handle({ data }) {
    const { url } = data;

    new Crawler({
      maxConnections: 1,
      jQuery: false,

      callback: function (err, res, done) {
        let $

        if (err) console.log(err)

        $ = cheerio.load(res.body, {
          xml: {
            normalizeWhitespace: true,
          }
        })
      
        const cnpj = $('infNFe emit CNPJ').html();
        const razao = $('infNFe emit xNome').html();
        const endereco = $('infNFe emit enderEmit xLgr').html();
        console.log(`------- ${cnpj} - ${razao} - ${endereco} -------`)
        $('infNFe det').each(function (i, a) {
  
          let name = a.children[0].childNodes[2].children[0].nodeValue
          let prod = a.children[0].childNodes[0].children[0].nodeValue
          let unid = a.children[0].childNodes[5].children[0].nodeValue
          let cust = a.children[0].children[9].children[0].nodeValue === 'SEM GTIN' 
            ? a.children[0].children[7].children[0].nodeValue : a.children[0].children[9].children[0].nodeValue
          
          console.log(`${prod} - ${name} - ${unid} - ${cust}`)
        });

        done();
      }
    }).queue(url)
  },
};