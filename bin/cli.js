#!/usr/bin/env node
/*jshint node: true */
'use strict';

/**
 * command-line utility
 */
(function() {
    var verbose = false;
    var program = require('commander');
    var thisPackage = require(__dirname + '/../package.json');
    program._name = thisPackage.name;
    var app = require('../index');

    // Setup the commands of the program
    program
        .version(thisPackage.version)
        .command('json2schema <input>')
        .description('Generate from the "input" JSON file a JSON schema')
        .option("-v, --verbose", "Verbose mode", Boolean, false)
        .action(function(input, options) {
                verbose = options.verbose;
                app.json2schema.execute({
                        input: input
                    }, verbose);
                });

    program
        .command('json2yaml <input>')
        .description('Convert the "input" JSON file to YAML format')
        .option("-v, --verbose", "Verbose mode", Boolean, false)
        .action(function(input, options) {
                verbose = options.verbose;
                app.json2yaml.execute({
                        input: input
                    }, verbose);
                });

    program
        .command('yaml2json <input>')
        .description('Convert the "input" YAML file to JSON format')
        .option("-v, --verbose", "Verbose mode", Boolean, false)
        .action(function(input, options) {
                verbose = options.verbose;
                app.yaml2json.execute({
                        input: input
                    }, verbose);
                });

    program
        .command('validate <input> <schema>')
        .description('Validate the"input" JSON file with the "schema" JSON schema')
        .option("-v, --verbose", "Verbose mode", Boolean, false)
        .action(function(input, schema, options) {
                verbose = options.verbose;
                app.validate.execute({
                        input: input,
                        schema: schema
                    }, verbose);
                });

    program
        .command('csv2json <input>')
        .description('Convert the "input" CSV file to JSON format')
        .option("-v, --verbose", "Verbose mode", Boolean, false)
        .action(function(input, options) {
                verbose = options.verbose;
                app.csv2json.execute({
                        input: input
                    }, verbose);
                });

    return program.parse(process.argv);
})();
