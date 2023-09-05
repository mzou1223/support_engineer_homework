const { table } = require('console');
const fs = require('fs')
const csv = require('jquery-csv')
const readline = require('readline');
const csvPath = '/home/mzou1223/code/support_engineer_homework/public/originalacc.csv'

function csvAccountTable(pathToCSVFile = csvPath) {
    console.log(pathToCSVFile);
    return new Promise((resolve, reject) => {
        const file = readline.createInterface({
            input: fs.createReadStream(pathToCSVFile),
            output: process.stdout,
            terminal: false
        });

        let headers = [];
        let accountTable = [];

        file.on('line', (line) => {
            if (headers.length === 0) {
                headers = line.split(',');
            } else {
                csv.toArrays(line, {}, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    let rowDictionary = {};
                    for (let i = 0; i < data[0].length; i++) {
                        let value = data[0][i];
                        let header = headers[i];
                        rowDictionary[header] = value;
                    }
                    accountTable.push(rowDictionary);
                });
            }
        });

        file.on('close', () => {
            resolve(accountTable);
        });
    });
}

module.exports = csvAccountTable;
