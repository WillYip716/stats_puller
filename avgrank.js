const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');



async function main(){
    const html = await axios.get('https://www.fantasypros.com/nfl/adp/half-point-ppr-overall.php');

    const $ = await cheerio.load(html.data);
    let data = [];

    

    $("tr").each((index,element) => {
            const field = $(element).find("td");
            const rank = $(field[0]).text();
            const name = $(field[1]).text();
            const position = $(field[2]).text();
            const pstats = {rank, name,position};
            data.push(pstats);
    });
    fs.writeFileSync('avg.json', JSON.stringify(data));
}

main();

