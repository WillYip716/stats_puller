
const fs = require('fs');
const csvjson = require('csvjson');

function main(){
    fs.readFile('./avg.csv', 'utf-8', (err, fileContent) => {
        if(err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }
        const jsonObj = csvjson.toObject(fileContent);
        const data = JSON.stringify(jsonObj);
        fs.writeFileSync('avg.json', data);
    });
}


main();


