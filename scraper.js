const axios = require('axios');
const cheerio = require('cheerio');
const converter = require('json-2-csv');
const fs = require('fs');

async function main(){
    const html = await axios.get('https://www.thescore.com/nfl/news/1991017/fantasy-2020-stat-projections-tight-ends');

    const $ = await cheerio.load(html.data);
    let data = [];
    

    $("tr").each((index,element) => {
            const field = $(element).find("td");
            const name = $(field[1]).text();
            const rec = $(field[4]).text();
            const rec_yds = $(field[5]).text();
            const rec_tds = $(field[6]).text();
            const pstats = {name, rec, rec_yds, rec_tds};
            data.push(pstats);
    });

    converter.json2csv(data, (err, csv) => {
        if (err) {
            throw err;
        }
        console.log("success");
    
        // write CSV to a file
        fs.writeFileSync('todos.csv', csv);
        
    });
}

main();


