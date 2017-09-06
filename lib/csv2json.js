#!/usr/bin/env node

// var fs = require('fs');
var verbose = false;
var fs = require('fs');
var path = require('path');
//var file = require('./file.js');
const csvParse = require('csv-parse')

//const parser = (converterFun, cb) => csvParse({ delimiter: ',' }, (err, data) => converterFun(data, cb));


/**
 * TBD.
 * @param  {Object} config   Configuration parameters
 * @param  {bool} verbose    Work in verbose mode if `true`
 */
exports.execute = function(config, mode) {
    verbose = mode;

//    var input = file.read(config.input);
//    console.log(JSON.stringify(input, null, '  '));

    fs.createReadStream(path.resolve(config.input)).pipe(csvParse({ delimiter: ',', columns: true}, (err, data) => {
        console.log(JSON.stringify(data, null, '  '))
    }))
};
