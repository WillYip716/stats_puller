const axios = require('axios');
const cheerio = require('cheerio');
const converter = require('json-2-csv');
const fs = require('fs');

const urls = [
    "https://www.thescore.com/news/1988543",
    "https://www.thescore.com/news/1989796",
    "https://www.thescore.com/news/1989904",
    "https://www.thescore.com/news/1991017"
];


const pos = ["qb", "rb", "wr", "te"];


async function thescore(){
    urls.forEach(async (element,mstIndex)=>{
        console.log(mstIndex);
        const html = await axios.get(element);

        const $ = await cheerio.load(html.data);
        let data = [];
        let headers = [];
        

        $("tr").each((index,element) => {
                if(index===0){
                    const field = $(element).find("th");
                    field.each((i, header)=>{
                        headers.push($(header).text().toLowerCase());
                    });
                }
                else{
                    const field = $(element).find("td");
                    const row = {};
                    field.each((i, value)=>{
                        row[headers[i]] = $(value).text().toLowerCase();
                    });
                    data.push(row);
                }
        });

        converter.json2csv(data, (err, csv) => {
            if (err) {
                throw err;
            }
            console.log("success");
        
            // write CSV to a file
            fs.writeFileSync('ts_'+pos[mstIndex] + '.csv', csv);
            
        });
    }) 
}

module.exports = thescore;


