const axios = require('axios');
const cheerio = require('cheerio');

async function main(){
    const html = await axios.get('https://codingwithstefan.com/table-example/');

    const $ = await cheerio.load(html.data);
    let data = [];
    
    
    $("tr").each((index,element) => {
            console.log($(element).text());
    });
}

main();

