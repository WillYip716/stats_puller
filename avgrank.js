const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const converter = require('json-2-csv');


async function main(){
    const html = await axios.get('https://www.fantasypros.com/nfl/adp/half-point-ppr-overall.php');

    const $ = await cheerio.load(html.data);
    let data = [];
    let test = new RegExp('^[A-Za-z]+');
    

    $("tr").each((index,element) => {
            if(index!=0){
                let field = $(element).find("td");
                let rank = $(field[0]).text();
                let name = $(field[1]).text();
                let position = $(field[2]).text();
                if(position){
                    position = position.match(test)[0];
                }
                let pstats = {rank, name,position};
                data.push(pstats);
            }    
    });

    parseInt

    converter.json2csv(data, (err, csv) => {
        if (err) {
            throw err;
        }
        console.log("success");
    
        // write CSV to a file
        fs.writeFileSync('avg.csv', csv);
        //fs.writeFileSync('avg.json', JSON.stringify(data));
        
    });

    
}

main();

