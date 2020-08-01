const axios = require('axios');
const cheerio = require('cheerio');
const converter = require('json-2-csv');
const fs = require('fs');

const urls = [
    "https://www.fantasypros.com/nfl/projections/qb.php?week=draft",
    "https://www.fantasypros.com/nfl/projections/rb.php?week=draft",
    "https://www.fantasypros.com/nfl/projections/wr.php?week=draft",
    "https://www.fantasypros.com/nfl/projections/te.php?week=draft"
];



const pos = ["qb", "rb", "wr", "te"];


async function fantasypros(){
    urls.forEach(async (element,mstIndex)=>{
        console.log(mstIndex);
        const html = await axios.get(element);

        const $ = await cheerio.load(html.data);
        let data = [];
        let headers = [];
        

        $("tr").each((index,element) => {
                if(index===0){
                    
                }
                else if(index===1){
                    const field = $(element).find("th");
                    field.each((i, header)=>{
                        if(headers.indexOf($(header).text().toLowerCase())>-1){
                            headers.push($(header).text().toLowerCase() + '2');
                        }
                        else{
                            headers.push($(header).text().toLowerCase());
                        } 
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
            fs.writeFileSync('fp_' + pos[mstIndex] + '.csv', csv);
            
        });
    }) 
}

fantasypros();


